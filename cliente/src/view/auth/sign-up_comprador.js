import axios from 'axios';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AuthService from "../auth.service";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const baseUrl = "http://localhost:3000";

export default function Component1() {
  const [campNif, setcampNif] = useState("");
  const [campCpe, setcampCpe] = useState("");
  const [campMorada, setcampMorada] = useState("");
  const currentUser = AuthService.getCurrentUserId();

  function sendUpdate() {
    const url = `${baseUrl}/utilizadores/update/${currentUser}`;
    const datapost = {
      nif: campNif,
      cpe: campCpe,
      morada: campMorada
    };
    axios.put(url, datapost)
      .then(response => {
        if (response.data.success === true) {
        } else {
          alert("Error");
        }
      }).catch(error => {
        alert("Error 34 " + error);
      });
  }

  return (
    <div>
      <div className="wrapper">
        <section className="login-content">
          <div className="row m-0 align-items-center bg-white vh-100">
            <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
              <img src="image/auth/5.png" className="img-fluid gradient-main animated-scaleX" alt="images" />
            </div>
            <div className="col-md-6">
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <div className="card card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                    <div className="card-body">
                      <a href="../../dashboard/index.html" className="navbar-brand d-flex align-items-center mb-3">
                        {/*Logo start*/}
                        {/*logo End*/}
                        {/*Logo start*/}
                        <div className="logo-main">
                          <div className="logo-normal">
                            <svg className="text-primary icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="-0.757324" y="19.2427" width={28} height={4} rx={2} transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                              <rect x="7.72803" y="27.728" width={28} height={4} rx={2} transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                              <rect x="10.5366" y="16.3945" width={16} height={4} rx={2} transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                              <rect x="10.5562" y="-0.556152" width={28} height={4} rx={2} transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                            </svg>
                          </div>
                          <div className="logo-mini">
                            <svg className="text-primary icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="-0.757324" y="19.2427" width={28} height={4} rx={2} transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                              <rect x="7.72803" y="27.728" width={28} height={4} rx={2} transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                              <rect x="10.5366" y="16.3945" width={16} height={4} rx={2} transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                              <rect x="10.5562" y="-0.556152" width={28} height={4} rx={2} transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                        {/*logo End*/}
                        <h4 className="logo-title ms-3">wonderIT</h4>
                      </a>
                      <h2 className="mb-2 text-center">Registo Comprador</h2>
                      <p className="text-center">Registe os seus dados</p>
                      <form>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="email" className="form-label">CPE</label>
                              <input type="text" className="form-control" value={campCpe} onChange={value =>
                                setcampCpe(value.target.value)} id="validationCustom01" defaultValue />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="phone" className="form-label">NIF</label>
                              <input type="text" className="form-control" value={campNif} onChange={value =>
                                setcampNif(value.target.value)} id="validationCustom01" defaultValue />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label htmlFor="last-name" className="form-label">Morada</label>
                              <input type="text" className="form-control" value={campMorada} onChange={value =>
                                setcampMorada(value.target.value)} id="validationCustom01" defaultValue />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <Link type="submit" className="btn btn-primary" onClick={() => sendUpdate()} to={`/dashboard_comprador/${currentUser}`}>Registar</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sign-bg sign-bg-right">
                <svg width={280} height={230} viewBox="0 0 421 359" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.05">
                    <rect x="-15.0845" y="154.773" width={543} height="77.5714" rx="38.7857" transform="rotate(-45 -15.0845 154.773)" fill="#3A57E8" />
                    <rect x="149.47" y="319.328" width={543} height="77.5714" rx="38.7857" transform="rotate(-45 149.47 319.328)" fill="#3A57E8" />
                    <rect x="203.936" y="99.543" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 203.936 99.543)" fill="#3A57E8" />
                    <rect x="204.316" y="-229.172" width={543} height="77.5714" rx="38.7857" transform="rotate(45 204.316 -229.172)" fill="#3A57E8" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}