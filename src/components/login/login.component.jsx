import React from 'react';
import { Link } from 'react-router';

class loginPage extends React.Component {
    render() {
        return (
            <div>
                <div className="auth">
                    <div className="auth-container">
                        <div className="card">
                            <header className="auth-header">
                                <h1 className="auth-title">
                                    <div className="logo">
                                        {<img className="logo" src={require('../../assets/Cradle+Wealth+Logo.jpg')} alt="" />}
                                        <span className="l l5"></span>
                                    </div>
                                </h1>
                            </header>
                            <div className="auth-content">
                                <p className="text-center">LOGIN TO CONTINUE</p>
                                <form id="login-form" >
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="email" className="form-control underlined" name="username" id="username" placeholder="Your email address" required /> </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control underlined" name="password" id="password" placeholder="Your password" required /> </div>
                                    <div className="form-group">
                                        <label htmlFor="remember">
                                            <input className="checkbox" id="remember" type="checkbox" />
                                            <span>Remember me</span>
                                        </label>
                                        <a href="reset.html" className="forgot-btn pull-right">Forgot password?</a>
                                    </div>
                                    <div className="form-group">
                                        <Link to="/dashboard" type="button"  className="btn btn-block btn-primary">Login</Link>
                                    </div>
                                    <div className="form-group">
                                        <p className="text-muted text-center">Do not have an account?
                                    <a href="signup.html">Sign Up!</a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link to="/dashboard" className="btn btn-secondary btn-sm">
                                <i className="fa fa-arrow-left"></i> Back to dashboard </Link>
                        </div>
                    </div>
                </div>
                <div className="ref" id="ref">
                    <div className="color-primary"></div>
                    <div className="chart">
                        <div className="color-primary"></div>
                        <div className="color-secondary"></div>
                    </div>
                </div>
            </div>

        );
    }
}

export default loginPage;
