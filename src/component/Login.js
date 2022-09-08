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
        axios.get(`http://localhost:3000/users`).then((res) => {
            var user = res?.data.find(function (item) {
                if (item.email == email && item.password == password) {
                    return true
                }
            })
            if (user) {
                localStorage.setItem("token", user.id)
                localStorage.setItem("auth", true);
                history.replace('/admin/dashboard')
                toast.success("Login successfull");
            } else {
                toast.error("Invalid credentials")
            }
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
        <div>
            <div className="App ">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={e => loginSubmit(e)}>
                            <h3>Sign In</h3>
                            <div className="mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
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
                                Don't have account  <a href="/register">register?</a>
                            </p>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
