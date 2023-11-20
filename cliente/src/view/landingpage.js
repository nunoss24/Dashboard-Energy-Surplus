import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import AuthService from "./auth.service";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../css/paginaprincipal.css';

export default function Component() {
    const [dataUtilizadores, setdataUtilizadores] = useState([]);
    const [dataOfertas, setdataOfertas] = useState([]);

    //variável que vai buscar o id do utilizador que deu login e o atribui para a função getCurrentUserId() de AuthService
    const currentUser = AuthService.getCurrentUserId();

    useEffect(() => {
        LoadUtilizadores();
        LoadOfertas();
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

    function LoadOfertas() {
        const url = "http://localhost:3000/ofertas/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataOfertas(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    //variáveis e função que dita os números de anúncios, números de venda e números de utilizadores
    var anuncios = 0;
    var nVendas = 0;
    var utilizadores = 0;
    function dadosLandingpage() {
        dataUtilizadores.map((data, index) => {
            utilizadores++;
            nVendas = nVendas + data.nCompras;
        });
        dataOfertas.map((dataO, index) => {
            anuncios++;
        });
        return {
            anuncios: anuncios,
            nVendas: nVendas,
            utilizadores: utilizadores
        };
    }
    const dados = dadosLandingpage();
    anuncios = dados.anuncios;
    nVendas = dados.nVendas;
    utilizadores = dados.utilizadores;

    return (
        <div>
            <div className="fundo rounded-bottom-circle">
                <div className="container">
                    <nav className="navbar ">
                        <div className="container-fluid d-flex justify-content-between m-5">
                            <img className="img-fluid" style={{ width: '80px' }} src="image/logo.png" />
                            <form className="d-flex " role="search">
                                <Link className="btn btn-outline-dark me-2" to={`/iniciarsessao`}>
                                    Entrar
                                </Link>
                                <Link className="btn btn-primary" to="/registar">
                                    Registar
                                </Link>
                            </form>
                        </div>
                    </nav>
                </div>
                <div className=" text-center pt-2 pb-5">
                    <div className="card-body">
                        <h1 className="card-title mb-4">Venda e Compra de<br />Excedente Energético</h1>
                        <div className="mb-5"></div>
                    </div>
                </div>
            </div>
            <div className="container text-center  mt-5">
                <div className="row d-flex justify-content-evenly">
                    <div className="col-3 ">
                        <div className="card text-center justify-content-center fundo mb-3">
                            <div className="card-body">
                                <i className="fa-solid fa-coins p-2 rounded" style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} />
                                <h5 className="card-title pt-1" style={{ color: '#000000', }}>{nVendas}</h5>
                                <p className="card-text" style={{ color: '#000000', }}>Número de vendas</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card text-center mb-3 fundo">
                            <div className="card-body">
                                <i className="fa-solid fa-arrow-trend-up p-2 rounded" style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} />
                                <h5 className="card-title pt-1" style={{ color: '#000000', }}>{anuncios}</h5>
                                <p className="card-text" style={{ color: '#000000', }}>Anúncios</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card text-center mb-3 fundo">
                            <div className="card-body">
                                <i className="fa-regular fa-user p-2 rounded" style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} />
                                <h5 className="card-title pt-1" style={{ color: '#000000', }}>{utilizadores}</h5>
                                <p className="card-text" style={{ color: '#000000', }}>Utilizadores</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container  d-flex justify-content-around my-5">
                    <div className="col-5">
                        <h3>
                            Como funciona o excedente energético?
                        </h3>
                        <p>
                            O excedente energético ocorre quando uma instalação de energia solar produz mais eletricidade do que
                            é consumido no momento. Esse excesso de energia é enviado para a rede elétrica da distribuidora, e o
                            proprietário da instalação é compensado por essa produção excedente em créditos de energia.
                        </p>
                        <p>
                            Podem ser usados para reduzir a fatura de energia elétrica em momentos de baixa produção solar. Em
                            alguns casos, o excedente também pode ser armazenado em baterias para uso posterior.
                        </p>
                    </div>
                    <div className="col-4"><img className="img-fluid" src="image/a2.gif" /></div>
                </div>
            </div>
            <div className="fundo">
                <div className="container  py-5">
                    <div className="text-center">
                        <h2 className="mb-1 fw-semibold">Venda o seu excedente</h2>
                        <p>Produziu mais energia do que consome? Não deixe o seu excedente energético ir para o
                            desperdício!<br /><br />Na
                            nossa plataforma, pode vender o seu excedente energético de forma fácil e segura para
                            outros<br /><br />consumidores e produtores de energia renovável.</p>
                    </div>
                    <div className="row justify-content-evenly my-4 ">
                        <div className="col-4">
                            <div className="row ">
                                <div className="col-1 me-3">
                                    <i className="fa-sharp fa-solid fa-lightbulb p-2  rounded fs-4" style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} />
                                </div>
                                <div className="col-10">
                                    <h6 className="fw-bold">Possuir uma fonte de energia</h6>
                                    <p>Não dependa mais das flutuações nos preços de energia e crie a sua própria fonte de
                                        energia.
                                        Para
                                        conseguir vender o seu excente necessita de ter uma fonte de energia até 350 watts.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <img className="img-fluid" src="image/a1.gif" />
                        </div>
                    </div>
                    <div className="row justify-content-evenly my-4">
                        <div className="col-3">
                            <img className="img-fluid" src="image/a4.gif" />
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col-1 me-3">
                                    <i className="fa-solid fa-clipboard-check p-2 rounded fs-4" style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} />
                                </div>
                                <div className="col-10">
                                    <h6 className="mb-1 fw-bold">Registar os paineis na DGEG</h6>
                                    <p>Necessita de registar os seus painéis solares na Direção Geral de Energia e Geologia
                                        (DGEG). É um
                                        requisito legal e garante que a sua instalação está em conformidade com as normas de
                                        segurança e
                                        qualidade.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-evenly my-4">
                            <div className="col-4">
                                <div className="row">
                                    <div className="col-1 me-3">
                                        <i className="fa-sharp fa-regular fa-file-lines p-2 rounded fs-4" style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} />
                                    </div>
                                    <div className="col-10">
                                        <h6 className="mb-1 fw-bold">Solicitar um CPE de produtor de eletricidade</h6>
                                        <p>É importante solicitar um Certificado de Produção de Eletricidade (CPE). O CPE é um
                                            requisito
                                            legal para a venda de eletricidade à rede elétrica nacional.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <img className="img-fluid" src="image/5.gif" />
                            </div>
                        </div>
                        <div className="row justify-content-evenly my-4">
                            <div className="col-5">
                                <img className="img-fluid" src="image/a3.gif" />
                            </div>
                            <div className="col-4">
                                <div className="row">
                                    <div className="col-1 me-3">
                                        <i className="fa-solid fa-house-chimney-user p-2 rounded fs-4 " style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} />
                                    </div>
                                    <div className="col-10">
                                        <h6 className="mb-1 fw-bold">Criar uma conta e fazer a venda</h6>
                                        <p>Criar uma conta na nossa plataforma é rápido e fácil. Após o registo, pode facilmente
                                            publicar os seus produtos e materiais excedentes para venda. A nossa plataforma
                                            conecta-o a
                                            compradores interessados.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container  d-flex justify-content-around my-5">
                <div className="col-4"><img className="img-fluid" src="image/a2.gif" /></div>
                <div className="col-5">
                    <h3 className="fw-semibold">
                        Comprar excedente energético
                    </h3>
                    <p>
                        Passos necessários para a compra de excedente:
                    </p>
                    <div className="row">
                        <div className="col-1 me-2">
                            <i className="fa-solid fa-clipboard-check p-2 rounded " style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} />
                        </div>
                        <div className="col-10">
                            <h6 className="fw-bold">Registe-se nesta plataforma</h6>
                            <p>Registe-se agora na nossa plataforma e comece a maximizar os benefícios da sua produção ou
                                negócio com energia renovável.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1 me-2">
                            <i className="fa-sharp fa-solid fa-shop p-2 rounded " style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} />
                        </div>
                        <div className="col-10">
                            <h6 className="fw-bold">Aceda à área de comprador</h6>
                            <p>Aceda agora à área de comprador da nossa plataforma e encontre excedente energético</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1 me-2">
                            <i className="fa-solid fa-cart-shopping p-2 rounded " style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} />
                        </div>
                        <div className="col-10">
                            <h6 className="fw-bold">Escolha o melhor serviço e pague</h6>
                            <p>Encontre o serviço perfeito para si e faça negócios de forma simples e segura. Na nossa
                                plataforma, escolha entre uma ampla gama de serviços de energia renovável e pague de forma fácil
                                e conveniente.</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div>
                    <div className="container">
                        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4">
                            <div className="col-md-6 d-flex align-items-center text-muted fs-4 ">
                                <p className="ms-5 ps-5">Conectamos compradores e vendedores para uma economia energética
                                    e sustentável!</p>
                            </div>
                            <div className="col-md-2 justify-content-end ">
                                <p style={{ color: '#272D37' }}><i className="fa-solid fa-map" style={{ color: '#272D37' }} /> Viseu
                                </p>
                                <p style={{ color: '#272D37' }}>
                                    <i className="fa-regular fa-comment" style={{ color: '#272D37' }} /> +351 345 678
                                </p>
                            </div>
                        </div>
                        <footer className="d-flex flex-wrap justify-content-around align-items-center py-3 mt-4 border-top">
                            <div className="col-md-5 d-flex align-items-center ">
                                <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                                    <svg className="bi" width={30} height={24}>
                                        <use xlinkHref="#bootstrap" />
                                    </svg>
                                </a>
                                <span className="mb-3 mb-md-0 text-muted">© 2023 wonderit</span>
                            </div>
                            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                                <li className="ms-3"><a className="text-muted" href="#"><i className="fa-brands fa-twitter rounded-circle p-2" style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} /></a></li>
                                <li className="ms-3"><a className="text-muted" href="#"><i className="fa-brands fa-square-facebook rounded-circle p-2" style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} /></a></li>
                                <li className="ms-3"><a className="text-muted" href="#"><i className="fa-brands fa-instagram rounded-circle p-2" style={{ color: '#ffffff', backgroundColor: '#1C1E53' }} /></a></li>
                            </ul>
                        </footer>
                    </div>
                </div>
            </footer>
        </div>
    );
}