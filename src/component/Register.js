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
    phoneno: "",  
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
        console.log("userData",userData)
        if (ValidateEmail(userData.email) && checkpassword(userData.password)) {
            axios.post(`http://localhost:8000/user/signup`, {
                name: userData.username,
                password: userData.password,
                email: userData.email,
                contactnumber: userData.phoneno,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    console.log("res===== SQL>",res)
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
        <div className="auth-wrapper ">
        <div className="auth-inner">
        <Form onSubmit={e => submit(e)}>
            <div className='d-flex justify-content-center'>

                <Col md="8 mt-5">
             
                        <div>
                            <h2 className="title fs-12">Travel Nation</h2>
                        </div>
                    
                            <Row>
                                <Col className="p-md-1" md="12">
                                    <FormGroup>
                                        <label style={{color:"white"}}>Username</label>
                                        <Input
                                            placeholder="Username"
                                            type="text"
                                            onChange={(e) => { setuserData({ ...userData, username: e.target.value }) }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="p-md-1" md="12">
                                    <FormGroup>
                                        <label style={{color:"white"}} htmlFor="exampleInputEmail1">
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
                                <Col className="px-md-1" md="12">
                                    <FormGroup>
                                        <label style={{color:"white"}}>Phone number</label>
                                        <Input
                                            placeholder="Phone no"
                                            type="number"
                                            onChange={(e) => { setuserData({ ...userData, phoneno: e.target.value }) }}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-md-1" md="12">
                                    <FormGroup>
                                        <label style={{color:"white"}}>Password</label>
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
                     
                        <div>
                            <p className="forgot-password text-right">
                                Already registered ?  <a href="/">Login</a>
                            </p>
                            <Button className="btn-fill submitbtn" color="primary" type="submit" name="save" >
                                <a />
                             Register
                            </Button>
                        </div>
                    
                </Col>
            </div>
        </Form>
        </div>
        </div>
    )
}
export default SignUp