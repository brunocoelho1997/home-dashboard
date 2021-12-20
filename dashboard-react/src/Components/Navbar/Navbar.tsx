import React from 'react';
import './Navbar.css';


class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar bg-dark navbar-dark shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Whatch My House - Dashboard</a>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    );
  }
}

export default Navbar;