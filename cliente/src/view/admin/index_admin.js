import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import AuthService from "../auth.service";
import AtualUtilizador from '../atualUtilizador'
import "../../css/modal_style.css";
import { Modal } from 'react-bootstrap';
import jsPDF from 'jspdf';

import Aleatorio from "../valorAleatorioDiario";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import avatar from "../../images/avatars/01.png";
import banner from "../../images/dashboard/top-header.png";
import iconbanner from "../../images/wonderit/customer-behavior 1.png";
const baseUrl = "http://localhost:3000";
export default function Component1() {
  const [dataEstatisticas, setdataEstatisticas] = useState([]);
  const [dataContratos, setdataContratos] = useState([]);
  const [dataUtilizadores, setdataUtilizadores] = useState([]);
  const [dataOfertas, setdataOfertas] = useState([]);
  const currentUser = AuthService.getCurrentUserId();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    LoadEstatisticas();
    LoadContratos();
    LoadUtilizadores();
    LoadOfertas();
    ValidaContratos();
  }, []);

  function LoadEstatisticas() {
    const url = "http://localhost:3000/dados/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataEstatisticas(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
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

  //atribuição do valor diario a uma variavel para a execução de calculos
  var valor = Aleatorio.obterValorDoDia();
  valor = valor / 100;
  console.log(valor);

  //variáveis para somar e contar para a função EstatisticasAdmin
  var totalGasto = 0;
  var totalComprado = 0;
  var contarUtilizadores = 0;
  //Função que atribui os valores nas 3 barras de Estatísticas
  function EstatisticasAdmin() {
    dataEstatisticas.map((data, index) => {
      totalGasto = data.gastoComprador + totalGasto;
      totalComprado = data.consumoComprador + totalComprado;
      contarUtilizadores++;
    });
    return (
      <div className="col-md-12 col-lg-12">
        <div className="row row-cols-1">
          <div className="col-xl-4 col-lg-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className=" bg-soft-success rounded p-3">
                    <svg className="icon-35" xmlns="http://www.w3.org/2000/svg" width="35px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z">
                      </path>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-success counter">{(totalGasto + (totalGasto * valor)).toFixed(2)}€</h1>
                    <p className="text-success mb-0">Total Ganho no Site</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className=" bg-soft-warning rounded p-3">
                    <svg className="icon-35" xmlns="http://www.w3.org/2000/svg" width="35px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z">
                      </path>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-warning counter">{totalComprado} kW</h1>
                    <p className="text-warning mb-0">Total comprado no Site</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className=" bg-soft-info rounded p-3">
                    <svg className="icon-35" xmlns="http://www.w3.org/2000/svg" width="35px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z">
                      </path>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-info counter">{contarUtilizadores}</h1>
                    <p className="text-info mb-0">Total utilizadores</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //função que fecha o modal
  function handleModalClose() {
    setShowModal(false);
  }

  //geração do pdf quando se carrega no botao
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

    var fileName = 'contrato.pdf';

    // Adiciona o conteúdo ao PDF
    doc.text(content, 10, 10);

    // Salva o arquivo PDF
    doc.save(fileName);
  };

  //variáveis para atribuir nomes ao Vendedor e Comprador
  var nomeV = "";
  var nomeC = "";
  //Função que mostra todas as compras efetuadas no site entre um Comprador e um Vendedor
  function ComprasSite() {
    return dataContratos.map((data, index) => {
      //mapeia os utilizadores a partir do model Dados e compara os Id's dos utilizadores com os Id's que estão nos contratos e atribui os respetivos nomes
      dataEstatisticas.map((dataN, index) => {
        if (dataN.iduser == data.utilizadorIdV) {
          nomeV = dataN.nomeuser;
        }
        else if (dataN.iduser == data.utilizadorIdC) {
          nomeC = dataN.nomeuser;
        }
      });
      return dataOfertas.map((dataO, index) => {
        //verifica se o id da oferta é o mesmo que está no contrato
        if (dataO.idoferta == data.ofertaIdoferta) {
          return (
            <>
              <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Contrato Nº{data.idcontrato}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="card   rounded">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12 mt-4">
                          <div className="table-responsive-lg">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <h6 className="mb-0">Comprador</h6>
                                  </td>
                                  <td className="text-center">{nomeC}</td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6 className="mb-0">Vendedor</h6>
                                  </td>
                                  <td className="text-center">{nomeV}</td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6 className="mb-0">Preço</h6>
                                  </td>
                                  <td className="text-center">{dataO.precomes} €</td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6 className="mb-0">Potência</h6>
                                  </td>
                                  <td className="text-center">{dataO.potenciaproduto} kW</td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6 className="mb-0">Duração</h6>
                                  </td>
                                  <td className="text-center">{data.duracao} meses</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <button type="button" className="btn btn-primary" onClick={handleClick}>Download</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <img className="rounded bg-soft-primary img-fluid avatar-40 me-3" src={avatar} alt="profile" />
                    <h6>{nomeV}</h6>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img className="rounded bg-soft-primary img-fluid avatar-40 me-3" src={avatar} alt="profile" />
                    <h6>{nomeC}</h6>
                  </div>
                </td>
                <td>{data.duracao} meses</td>
                <td>
                  <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}> <i class="fa-solid fa-eye"></i></button>
                </td>
              </tr>
            </>
          );
        }
      });
    });
  }

  //update quando o admin carrega no valor validar, mudando o estado para true
  function sendUpdateTrue(idContrato) {
    // url de backend
    const url = baseUrl + "/contratos/update/" + idContrato
    console.log(url);
    const datapost = {
      estado: true
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

  //update quando o admin carrega no valor validar, mudando o estado para falso
  function sendUpdateFalse(idContrato) {
    // url de backend
    const url = baseUrl + "/contratos/update/" + idContrato
    console.log(url);
    const datapost = {
      estado: false
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

  //função que conta quantos estados tem a null, se forem mais que um ele mostra o titulo
  var conta = 0;
  function Titulo() {
    dataContratos.map((data, index) => {
      if (data.estado == null) {
        conta++;
      }
    }
    );
    console.log(conta)
    if (conta >= 1) {
      return (
        <p className="h2 text-center mb-4">Validações de Contrato</p>
      )
    }
  }

  //função que mostra os contratos por validar, ou seja, aqueles que o estado é null 
  function ValidaContratos() {
    return dataContratos.map((data, index) => {
      if (data.estado == null) {
        return (
          <div className="col-md-12 col-lg-12">
            <div className="row row-cols-1">
              <div className="col-xl-12 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Validação de contrato número: {data.idcontrato}</h5>
                      </div>
                      <div>
                        <button type="button" className="btn btn-primary rounded-pill me-2" onClick={() => {
                          sendUpdateTrue(data.idcontrato);
                          reloadContrato();
                        }}>Validar</button>
                        <button type="button" className="btn btn-danger rounded-pill" onClick={() => sendUpdateFalse(data.idcontrato)}>Recusar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    });
  }

  //reload na pagina depois do clique para mostrar os dados atualizados
  function reloadContrato() {
    window.location.reload()
  }

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
                <Link className="nav-link active" aria-current="page" to={`/dashboard_admin/`}>
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
                <Link className="nav-link" aria-current="page" to={`/perfis_utilizadores/`}>
                  <i className="icon">
                    <svg width={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-20">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.2124 7.76241C14.2124 10.4062 12.0489 12.5248 9.34933 12.5248C6.6507 12.5248 4.48631 10.4062 4.48631 7.76241C4.48631 5.11865 6.6507 3 9.34933 3C12.0489 3 14.2124 5.11865 14.2124 7.76241ZM2 17.9174C2 15.47 5.38553 14.8577 9.34933 14.8577C13.3347 14.8577 16.6987 15.4911 16.6987 17.9404C16.6987 20.3877 13.3131 21 9.34933 21C5.364 21 2 20.3666 2 17.9174ZM16.1734 7.84875C16.1734 9.19506 15.7605 10.4513 15.0364 11.4948C14.9611 11.6021 15.0276 11.7468 15.1587 11.7698C15.3407 11.7995 15.5276 11.8177 15.7184 11.8216C17.6167 11.8704 19.3202 10.6736 19.7908 8.87118C20.4885 6.19676 18.4415 3.79543 15.8339 3.79543C15.5511 3.79543 15.2801 3.82418 15.0159 3.87688C14.9797 3.88454 14.9405 3.90179 14.921 3.93246C14.8955 3.97174 14.9141 4.02253 14.9396 4.05607C15.7233 5.13216 16.1734 6.44206 16.1734 7.84875ZM19.3173 13.7023C20.5932 13.9466 21.4317 14.444 21.7791 15.1694C22.0736 15.7635 22.0736 16.4534 21.7791 17.0475C21.2478 18.1705 19.5335 18.5318 18.8672 18.6247C18.7292 18.6439 18.6186 18.5289 18.6333 18.3928C18.9738 15.2805 16.2664 13.8048 15.5658 13.4656C15.5364 13.4493 15.5296 13.4263 15.5325 13.411C15.5345 13.4014 15.5472 13.3861 15.5697 13.3832C17.0854 13.3545 18.7155 13.5586 19.3173 13.7023Z" fill="currentColor" />
                    </svg>
                  </i>
                  <span className="item-name">Perfis de Utilizadores</span>
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
          </nav >
          <div className="iq-navbar-header" style={{ height: '215px' }}>
            <div className="container-fluid iq-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="flex-wrap d-flex justify-content-between align-items-center">
                    <div>
                      <h1>Admin</h1>
                      <p>Aqui poderá gerir todas as compras e vendas do site</p>
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
          </div>
          {/*Nav End*/}
        </div >
        <div className="container-fluid content-inner mt-n5 py-0">
          <div className="row mt-5">
            {/*Validação de Contratos*/}
            {Titulo()}
            {ValidaContratos()}
            {/*Estatísticas Admin*/}
            {EstatisticasAdmin()}
            {/*Compras do Site*/}
            <div className="col-md-12 col-lg-12">
              <div className="overflow-hidden card">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Compras no Site</h4>
                  </div>
                </div>
                <div className="p-0 card-body">
                  <div className="mt-4 table-responsive">
                    <table id="basic-table" className="table mb-0" role="grid">
                      <thead>
                        <tr>
                          <th>Vendedor</th>
                          <th>Comprador</th>
                          <th>Duração</th>
                          <th>Contrato</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ComprasSite()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      </main >
      {/* Wrapper End*/}
      {/* offcanvas start */}
    </div >
  );

}