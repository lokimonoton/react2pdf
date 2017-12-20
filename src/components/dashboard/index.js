import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }
    render() {
        return (
            <div className="main-wrapper">
                <div className="app" id="app">
                    <header className="header">
                        <div className="header-block header-block-collapse d-lg-none d-xl-none">
                            <button className="collapse-btn" id="sidebar-collapse-btn">
                                <i className="fa fa-bars"></i>
                            </button>
                        </div>
                        <div className="header-block header-block-nav">
                            <ul className="nav-profile">
                                <li className="profile dropdown">
                                    <a className="nav-link dropdown-toggle " data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                        <div className="img rounded-circle" style={{ backgroundImage: `url('https://avatars3.githubusercontent.com/u/3959008?v=3&s=40')` }}> </div>

                                        <span className="name"> Agent </span>
                                    </a>
                                    <div className="dropdown-menu profile-dropdown-menu" aria-labelledby="dropdownMenu1">
                                        <a className="dropdown-item" href="notifications.html">
                                            <i className="fa fa-bell icon"></i> Notifications
                                        <sup>
                                                <span className="counter"><b className="badge bg-danger">8</b></span>
                                            </sup>
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fa fa-question-circle icon"></i> Help </a>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/" className="dropdown-item" >
                                            <i className="fa fa-power-off icon"></i> Logout </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </header>
                    <aside className="sidebar">
                        <div className="sidebar-container">
                            <div className="sidebar-header">
                                <div className="brand">
                                    <img className="logo" src={require('../../assets/logo.png')} alt="" />
                                </div>
                            </div>
                            <nav className="menu">
                                <ul className="sidebar-menu metismenu" id="sidebar-menu">
                                    <li className="">
                                        <Link to="/home">
                                            <i className="fa fa-home"></i> Home </Link>
                                    </li>
                                    <li className="">
                                        <a href="">
                                            <i className="fa fa-copy"></i> Contracts
                                        <i className="fa arrow"></i>
                                        </a>
                                        <ul className="sidebar-nav">
                                            <li className="">
                                                <Link to="/contractlist"> All
                                                <sup>
                                                        <span className="counter">
                                                            <b className="badge bg-danger"></b>
                                                        </span>

                                                    </sup>
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link to="/contractlist"> Created
                                                <sup>
                                                        <span className="counter">
                                                            <b className="badge bg-danger"></b>
                                                        </span>

                                                    </sup>
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link to="/contractlist"> Approval Pending
                                                <sup>
                                                        <span className="counter">
                                                            <b className="badge bg-danger"></b>
                                                        </span>

                                                    </sup>
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link to="/contractlist"> ReDraft
                                                <sup>
                                                        <span className="counter">
                                                            <b className="badge bg-danger"></b>
                                                        </span>

                                                    </sup>
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link to="/contractlist"> Completed
                                                <sup>
                                                        <span className="counter">
                                                            <b className="badge bg-danger"></b>
                                                        </span>

                                                    </sup>
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link to="/contractlist"> Hidden
                                                <sup>
                                                        <span className="counter">
                                                            <b className="badge bg-danger"></b>
                                                        </span>

                                                    </sup>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className="fa fa-columns"></i> Templates
                                        <i className="fa arrow"></i>
                                        </a>
                                        <ul className="sidebar-nav">
                                            <li className="">
                                                <Link to="/templatelist"> Template List </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className="fa fa-group"></i> Clients
                                        <i className="fa arrow"></i>
                                        </a>
                                        <ul className="sidebar-nav">
                                            <li className="">
                                                <Link to="/clients"> Clients List </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="">
                                    <a href="">
                                        <i className="fa fa-copy"></i> Forms
                                        <i className="fa arrow"></i>
                                        
                                    </a>
                                    <ul className="sidebar-nav">
                                        <li className="">
                                            <Link to="/formlist"> Form List </Link>
                                        </li>
                                    </ul>
                                </li>





                                    <li>
                                        <a href="">
                                            <i className="fa fa-credit-card"></i> Payments
                                        <i className="fa arrow"></i>
                                        </a>
                                        <ul className="sidebar-nav">
                                            <li className="">
                                                <a href="payments-active.html"> Active </a>
                                            </li>
                                            <li className="">
                                                <a href="payments-expired.html"> Expired </a>
                                            </li>
                                            <li className="">
                                                <a href="payments-commissions.html"> Commissions </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="/report">
                                            <i className="fa fa-bar-chart-o"></i> Reports </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </aside>
                    <div className="sidebar-overlay" id="sidebar-overlay"></div>
                    <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                    <div className="mobile-menu-handle"></div>
                    <article className="content item-editor-page">
                        {this.props.children}
                    </article>
                </div>
            </div>
        );
    }
}
index.propTypes = {
    children: PropTypes.object.isRequired
};
export default index;