import axios from 'axios';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AuthService from "../auth.service";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Component1() {

    const [dataUtilizadores, setdataUtilizadores] = useState([]);

    useEffect(() => {
        LoadUtilizadores();
        componentDidMount();
    }, []);


    //função que descobre qual é o id da ultima pessoa atribuindo assim á variavel ultimoUtilizador esse valor
    let ultimoUtilizador = 0;
    dataUtilizadores.map((data, index) => {
        if (data.iduser > ultimoUtilizador) {
            ultimoUtilizador = data.iduser;
            console.log(data.iduser)
            console.log(ultimoUtilizador)
        }
    });

    //reload até à primeira contagem
    const reloadCount = sessionStorage.getItem('reloadCount');
    function componentDidMount() {
        if (reloadCount < 2) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
    }

    function LoadUtilizadores() {
        const url = "http://localhost:3000/utilizadores/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataUtilizadores(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    //atribuição do ultimoUtilizador ao local storage
    AuthService.setCurrentUserId(ultimoUtilizador);

    //escolha do utilizador em ser comprador
    function EscolhaC() {
        const baseUrl = "http://localhost:3000/ligacao/create"
        const datapost = {
            utilizadoreIduser: ultimoUtilizador,
            tipoutilizadoreCode: 'C',
        }
        axios.post(baseUrl, datapost)
            .then(response => {
                if (response.data.success === true) {
                }
                else {
                    alert(response.data.message)
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }

     //escolha do utilizador em ser vendedor
    function EscolhaV() {
        const baseUrl = "http://localhost:3000/ligacao/create"
        const datapost = {
            utilizadoreIduser: ultimoUtilizador,
            tipoutilizadoreCode: 'V',
        }
        axios.post(baseUrl, datapost)
            .then(response => {
                if (response.data.success === true) {
                }
                else {
                    alert(response.data.message)
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
        console.log(datapost)
    }

    return (
        <div>
            <div className="wrapper">
                <section className="login-content">
                    <div className="row m-0 align-items-center bg-white vh-100">
                        <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                            <img src="image/auth/4.png" className="img-fluid gradient-main animated-scaleX" alt="images" />
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
                                                {/*logo End*/}
                                            </a>
                                            <h2 className="mb-2 text-center">Qual o seu perfil?</h2>
                                            <p className="text-center">Escolha se deseja comprar ou vender!</p>
                                            <form>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <Link type="submit" onClick={() => EscolhaC()} to="/registarcomprador">
                                                                <img src="image/auth/comprador.png" className="img-fluid gradient-main animated-scaleX" alt="images" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <Link type="submit" onClick={() => EscolhaV()} to="/registarvendedor">
                                                                <img src="image/auth/vendedor.png" className="img-fluid gradient-main animated-scaleX" alt="images" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div></form>
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
                    </div></section>
            </div>
        </div>
    );
}