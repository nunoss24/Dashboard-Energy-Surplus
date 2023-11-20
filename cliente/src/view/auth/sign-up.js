import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import AuthService from "../auth.service";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Component1() {
    const [campNome, setcampNome] = useState("");
    const [campEmail, setcampEmail] = useState("");
    const [campTelefone, setcampTelefone] = useState("");
    const [campPass, setcampPass] = useState("");

    //função que retira do local storage os dados sobre algum utilizador logado
    AuthService.logout();
    function SendSave() {
        if (campNome === "") {
            alert("Insira o nome!")
        }
        else if (campEmail === "") {
            alert("Insira o e-mail!")
        }
        else if (campTelefone === "") {
            alert("Introduza o telefone!")
        }
        else if (campPass === "") {
            alert("Introduza a palavra-passe!")
        }
        else {
            const baseUrl = "http://localhost:3000/utilizadores/create"
            const datapost = {
                nomeuser: campNome,
                email: campEmail,
                pass: campPass,
                telemovel: campTelefone
            }
            axios.post(baseUrl, datapost)
                .then((response) => {
                    if (response.data.success === true) {
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch((error) => {
                    alert("Error 34 " + error);
                });
        }
    }

    return (
        <div>
            <div className="wrapper">
                <section className="login-content">
                    <div className="row m-0 align-items-center bg-white vh-100">
                        <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                            <img src="/image/auth/4.png" className="img-fluid gradient-main animated-scaleX" alt="images" />
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
                                            <h2 className="mb-2 text-center">Registo</h2>
                                            <p className="text-center">Cria a tua conta</p>
                                            <form>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="full-name" className="form-label">Nome</label>
                                                            <input type="text" className="form-control" value={campNome} onChange={value =>
                                                                setcampNome(value.target.value)} defaultValue required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="last-name" className="form-label">E-mail</label>
                                                            <input type="email" className="form-control" value={campEmail} onChange={value =>
                                                                setcampEmail(value.target.value)} defaultValue required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="email" className="form-label">Telemóvel</label>
                                                            <input type="text" className="form-control" value={campTelefone} onChange={value =>
                                                                setcampTelefone(value.target.value)} defaultValue required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="phone" className="form-label">Palavra-Passe</label>
                                                            <input type="password" className="form-control" value={campPass} onChange={value =>
                                                                setcampPass(value.target.value)} defaultValue required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 d-flex justify-content-center">
                                                        <div className="form-check mb-3">
                                                            <input type="checkbox" className="form-check-input" id="customCheck1" required />
                                                            <label className="form-check-label" htmlFor="customCheck1">Concordo com os termos de
                                                                uso</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <Link type="submit" className="btn btn-primary" onClick={() => SendSave()} to="/registarescolha">Registar</Link>
                                                </div>
                                                <p className="mt-3 text-center">
                                                    Já tenho uma conta! <Link to="/iniciarsessao" className="text-underline">Iniciar Sessão</Link>
                                                </p>
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