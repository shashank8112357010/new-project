import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';

export default function Login(props) {


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const history = useHistory()
    let auth = localStorage.getItem("auth");
    

    const loginSubmit = (e) => {

        e.preventDefault()
        axios.post(`http://localhost:8000/user/login`,{
            email : email ,
            password:password
        }, { headers: {
            'Content-Type': 'application/json'
        }} ).then((res) => {
         console.log(res,"<===============response from login")
        })
    }

useEffect(()=>{
    const togglePassword = document.getElementById('togglePassword');
    let passWord = document.getElementById('id_password');
    togglePassword?.addEventListener('click', function (e) {
        let type = passWord?.getAttribute('type') === 'password' ? 'text' : 'password';
        passWord.setAttribute('type', type);
    });
},[])

    return (
  
                <div className="auth-wrapper ">
                    <div className="auth-inner">
                    <h1 style={{fontWeight:"bolder"}} className="mb-5">Travel Nation</h1>
                        <form onSubmit={e => loginSubmit(e)}>
                            <h3 style={{fontWeight:"bolder"}} >Login</h3>
                            <div className="mb-3">
                                <label style={{color:"white"}}>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label style={{color:"white"}}>Password</label>
                                <div className="d-flex">
                                    <input
                                        id="id_password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <i className="tim-icons icon-lock-circle " id="togglePassword" style={{ marginLeft: "-32px", marginTop: "17px", cursor: "pointer " }} />
                                </div>

                            </div>
                            <p className="forgot-password text-right">
                                <a href="/forgetpassword">Forget Password ? </a>
                            </p>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary submitbtn">
                                Login
                                </button>
                            <p className="forgot-password text-center">
                                Don't have account  <a href="/register">register?</a>
                            </p>
                            </div>
                        </form>
                    </div>
            </div>
  
    )
}
