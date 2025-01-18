import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function NavBar() {
  const navigator=useNavigate()

  

  const onClick=()=>{
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userName")
    window.location.reload();

    
  }

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
      
        <Link className="navbar-brand" to="/">
          BloG
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </div>
          
          <div className="navbar-nav ms-auto">
            {localStorage.getItem("currentUser") == null ? (
              <Link
                className="nav-link btn btn-outline-primary me-2"
                to="/auth"
              >
                Giriş Yap
              </Link>
            ) : (
              <div className="d-flex align-items-center">
                <Link
                  className="nav-link btn btn-outline-secondary me-2"
                  to={{
                    pathname: "/users/" + localStorage.getItem("currentUser"),
                  }}
                >
                  Profil
                </Link>
                <button className="btn btn-outline-danger" onClick={onClick}>
                  Çıkış
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
