import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AuthService from "../auth.service";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Component1() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState("");
    const navigate = useNavigate();



    const [dataUtilizadores, setdataUtilizadores] = useState([]);
    AuthService.logout();
    useEffect(() => {
        LoadUtilizadores();
    }, []);

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


    //verificação do login e leva para a respetiva pagina
    async function HandleLogin(event) {
        event.preventDefault();
        setmessage("");
        setloading(true);
        AuthService.login(username, password)
            .then((res) => {
                if (res === "" || res === false) {
                    setmessage("Por favor adicione o e-mail e a password correspondente.");
                    setloading(false);
                }
                else {
                    dataUtilizadores.map((data, index) => {
                        if (data.email == username) {
                            if (data.ligacaoUsers[0].tipoutilizadoreCode == "V") {
                                navigate(`/dashboard_vendedor/${data.iduser}`);
                            }
                            else if (data.ligacaoUsers[0].tipoutilizadoreCode == "C") {
                                navigate(`/dashboard_comprador/${data.iduser}`);
                            }
                            else {
                                navigate("/dashboard_admin/");
                            }
                        }
                    });
                }
            })
            .catch((error) => {
                setmessage("Por favor adicione o e-mail e a password correspondente.");
                setloading(false);
            });
    }

    return (
        <div>
            <div className="wrapper">
                <section className="login-content">
                    <div className="row m-0 align-items-center bg-white vh-100">
                        <div className="col-md-6">
                            <div className="row justify-content-center">
                                <div className="col-md-10">
                                    <div className="card card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
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
                                            <h2 className="mb-2 text-center">Iniciar sessão</h2>
                                            <p className="text-center">Inicie sessão para entrar na sua conta.</p>
                                            <form onSubmit={HandleLogin}>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label htmlFor="email" className="form-label">Email</label>
                                                            <input type="text"
                                                                className="form-control"
                                                                name="username"
                                                                value={username}
                                                                onChange={(value) => setusername(value.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label htmlFor="password" className="form-label">Password</label>
                                                            <input type="password"
                                                                className="form-control"
                                                                name="password"
                                                                value={password}
                                                                onChange={(value) => setpassword(value.target.value)} />
                                                        </div>
                                                    </div>
                                                    {message && (
                                                        <div className="form-group">
                                                            <div className="alert alert-danger" role="alert">
                                                                {message}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <button type="submit" className="btn btn-primary">Entrar</button>
                                                </div>
                                                <p className="mt-3 text-center">
                                                    Não tem uma conta? <Link to={`/registar/`} className="text-underline">Crie uma!</Link>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sign-bg">
                                <svg width={280} height={230} viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.05">
                                        <rect x="-157.085" y="193.773" width={543} height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                                        <rect x="7.46875" y="358.327" width={543} height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                                        <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                                        <rect x="62.3154" y="-190.173" width={543} height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                            <img src="/image/auth/imagem6.png" className="img-fluid gradient-main animated-scaleX" alt="images" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}