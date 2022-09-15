import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';

export default function Forgetpassword(props) {


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
  
        <div className="auth-wrapper ">
        <div className="auth-inner">
        <h1 style={{fontWeight:"bolder"}} className="mb-5">Travel Nation</h1>
            <form onSubmit={e => loginSubmit(e)}>
                <h3 style={{fontWeight:"bolder"}} >Forget Password</h3>
                <div className="mb-3">
                    <label style={{color:"white"}}>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Registered Email Address"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
           
          
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary submitbtn">
                    Login
                    </button>
                    <p className="forgot-password text-right">
                               Existing user ?  <a href="/">Login</a>
                            </p>
                </div>
            </form>
        </div>
</div>
  
    )
}
