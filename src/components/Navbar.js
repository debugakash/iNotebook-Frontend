import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const showMenuHandler = () => setShowMenu(!showMenu);

    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login")
        props.showAlert("Logout Successfully!", "success")
    }
    return (
        <nav className="navbar navbar-expand-lg fixed-top shadow navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/" >iNotes</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i onClick={showMenuHandler} className={showMenu ? "fas fa-times" : "fas fa-bars"} />
                    {/* <span className="navbar-toggler-icon"></span> */}
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-success mx-1" to="/signup" role="button">Signup</Link>
                    </form> : <button onClick={handleLogout} className="btn btn-warning">Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
