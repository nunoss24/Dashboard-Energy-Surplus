import { useParams } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AuthService from "../auth.service";
import AtualUtilizador from '../atualUtilizador'
import jsPDF from 'jspdf';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import avatar from "../../images/avatars/01.png";
import banner from "../../images/dashboard/top-header.png";
import iconbanner from "../../images/wonderit/customer-behavior 1.png";
import Aleatorio from "../valorAleatorioDiario";

const baseUrl = "http://localhost:3000";

export default function Component1() {
    const [dataOfertas, setdataOfertas] = useState("");
    const [campDuracao, setcampDuracao] = useState("");
    const [campNome, setcampNome] = useState("");
    const [campPotencia, setcampPotencia] = useState("");
    const [campPreco, setcampPreco] = useState("");
    const [campTelemovel, setcampTelemovel] = useState("");
    const [campEmail, setcampEmail] = useState(0);
    const { compraId } = useParams();
    const [dataUtilizadores, setdataUtilizadores] = useState([]);
    const [dataContratos, setdataContratos] = useState([]);
    const navigate = useNavigate();

    const currentUser = AuthService.getCurrentUserId();

    useEffect(() => {
        LoadUtilizadores();
        LoadContratos();
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

    function LoadContratos() {
        const url = "http://localhost:3000/contratos/";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataContratos(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    useEffect(() => {
        const url = baseUrl + "/ofertas/" + compraId;
        console.log(url);
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data[0];
                    setdataOfertas(data);
                    setcampNome(data.nomevendedor);
                    setcampDuracao(data.duracaovenda);
                    setcampPotencia(data.potenciaproduto);
                    setcampPreco(data.precomes);
                    setcampTelemovel(data.utilizadore.telemovel);
                    setcampEmail(data.utilizadore.email);
                } else {
                    alert("Error web service");
                }
            })
            .catch(error => {
                alert("Error server: " + error);
            });
    }, []);

    //função que retorna o nome do utilizador logado
    function nomeUser() {
        return dataUtilizadores.map((data, index) => {
            if (data.iduser == currentUser) {
                return data.nomeuser
            }
        });
    }

    //função que gera um pdf
    const handleClick = () => {
        // Cria um novo objeto jsPDF
        var doc = new jsPDF();

        // Define o conteúdo do PDF
        var content = 'CONTRATO DE TROCA DE EXCEDENTE ENERGÉTICO\n\n' +
            'Eu, [                                      ], COMPRADOR,\n' +
            'e eu, [                                      ], VENDEDOR,\n' +
            'celebramos o presente contrato para a troca de excedente energético.\n' +
            '1. O COMPRADOR concorda em pagar o excedente de energia elétrica\n' +
            '2. O VENDEDOR concorda em fornecer o excedente de energia elétrica\n' +
            'Local e data:\n\n' +
            '____________________________   ______________________\n' +
            'Assinatura do Comprador                    Assinatura do Vendedor';

        // Gera o nome do arquivo usando a variável numAleatorioC
        var numAleatorioC = numAleatorio(); // Certifique-se de ter a função numAleatorio() definida

        var fileName = 'contrato.pdf';

        // Adiciona o conteúdo ao PDF
        doc.text(content, 10, 10);

        // Salva o arquivo PDF
        doc.save(fileName);
    };

    
    var conta = 0;
    //botao pagar que apenas aparece se o estado do contrato for true
    function btnPagar() {
        return dataContratos.map((dataC, index) => {
            if (dataC.ofertaIdoferta == compraId) {
                conta++;
                if (dataC.estado == true && conta == 1) {
                    return <button type="button" className="btn btn-primary" onClick={() => dadosUtilizador()}>Pagar</button>
                }
                else {
                    return <button type="button" className="btn btn-primary" disabled={true}>Por Validar</button>
                }
            }
        });
    }

    //função que carrega os dados do comprador e do vendedor para os mostrar no contrato
    function dadosUtilizador() {
        return dataContratos.map((dataC, index) => {
            if (dataC.ofertaIdoferta == compraId) {
                return dataUtilizadores.map((dataU, index) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'O pagamento foi efetuado com sucesso!',
                        text: 'O contrato foi entregue!',
                        showConfirmButton: false,
                        timer: 2500
                    });
                    navigate(`/dashboard_comprador/${currentUser}`)
                    if (dataU.iduser == dataC.utilizadorIdV) {
                        dataU.servicosVendidos++;
                        dataU.totalGanho = dataU.totalGanho + dataOfertas.precomes;
                        sendUpdateV(dataU.iduser, dataU.servicosVendidos, dataU.totalGanho);
                    }
                    if (dataU.iduser == dataC.utilizadorIdC) {
                        dataU.nCompras++;
                        dataU.gastoComprador = dataU.gastoComprador + dataOfertas.precomes
                        dataU.consumoComprador = dataU.consumoComprador + dataOfertas.potenciaproduto;
                        sendUpdateC(dataU.iduser, dataU.nCompras, dataU.gastoComprador, dataU.consumoComprador);
                    }
                });
            }
        });
    }

    //alterar as estatisticas do comprador após a compra
    function sendUpdateC(id, ncompras, gcomprador, ccomprador) {
        // url de backend
        const url = baseUrl + "/dados/update/" + id
        console.log(url);
        const datapost = {
            nCompras: ncompras,
            gastoComprador: gcomprador,
            consumoComprador: ccomprador,
        }
        axios.put(url, datapost)
            .then(response => {
                if (response.data.success === true) {
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }

     //alterar as estatisticas do vendedor após a venda
    function sendUpdateV(id, svendidos, totalganho) {
        // url de backend
        const url = baseUrl + "/dados/update/" + id
        console.log(url);
        const datapost = {
            totalGanho: totalganho,
            servicosVendidos: svendidos,
        }
        axios.put(url, datapost)
            .then(response => {
                if (response.data.success === true) {
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }
    //atribuição do valor aleatorio do dia para fazer contas
    var valor = Aleatorio.obterValorDoDia();
    valor = valor / 100;
    console.log(valor);

    //numero aleatorio para o numero do contrato
    function numAleatorio() {
        var min = 100000;
        var max = 999999;
        var numero = Math.floor(Math.random() * (max - min + 1)) + min;
        return numero;
    }
    var numAleatorioC = numAleatorio();

    //fazer as contas com o camppreco que dizia que era string
    var x = (parseFloat(campPreco) + (parseFloat(campPreco) * valor)).toFixed(2)

    //return final da view
    return (
        <div>
            <aside className="sidebar sidebar-default sidebar-white sidebar-base navs-rounded-all ">
                <div className="sidebar-header d-flex align-items-center justify-content-start">
                    <Link to={`/`} className="navbar-brand">
                        {/*Logo start*/}
                        {/*logo End*/}
                        {/*Logo start*/}
                        <div className="logo-main">
                            <div className="logo-normal">
                                <svg className=" icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="-0.757324" y="19.2427" width={28} height={4} rx={2} transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                                    <rect x="7.72803" y="27.728" width={28} height={4} rx={2} transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                                    <rect x="10.5366" y="16.3945" width={16} height={4} rx={2} transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                                    <rect x="10.5562" y="-0.556152" width={28} height={4} rx={2} transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="logo-mini">
                                <svg className=" icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="-0.757324" y="19.2427" width={28} height={4} rx={2} transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                                    <rect x="7.72803" y="27.728" width={28} height={4} rx={2} transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                                    <rect x="10.5366" y="16.3945" width={16} height={4} rx={2} transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                                    <rect x="10.5562" y="-0.556152" width={28} height={4} rx={2} transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                        {/*logo End*/}
                        <h4 className="logo-title">wonderIT</h4>
                    </Link>
                </div>
                <div className="sidebar-body pt-0 data-scrollbar">
                    <div className="sidebar-list">
                        {/* Sidebar Menu Start */}
                        <ul className="navbar-nav iq-main-menu" id="sidebar-menu">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/dashboard_comprador/${currentUser}`}>
                                    <i className="icon">
                                        <svg width={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-20">
                                            <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor" />
                                        </svg>
                                    </i>
                                    <span className="item-name">Dashboard</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/compras/${currentUser}`}>
                                    <i className="icon">
                                        <svg width={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-20">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z" fill="currentColor" />
                                        </svg>
                                    </i>
                                    <span className="item-name">Compras</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to={`/definicoes/${currentUser}`}>
                                    <i className="icon">
                                        <svg width={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-20">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M20.4023 13.58C20.76 13.77 21.036 14.07 21.2301 14.37C21.6083 14.99 21.5776 15.75 21.2097 16.42L20.4943 17.62C20.1162 18.26 19.411 18.66 18.6855 18.66C18.3278 18.66 17.9292 18.56 17.6022 18.36C17.3365 18.19 17.0299 18.13 16.7029 18.13C15.6911 18.13 14.8429 18.96 14.8122 19.95C14.8122 21.1 13.872 22 12.6968 22H11.3069C10.1215 22 9.18125 21.1 9.18125 19.95C9.16081 18.96 8.31259 18.13 7.30085 18.13C6.96361 18.13 6.65702 18.19 6.40153 18.36C6.0745 18.56 5.66572 18.66 5.31825 18.66C4.58245 18.66 3.87729 18.26 3.49917 17.62L2.79402 16.42C2.4159 15.77 2.39546 14.99 2.77358 14.37C2.93709 14.07 3.24368 13.77 3.59115 13.58C3.87729 13.44 4.06125 13.21 4.23498 12.94C4.74596 12.08 4.43937 10.95 3.57071 10.44C2.55897 9.87 2.23194 8.6 2.81446 7.61L3.49917 6.43C4.09191 5.44 5.35913 5.09 6.38109 5.67C7.27019 6.15 8.425 5.83 8.9462 4.98C9.10972 4.7 9.20169 4.4 9.18125 4.1C9.16081 3.71 9.27323 3.34 9.4674 3.04C9.84553 2.42 10.5302 2.02 11.2763 2H12.7172C13.4735 2 14.1582 2.42 14.5363 3.04C14.7203 3.34 14.8429 3.71 14.8122 4.1C14.7918 4.4 14.8838 4.7 15.0473 4.98C15.5685 5.83 16.7233 6.15 17.6226 5.67C18.6344 5.09 19.9118 5.44 20.4943 6.43L21.179 7.61C21.7718 8.6 21.4447 9.87 20.4228 10.44C19.5541 10.95 19.2475 12.08 19.7687 12.94C19.9322 13.21 20.1162 13.44 20.4023 13.58ZM9.10972 12.01C9.10972 13.58 10.4076 14.83 12.0121 14.83C13.6165 14.83 14.8838 13.58 14.8838 12.01C14.8838 10.44 13.6165 9.18 12.0121 9.18C10.4076 9.18 9.10972 10.44 9.10972 12.01Z" fill="currentColor" />
                                        </svg>
                                    </i>
                                    <span className="item-name">Definições</span>
                                </Link>
                            </li>
                        </ul>
                        {/* Sidebar Menu End */}
                    </div>
                </div>
                <div className="sidebar-footer" />
            </aside>
            <main className="main-content">
                <div className="position-relative iq-banner">
                    {/*Nav Start*/}
                    <nav className="nav navbar navbar-expand-lg navbar-light iq-navbar">
                        <div className="container-fluid navbar-inner">
                            <a href="../dashboard/index.html" className="navbar-brand">
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
                                <h4 className="logo-title">wonderIT</h4>
                            </a>
                            <div className="sidebar-toggle" data-toggle="sidebar" data-active="true">
                                <i className="icon">
                                    <svg width="20px" className="icon-20" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                                    </svg>
                                </i>
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon">
                                    <span className="mt-2 navbar-toggler-bar bar1" />
                                    <span className="navbar-toggler-bar bar2" />
                                    <span className="navbar-toggler-bar bar3" />
                                </span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
                                    <AtualUtilizador />
                                </ul>
                            </div>
                        </div>
                    </nav> {/* Nav Header Component Start */}
                    <div className="iq-navbar-header" style={{ height: '215px' }}>
                        <div className="container-fluid iq-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="flex-wrap d-flex justify-content-between align-items-center">
                                        <div>
                                            <h1>Compras</h1>
                                            <p>Aqui irá completar e pagar a sua nova compra</p>
                                        </div>
                                        <div>
                                            <img src={iconbanner} className="img-fluid" style={{ height: '100px', width: '120px' }} alt="Responsive image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="iq-header-img">
                            <img src={banner} alt="header" className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX" />
                        </div>
                        {/* Nav Header Component End */}
                        {/*Nav End*/}
                    </div>
                    {/* Nav Header Component End */}
                    {/*Nav End*/}
                </div>
                <div className="container-fluid content-inner py-0">
                    <div className="row mt-5">
                        {/*Compras*/}
                        <div className="col-lg-12">
                            <div className="card   rounded">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h4 className="mb-2">Compra #{numAleatorioC}</h4>
                                            <h5 className="mb-3">Olá , {nomeUser()}</h5>
                                            <p>Está prestes a comprar excedente energético de um vendedor. Abaixo poderá
                                                confirmar os dados do serviço que escolheu. Posteriormente terá de fazer o
                                                download do contrato e dar o seu upload para que um admin possa o validar. Por
                                                fim poderá pagar.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 mt-4">
                                            <div className="table-responsive-lg">
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <h6 className="mb-0">Vendedor</h6>
                                                            </td>
                                                            <td className="text-center">{campNome}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <h6 className="mb-0">Preço</h6>
                                                            </td>
                                                            <td className="text-center">{x}€</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <h6 className="mb-0">Potência</h6>
                                                            </td>
                                                            <td className="text-center">{campPotencia} kW/h</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <h6 className="mb-0">Duração</h6>
                                                            </td>
                                                            <td className="text-center">{campDuracao} meses</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <h6 className="mb-0">Telefone</h6>
                                                            </td>
                                                            <td className="text-center">{campTelemovel}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <h6 className="mb-0">E-mail</h6>
                                                            </td>
                                                            <td className="text-center">{campEmail}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p className="mb-0 mt-4">
                                                <svg width={30} className="text-primary mb-3 me-2 icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="-0.757324" y="19.2427" width={28} height={4} rx={2} transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                                                    <rect x="7.72803" y="27.728" width={28} height={4} rx={2} transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                                                    <rect x="10.5366" y="16.3945" width={16} height={4} rx={2} transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                                                    <rect x="10.5562" y="-0.556152" width={28} height={4} rx={2} transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                                                </svg>
                                                contrato_{numAleatorioC}.pdf
                                            </p>
                                            <button type="button" className="btn btn-primary" onClick={handleClick}>Download</button>
                                        </div>
                                    </div>

                                    <div className="row mt-5">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input className="form-control" type="file" id="customFile1" />
                                            </div>
                                            <p>Por favor pague num prazo máximo até 7 dias. Obrigado por comprar connosco.</p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        {btnPagar()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-download">
                    <a className="btn btn-primary px-3 py-3 rounded-circle" target="_blank" onclick="scrollToTop()">
                        <svg className="icon-32" width={32} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5899 11.8585C6.71614 12.0925 6.95618 12.2384 7.21726 12.2384H11.2827V20.2657C11.2827 20.671 11.604 21 12 21C12.3959 21 12.7172 20.671 12.7172 20.2657V12.2384H16.7827C17.0447 12.2384 17.2848 12.0925 17.4101 11.8585C17.5372 11.6245 17.5286 11.3386 17.39 11.1125L12.6073 3.34267C12.4753 3.12924 12.2467 3 12 3C11.7532 3 11.5247 3.12924 11.3927 3.34267L6.60998 11.1125C6.5373 11.2319 6.5 11.368 6.5 11.5041C6.5 11.6255 6.5306 11.7479 6.5899 11.8585Z" fill="currentColor" />
                        </svg>
                    </a>
                </div>
                {/* Footer Section Start */}
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
                {/* Footer Section End */}
            </main>
            {/* Wrapper End*/}
            {/* offcanvas start */}
        </div>
    );
}