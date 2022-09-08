import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";


let initialdata = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    about: ""
}
function SignUp() {
    const [userData, setuserData] = useState({ ...initialdata })
    const history = useHistory()


    const checkpassword = function (password) {
        var str = password;
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        var s = str.search(strongRegex)
        if (str.length < 8) {
            toast.error("password is to short !");
            return false
        }
        else if (str.search(/\d/) == -1) {
            toast.error("password should contain number !");
            return false;
        } else if (str.search(/[a-zA-Z]/) == -1) {
            toast.error("password should contain alphabet !");
            return false;
        }
        else if (str.search(/[!@#\$%\^&\*]/) == -1) {
            toast.error("password should contain special character !");
            return false;
        }
        return true
    }
    const passwordChanged = (e) => {
        var strength = document.getElementById('strength');
        var strongRegex = new RegExp("^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        var mediumRegex = new RegExp("^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var enoughRegex = new RegExp("(?=.{8,}).*", "g");
        var pwd = e.target.value
        if (pwd.length == 0) {
            strength.innerHTML = 'Type Password';
        } else if (false == enoughRegex.test(pwd)) {
            strength.innerHTML = 'More Characters';
        } else if (strongRegex.test(pwd)) {
            strength.innerHTML = '<span style="color:green">Strong!</span>';
        } else if (mediumRegex.test(pwd)) {
            strength.innerHTML = '<span style="color:orange">Medium!</span>';
        } else {
            strength.innerHTML = '<span style="color:red">Weak!</span>';
        }
        return true
    }
    const ValidateEmail = function (inputText) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) return true;
        else {
            toast.error("You have entered an invalid email address!");
            return false;
        }
    }
    const submit = (e) => {
        e.preventDefault()
        if (ValidateEmail(userData.email) && checkpassword(userData.password)) {
            axios.post(`http://localhost:3000/users`, {
                username: userData.username,
                password: userData.password,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                address: userData.address,
                city: userData.city,
                country: userData.country,
                about: userData.about
            })
                .then(res => {
                    if (res.status === 201) {
                        toast.success("Registered successfully")
                        history.push("/")
                    }
                }).catch((err) => {
                    toast.error("something went wrong")
                })
        }


    }
    useEffect(() => {
        const togglePassword = document.getElementById('togglePassword');
        const password = document.getElementById('id_password');
        togglePassword?.addEventListener('click', function (e) {
            let type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
        });
    }, [])
    return (

        <Form onSubmit={e => submit(e)}>
            <div className='d-flex justify-content-center'>

                <Col md="8 mt-5">
                    <Card>
                        <CardHeader>
                            <h2 className="title fs-12">Wings Wech solutions</h2>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col className="pr-md-1" md="6">
                                    <FormGroup>
                                        <label>Username</label>
                                        <Input
                                            placeholder="Username"
                                            type="text"
                                            onChange={(e) => { setuserData({ ...userData, username: e.target.value }) }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-md-1" md="6">
                                    <FormGroup>
                                        <label htmlFor="exampleInputEmail1">
                                            Email address
                                        </label>
                                        <Input
                                            placeholder="mike@email.com"
                                            type="email"
                                            onChange={(e) => { setuserData({ ...userData, email: e.target.value }) }}

                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-md-1" md="4">
                                    <FormGroup>
                                        <label>First Name</label>
                                        <Input
                                            placeholder="First Name"
                                            type="text"
                                            onChange={(e) => { setuserData({ ...userData, firstName: e.target.value }) }}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="px-md-1" md="4">
                                    <FormGroup>
                                        <label>Last Name</label>
                                        <Input
                                            placeholder="Last Name"
                                            type="text"
                                            onChange={(e) => { setuserData({ ...userData, lastName: e.target.value }) }}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-md-1" md="4">
                                    <FormGroup>
                                        <label>Password</label>
                                        <div className='d-flex'>

                                            <Input
                                                className='fs-8 fw-200'
                                                placeholder="password"
                                                type="password"
                                                id="id_password"
                                                onChange={(e) => { setuserData({ ...userData, password: e.target.value }) }}
                                                onKeyUp={(e) => passwordChanged(e)}
                                            />
                                            <i className="tim-icons icon-lock-circle " id="togglePassword" style={{ marginLeft: "-32px", marginTop: "17px", cursor: "pointer " }} />
                                        </div>

                                        <span id='strength'></span>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <label>Address</label>
                                        <Input
                                            placeholder="Home Address"
                                            type="text"
                                            onChange={(e) => { setuserData({ ...userData, address: e.target.value }) }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-md-1" md="6">
                                    <FormGroup>
                                        <label>City</label>
                                        <Input
                                            placeholder="City"
                                            type="text"
                                            onChange={(e) => { setuserData({ ...userData, city: e.target.value }) }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-md-1" md="6">
                                    <FormGroup>
                                        <label>Country</label>
                                        <Input
                                            placeholder="Country"
                                            type="text"
                                            onChange={(e) => { setuserData({ ...userData, country: e.target.value }) }}
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <label>About Me</label>
                                        <Input
                                            cols="80"
                                            placeholder="Here can be your description"
                                            rows="4"
                                            onChange={(e) => { setuserData({ ...userData, about: e.target.value }) }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <p className="forgot-password text-right">
                                Already registered ?  <a href="/">Login</a>
                            </p>
                            <Button className="btn-fill" color="primary" type="submit" name="save" >
                                <a />
                                Sign Up
                            </Button>
                        </CardFooter>
                    </Card>
                </Col>
            </div>
        </Form>
    )
}
export default SignUp