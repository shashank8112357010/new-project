import { React, useState, useEffect , createContext  } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

import {
    Button,
    Card,
    CardBody,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import img from "../assets/img/test image.jpg"

export const userData=createContext()

function UserProfile() {

    const [edit, seteditprfile] = useState(false)
    const [userdata, setuserdata] = useState()
    const [editData, seteditData] = useState()
    let token = localStorage.getItem("token")

    useEffect(() => {

        axios.get(`http://localhost:3000/users`).then((res) => {
            var user = res?.data.find(function (item) {
                if (item.id == token) {
                    return  true
                }
            })
            setuserdata(user)
            
            seteditData({
                username: userdata?.username,
                password: userdata?.password,
                email: userdata?.email,
                firstName: userdata?.firstName,
                lastName: userdata?.lastName,
                address: userdata?.address,
                city: userdata?.city,
                country: userdata?.country,
                about: userdata?.about
            })
        })
        const togglePassword = document.getElementById('togglePassword');
        const password = document.getElementById('id_password');
        togglePassword?.addEventListener('click', function (e) {
            let type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
        });

    }, [token, edit])
    const editProfile = (e) => {
        seteditprfile(true)
        return true
    }
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
    const submiteditData = (e) => {
        e.preventDefault()
        if (ValidateEmail(editData.email) && checkpassword(editData.password)) {
            axios.patch(`http://localhost:3000/users/${token}`, {
                username: editData?.username,
                password: editData?.password,
                email: editData?.email,
                firstName: editData?.firstName,
                lastName: editData?.lastName,
                address: editData?.address,
                city: editData?.city,
                country: editData?.country,
                about: editData?.about
            })
                .then(res => {
                    if (res.status === 200) {
                        toast.success("Profile edited successfully")
                        seteditprfile(false)
                    }
                }).catch((err) => {
                    toast.error("something went wrong")
                })
        }
    }




    return (
        <><userData.Provider value={{userdata:userdata}}></userData.Provider>
  
            <div className="content">
                {!edit ? (
                      
                    <Row>
                        <Col md="12">
                            <Card className="card-user" style={{ height: "120%" }}>
                                <div className="d-flex justify-content-end">
                                    <Button className="m-3 fs-14" style={{ background: "transparent" }} name="edit" type="submit" onClick={e => editProfile(e)}><i className="tim-icons icon-pencil" /></Button>
                                </div>
                                <CardBody>
                                    <CardText />
                                    <div className="author">
                                        <div className="block block-one" />
                                        <div className="block block-two" />
                                        <div className="block block-three" />
                                        <div className="block block-four" />
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="avatar"
                                                src={img}
                                            />
                                            <h5 className="title">{userdata?.firstName}{"  "}{userdata?.lastName}</h5>
                                        </a>
                                    </div>
                                    <div className="card-description ">
                                        <div className="row"> 
                                            <div className="col-lg-4">   <label className="userdisplay ">User Name</label>  {"  "} {userdata?.username}</div>
                                            <div className="col-lg-4">  <label className="userdisplay ">Email</label>  {"  "}{userdata?.email}</div>
                                            <div className="col-lg-4">  <label className="userdisplay">Password</label>  {"  "}{userdata?.password}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4">  <label className="userdisplay">First Name</label>  {"  "}{userdata?.firstName}</div>
                                            <div className="col-lg-4">  <label className="userdisplay">Last Name</label>  {"  "}{userdata?.lastName}</div>
                                            <div className="col-lg-4 ">  <label className="userdisplay">Address</label>  {"  "}{userdata?.address}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4">  <label className="userdisplay">City</label>  {"  "}{userdata?.city}</div>
                                            <div className="col-lg-4">  <label className="userdisplay">Country</label>  {"  "}{userdata?.country}</div>
                                            <div className="col-lg-4">  <label className="userdisplay">About</label>  {"  "}{userdata?.about}</div>
                                        </div>

                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                   
                ) : (
                    <Col md="12 ">
                        <Card>
                            <CardBody>
                                <Form onSubmit={(e) => submiteditData(e)}>
                                    <Row className="mt-3">
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>Username</label>
                                                <Input
                                                    placeholder="Username"
                                                    type="text"
                                                    defaultValue={userdata?.username}
                                                    onChange={(e) => { seteditData({ ...editData, username: e.target.value }) }}
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
                                                    defaultValue={userdata?.email}
                                                    onChange={(e) => { seteditData({ ...editData, email: e.target.value }) }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Input
                                                    placeholder="Company"
                                                    type="text"
                                                    defaultValue={userdata?.firstName}
                                                    onChange={(e) => { seteditData({ ...editData, firstName: e.target.value }) }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="6">
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Input
                                                    placeholder="Last Name"
                                                    type="text"
                                                    defaultValue={userdata?.lastName}
                                                    onChange={(e) => { seteditData({ ...editData, lastName: e.target.value }) }}
                                                />
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
                                                    defaultValue={userdata?.address}
                                                    onChange={(e) => { seteditData({ ...editData, address: e.target.value }) }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>City</label>
                                                <Input
                                                    placeholder="City"
                                                    type="text"
                                                    defaultValue={userdata?.city}
                                                    onChange={(e) => { seteditData({ ...editData, city: e.target.value }) }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-md-1" md="4">
                                            <FormGroup>
                                                <label>Country</label>
                                                <Input
                                                    placeholder="Country"
                                                    type="text"
                                                    defaultValue={userdata?.country}
                                                    onChange={(e) => { seteditData({ ...editData, country: e.target.value }) }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>Password</label>
                                                <div className="d-flex">

                                                    <Input
                                                        placeholder="password"
                                                        type="password"
                                                        id="id_password"
                                                        defaultValue={userdata?.password}
                                                        onChange={(e) => { seteditData({ ...editData, password: e.target.value }) }}
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
                                                <label>About Me</label>
                                                <Input
                                                    cols="80"
                                                    placeholder="Here can be your description"
                                                    rows="4"
                                                    defaultValue={userdata?.about}
                                                    onChange={(e) => { seteditData({ ...editData, about: e.target.value }) }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button className="btn-fill" color="primary" type="submit" name="save">
                                        Save
                                    </Button>
                                </Form>
                            </CardBody>

                        </Card>
                    </Col>
                )}
            </div>
       
        </>
    );
}

export default UserProfile;
