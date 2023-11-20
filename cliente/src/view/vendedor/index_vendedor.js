import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import AuthService from "../auth.service";
import Aleatorio from "../valorAleatorioDiario";
import AtualUtilizador from '../atualUtilizador'
import Swiper from 'swiper';
import jsPDF from 'jspdf';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import avatar from "../../images/avatars/01.png";
import banner from "../../images/dashboard/top-header.png";
import iconbanner from "../../images/wonderit/customer-behavior 1.png";
const baseUrl = "http://localhost:3000";

export default function Component1() {
  //variáveis usadas para ir buscar os dados à base de dados ou atribuir novos dados
  const currentUser = AuthService.getCurrentUserId();
  const [dataOfertas, setdataOfertas] = useState([]);
  const [dataInfraestruturas, setdataInfraestruturas] = useState([]);
  const [dataUtilizadores, setdataUtilizadores] = useState([]);
  const [dataEstatisticas, setdataEstatisticas] = useState([]);
  const [dataContratos, setdataContratos] = useState([]);
  const [campnome, setcampnome] = useState("");
  const [campcapacidadegeracao, setcampcapacidadegeracao] = useState("");
  const [camptipoproducao, setcamptipoproducao] = useState("");
  const [campareadeproducao, setcampareadeproducao] = useState("");
  const [campmorada, setcampmorada] = useState("");
  //variável usada para mostrar ou remover o Modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    LoadInfraestruturas();
    LoadOfertas();
    LoadUtilizadores();
    LoadEstatisticas();
    LoadContratos();
  }, []);

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

  //função que atribui novos valores a uma infraestrutura já existente
  function sendUpdate(id) {
    console.log(id)
    // url de backend
    const url = baseUrl + "/infraestruturas/update/" + id
    console.log(url);
    const datapost = {
      nome: campnome,
      capacidadegeracao: campcapacidadegeracao,
      tipoproducao: camptipoproducao,
      areadeproducao: campareadeproducao,
      morada: campmorada,
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

  function LoadInfraestruturas() {
    const url = "http://localhost:3000/infraestruturas/";
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setdataInfraestruturas(data);
        } else {
          alert("Error Web Service!");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  //função que gera um número aleatório com 6 digitos para atribuir um numero a um contrato quando se for fazer download, por exemplo, contrato_111111.pdf
  function numAleatorio() {
    var min = 100000;
    var max = 999999;
    var numero = Math.floor(Math.random() * (max - min + 1)) + min;
    return numero;
  }
  var numAleatorioC = numAleatorio();

  //variável que faz com que seja criado um ficheiro pdf com algum conteúdo relacionado com os contratos de excedente energético
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

    var fileName = 'contrato_' + numAleatorioC + '.pdf';

    // Adiciona o conteúdo ao PDF
    doc.text(content, 10, 10);

    // Salva o arquivo PDF
    doc.save(fileName);
  };

  //variáveis que usam a função do valorAleatorioDiario.js para ditar o preço das vendas
  var valor = Aleatorio.obterValorDoDia();
  valor = valor / 100;
  console.log(valor);

  //função que é usada para fechar o Modal
  function handleModalClose() {
    setShowModal(false);
  }

  //função que é usada para atribuir um slider aos cards criados no return final da view a partir de classNames, aparecem 3 cards e meio para dar a ideia de movimento
  useEffect(() => {
    const swiper = new Swiper('.d-slider1', {
      slidesPerView: 3.5,
      spaceBetween: 40,
    });
    return () => {
      swiper.destroy();
    };
  }, []);
  //função que mostra os vários cards das vendas com a informação das mesmas e contém um botão para eliminar a venda pretendida
  function Vendas() {
    return dataOfertas.map((data, index) => {
      if (data.utilizadoreIduser == currentUser) {
        return dataUtilizadores.map((data1, index) => {
          if (data1.iduser == currentUser) {
            return (
              <li className="swiper-slide card card-slide col-3 mx-2">
                <div className="card mb-0 rounded-3">
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title">
                      {((data.precomes + (data.precomes * valor)).toFixed(2))}€
                    </h1>
                    <ul className="list-unstyled my-3 p-0">
                      <li>
                        <p>Cap. de Produção: {data.potenciaproduto} kW</p>
                      </li>
                      <li>
                        <p>Produção Vendida: {(data.potenciaproduto * 0.8).toFixed(2)} kW</p>
                      </li>
                      <li>
                        <p>Duração: {data.duracaovenda} meses</p>
                      </li>
                      <li>
                        <p>{data1.telemovel}</p>
                      </li>
                      <li>
                        <p>E-mail: {data1.email}</p>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-end">
                      <Link
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => OnDeleteVenda(data.idoferta)}
                      >
                        <span className="btn-inner">
                          <i class="fa-solid fa-trash"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            )
          }
        });
      }
    });
  }

  //função que vai buscar as informações de uma específica infraestrutura selecionada
  function detailInfra(id) {
    const url = baseUrl + "/infraestruturas/detail/" + id;
    console.log(url);
    axios.get(url)
      .then(res => {
        if (res.data.success) {
          const data = res.data.data[0];
          setcampnome(data.nome);
          setcampcapacidadegeracao(data.capacidadegeracao);
          setcampareadeproducao(data.areadeproducao);
          setcamptipoproducao(data.tipoproducao);
          setcampmorada(data.morada);
        } else {
          alert("Error web service");
        }
      })
      .catch(error => {
        alert("Error server: " + error);
      });
  }

  //função que mostra mais informações sobre os contrato e um botão que chama a variável para fazer download de um PDF
  function Contratos() {
    return dataUtilizadores.map((dataU, index) => {
      if (dataU.iduser == currentUser) {
        return dataContratos.map((data, index) => {
          if (data.utilizadorIdV == currentUser && data.infraestrutura.utilizadoreIduser == data.utilizadorIdV) {
            return dataUtilizadores.map((dataC, index) => {
              if (dataC.iduser == data.utilizadorIdC) {
                return (
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <img className="rounded bg-soft-primary img-fluid avatar-40 me-3" src={avatar} alt="profile" />
                        <h6>{dataC.nomeuser}</h6>
                      </div>
                    </td>
                    <td>{data.infraestrutura.nome}</td>
                    <td>{data.duracao} meses</td>
                    <td>{data.datacontrato}</td>
                    <td>
                      <button type="button" className="btn btn-primary" onClick={handleClick}><i class="fa-solid fa-download"></i></button>
                    </td>
                  </tr>
                )
              }
            });
          }
        });
      }
    });
  }

  //função que mostra uma tabela com as informações das infraestruturas do utilizador que está logado e que contém um Modal que abre ao clicar no editar que permite editar a infraestrutura diretamente no Modal
  function Infraestruturas() {
    return dataInfraestruturas.map((data, index) => {
      if (data.utilizadoreIduser == currentUser) {
        return (
          <>
            <Modal show={showModal} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Infraestrutura</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>Editar a infraestrutura</h6>
                <div className="col-sm-12 col-lg-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <form className="row g-3 needs-validation" noValidate>
                        <div className="col-md-6">
                          <label htmlFor="validationCustom01" className="form-label">Nome</label>
                          <input type="text" className="form-control" value={campnome} onChange={value =>
                            setcampnome(value.target.value)} />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="validationCustom02" className="form-label">Capacidade de geração</label>
                          <div className="form-group input-group">
                            <input value={campcapacidadegeracao} onChange={value =>
                              setcampcapacidadegeracao(value.target.value)} type="text" className="form-control" id="validationCustom02" />
                            <span className="input-group-text" id="basic-addon1">kW</span>
                          </div>
                          <div className="invalid-feedback">
                            Insira uma Capacidade de geração.
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="validationCustom01" className="form-label">Área de produção</label>
                          <div className="form-group input-group">
                            <input value={campareadeproducao} onChange={value =>
                              setcampareadeproducao(value.target.value)} type="text" className="form-control" id="validationCustom01" />
                            <span className="input-group-text" id="basic-addon1">m2</span>
                          </div>
                          <div className="invalid-feedback">
                            Insira a Área de produção.
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="validationCustom02" className="form-label">Tipo de produção</label>
                          <input value={camptipoproducao} onChange={value =>
                            setcamptipoproducao(value.target.value)} type="text" className="form-control" id="validationCustom02" />
                          <div className="invalid-feedback">
                            Insira o Tipo de produção.
                          </div>
                        </div>

                        <div className="col-md-12">
                          <label htmlFor="validationCustom02" className="form-label">Morada da Infraestrutura</label>
                          <input value={campmorada} onChange={value =>
                            setcampmorada(value.target.value)} type="text" className="form-control" id="validationCustom02" />
                          <div className="invalid-feedback">
                            Insira a Morada da Infraestrutura.
                          </div>
                        </div>

                      </form>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Link ><button className="btn btn-secondary" onClick={() => {
                  sendUpdate(data.idinfraestrutura);
                  reload();
                }}>Sim</button></Link>
                <button className="btn btn-secondary" onClick={handleModalClose}>Não</button>
                {/* You can add additional buttons or actions here */}
              </Modal.Footer>
            </Modal>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <h6>{data.nome}</h6>
                </div>
              </td>
              <td>{data.capacidadegeracao} kW</td>
              <td>{data.tipoproducao}</td>
              <td>{data.areadeproducao} m2</td>
              <td>{data.morada}</td>
              <td>
                <Link
                  type="button" className="btn btn-outline-info btn-sm" onClick={() => [setShowModal(true), detailInfra(data.idinfraestrutura)]}>
                  <span className="btn-inner">
                    <svg className="icon-20" xmlns="http://www.w3.org/2000/svg" width={20} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </span>
                </Link>
              </td>
              <td>
                <Link
                  type="button" className="btn btn-outline-danger btn-sm" onClick={() => OnDeleteInfra(data.idinfraestrutura)}>
                  <span className="btn-inner">
                    <i class="fa-solid fa-trash"></i>
                  </span>
                </Link>
              </td>
            </tr>
          </>
        )
      }
    });
  }

  //função que mostra algumas estatísticas sobre vendas do vendedor, como a quantidade de serviços vendidos e o total ganho do mesmo
  function EstatisticasVendedor() {
    return dataEstatisticas.map((data, index) => {
      if (data.iduser == currentUser) {
        return (
          <div className="col-md-12 col-lg-12">
            <div className="row row-cols-1">
              <div className="col-xl-2">

              </div>
              <div className="col-xl-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-itmes-center">
                      <div>
                        <div className="p-3 rounded bg-soft-primary">
                          <svg className="icon-30" xmlns="http://www.w3.org/2000/svg" width="30px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                            </path>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h1>{data.servicosVendidos}</h1>
                        <p className="mb-0">Serviços Vendidos</p>
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                        <h1 className="text-success counter">{(data.totalGanho + (data.totalGanho * valor)).toFixed(2)} €</h1>
                        <p className="text-success mb-0">Total Ganho</p>
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

  //Funções que eliminam a infraestrutura selecionada
  function OnDeleteInfra(id) {
    Swal.fire({
      title: 'Tem a certeza que quer eliminar esta infraestrutura??',
      text: 'Irá ficar sem a mesma registada na sua conta!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, quero eliminar',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        SendDeleteInfra(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'A infraestrutura não foi apagada.',
          'error'
        );
      }
    });
  }
  function SendDeleteInfra(idinfra) {
    const baseUrl = "http://localhost:3000/infraestruturas/delete";
    axios.delete(baseUrl, {
      data: { idinfraestrutura: idinfra }
    })
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            'Infraestrutura apagada!',
            'A infraestrutura foi apagada com sucesso.',
            'success'
          );
          LoadInfraestruturas();
        }
      })
      .catch(error => {
        alert("Error 325");
      });
  }

  //Funções que eliminam a venda selecionada
  function OnDeleteVenda(id) {
    Swal.fire({
      title: 'Tem a certeza que quer eliminar esta venda??',
      text: 'Irá ficar sem a mesma registada no site!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, quero eliminar',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        SendDeleteVenda(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'A venda não foi apagada.',
          'error'
        );
      }
    });
  }
  function SendDeleteVenda(idoferta) {
    const baseUrl = "http://localhost:3000/ofertas/delete";
    console.log(idoferta)
    axios.delete(baseUrl, {
      data: { idoferta: idoferta }
    })
      .then(response => {
        if (response.data.success) {
          Swal.fire(
            'Venda apagada!',
            'A venda foi apagada com sucesso.',
            'success'
          );
          LoadOfertas();
        }
      })
      .catch(error => {
        alert("Error 325");
      });
  }

  var valor = Aleatorio.obterValorDoDia();
  valor = valor / 100;
  console.log(valor);

  //função que faz reload da página ao ser usado no update da infraestrutura
  function reload() {
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
                <Link className="nav-link active" aria-current="page" to={`/dashboard_vendedor/${currentUser}`}>
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
                <Link className="nav-link" aria-current="page" to={`/infraestrutura/${currentUser}`}>
                  <i className="icon">
                    <svg width={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-20">
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.33 2H16.66C20.06 2 22 3.92 22 7.33V16.67C22 20.06 20.07 22 16.67 22H7.33C3.92 22 2 20.06 2 16.67V7.33C2 3.92 3.92 2 7.33 2ZM12.82 12.83H15.66C16.12 12.82 16.49 12.45 16.49 11.99C16.49 11.53 16.12 11.16 15.66 11.16H12.82V8.34C12.82 7.88 12.45 7.51 11.99 7.51C11.53 7.51 11.16 7.88 11.16 8.34V11.16H8.33C8.11 11.16 7.9 11.25 7.74 11.4C7.59 11.56 7.5 11.769 7.5 11.99C7.5 12.45 7.87 12.82 8.33 12.83H11.16V15.66C11.16 16.12 11.53 16.49 11.99 16.49C12.45 16.49 12.82 16.12 12.82 15.66V12.83Z" fill="currentColor" />
                    </svg>
                  </i>
                  <span className="item-name">Add Infraestrutura</span>
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
                <h4 className="logo-title">Hope UI</h4>
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
                      <h1>VENDEDOR</h1>
                      <p>Aqui poderá efetuar as vendas do seu excedente energético e ver as estatísticas!
                      </p>
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
        <div className="container-fluid content-inner mt-n5 py-0">
          <div className="row">
            {/*Estatísticas*/}
            {EstatisticasVendedor()}
            {/*As suas Vendas*/}
            <p className="h2 text-center mb-4">As suas vendas</p>
            <div className="col-md-12 col-lg-12">
              <div className="row row-cols-1 text-center">
                <div className="overflow-hidden d-slider1 ">
                  <ul className="p-0 m-0 mb-2 swiper-wrapper list-inline">
                    <li className="swiper-slide card card-slide col-3 mx-2" style={{ backgroundColor: '#A3ADF4' }}>
                      <Link to={`/vender/${currentUser}`}>
                        <div className="card-body d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                          <h2 className="mt-5" style={{ color: '#4498FA', fontSize: '10em', fontWeight: 100 }}>+</h2>
                        </div>
                      </Link>
                    </li>
                    {Vendas()}
                  </ul>
                </div>
              </div>
            </div>
            {/*Estatísticas2*/}
            <div className="row">
              {/*<div className="col-md-12 col-xl-6">
                <div className="card">
                  <div className="card-header d-flex justify-content-between flex-wrap">
                    <div className="header-title">
                      <h4 className="card-title">Produção em kW</h4>
                    </div>
                    <div className="dropdown">
                      <a href="#" className="text-gray dropdown-toggle" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
                        Esta Semana
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton3">
                        <li><a className="dropdown-item" href="#">Esta Semana</a></li>
                        <li><a className="dropdown-item" href="#">Este Mês</a></li>
                        <li><a className="dropdown-item" href="#">Este Ano</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="d-activity" className="d-activity" />
                  </div>
                </div> 
              </div>*/}
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Infraestruturas</h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="mt-4 table-responsive">
                      <table id="basic-table" className="table mb-0" role="grid">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Cap. de Geração</th>
                            <th>Tipo de Produção</th>
                            <th>Área</th>
                            <th>Morada</th>
                            <th>Editar</th>
                            <th>Apagar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Infraestruturas()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Contratos em Vigor*/}
            {/*Contratos em vigor*/}
            <div className="col-md-12 col-lg-12">
              <div className="overflow-hidden card">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Os seus Contratos</h4>
                  </div>
                </div>
                <div className="p-0 card-body">
                  <div className="mt-4 table-responsive">
                    <table id="basic-table" className="table mb-0" role="grid">
                      <thead>
                        <tr>
                          <th>Comprador</th>
                          <th>Infraestrutura</th>
                          <th>Duração</th>
                          <th>Data do Contrato</th>
                          <th>Contrato</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Contratos()}
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
      </main>
      {/* Wrapper End*/}
      {/* offcanvas start */}
    </div>
  );
}