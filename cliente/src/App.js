import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './App.css';

//importações de css
import './css/core/libs.min.css';
import './css/vendor/aos/dist/aos.css';
import './css/hope-ui.min.css?v=2.0.0';
import './css/custom.min.css?v=2.0.0';
import './css/dark.min.css';
import './css/customizer.min.css';
import './css/rtl.min.css';

//importação de fontawesome
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fontsource/poppins';

//Rotas
import LandingPage from './view/landingpage'

import Iniciarsessao from './view/auth/sign-in'
import Registar from './view/auth/sign-up'
import RegistarComprador from './view/auth/sign-up_comprador';
import RegistarVendedor from './view/auth/sign-up_vendedor'
import RegistarEscolha from './view/auth/sign-up_choice';

import DashboardAdmin from './view/admin/index_admin';
import PerfilUtilizadores from './view/admin/perfis_utilizador';

import DashboardComprador from './view/comprador/index_comprador';
import CompraIndividual from './view/comprador/compra_individual';
import Compras from './view/comprador/compras';

import DashboardVendedor from './view/vendedor/index_vendedor';
import AnunciarVenda from './view/vendedor/anunciar-venda';
import Addinfraestrutura from './view/vendedor/add_infraestrutura';

import Definicoes from './view/definicoes';
import DadosConta from './view/dados_conta';

import AuthService from "./view/auth.service";

function App() {
  const currentUser = AuthService.getCurrentUserId();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/iniciarsessao/" element={<Iniciarsessao />} />
        <Route path="/registar" element={<Registar />} />
        <Route path="/registarcomprador" element={<RegistarComprador />} />
        <Route path="/registarvendedor" element={<RegistarVendedor />} />
        <Route path="/registarescolha" element={<RegistarEscolha />} />
        <Route path="/dashboard_admin" element={<DashboardAdmin />} />
        <Route path="/perfis_utilizadores" element={<PerfilUtilizadores />} />
        <Route path={`/dashboard_comprador/${currentUser}`} element={<DashboardComprador />} />
        <Route path="/compra/:compraId" element={<CompraIndividual />} />
        <Route path={`/compras/${currentUser}`} element={<Compras />} />
        <Route path={`/dashboard_vendedor/${currentUser}`} element={<DashboardVendedor />} />
        <Route path={`/vender/${currentUser}`} element={<AnunciarVenda />} />
        <Route path={`/infraestrutura/${currentUser}`} element={<Addinfraestrutura />} />
        <Route path={`/definicoes/${currentUser}`} element={<Definicoes />} />
        <Route path={`/dadosconta/${currentUser}`} element={<DadosConta />} />
      </Routes>
    </Router>
  );
}

export default App;