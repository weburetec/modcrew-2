import react from "react";
import styles from "../stylesheets/loginNavbar.css";

function LoginNavbar(){
    return (
        <div>
        <nav className="navbar navbar-expand-lg login-navbar-main">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand logo-login-navbar" href="/"></a>
                        <div className="main-div">
                            <div className="row upper-navbar">
                                <ul className="navbar-nav col-6 me-auto ">
                                    <li className="nav-item upper-nav-list">
                                    <button className="login-winner-list ">Winner List</button>
                                        <a className="nav-link" href="#"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* <button className="login-winner-list ">Winner List</button> */}
        </div>
    );
}

export default LoginNavbar;