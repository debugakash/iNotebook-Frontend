import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Successfully!", "success")
            navigate("/");
        }
        else {
            props.showAlert("Invalid Credentials!", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='mt-3'>
            <h1 className="text-center text-primary mb-4" >Login to continue to iNotebook</h1>
            <form onSubmit={handleSubmit} style={{ color: props.changeColor === "dark" ? "white" : "black" }}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" style={{
                        color: props.changeColor === "dark" ? "white" : "black",
                        backgroundColor: props.changeColor === "dark" ? "#212529" : "white"
                    }} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" style={{
                        color: props.changeColor === "dark" ? "white" : "black",
                        backgroundColor: props.changeColor === "dark" ? "#212529" : "white"
                    }} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
