import AuthService from "./auth.service";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from "react";

import avatar from "../images/avatars/01.png";

export default function AtualUtilizador() {
    const [dataUtilizadores, setdataUtilizadores] = useState([]);
    const currentUser = AuthService.getCurrentUserId();
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

    //esta função muda na navbar o nome e a role do respetivo utilizador que está logado, analisa o code que está associado com o id do utilizador e dependendo do code mostra se é vendedor, comprador e admin
    function atualUtilizador() {
        return dataUtilizadores.map((data, index) => {
            if (data.iduser == currentUser) {
                console.log(data.iduser)
                if (data.ligacaoUsers[0].tipoutilizadoreCode == "V") {
                    return (<div className="caption ms-3 d-none d-md-block ">
                        <h6 className="mb-0 caption-title">{data.nomeuser}</h6>
                        <p className="mb-0 caption-sub-title">Vendedor</p>
                    </div>);
                }
                else if (data.ligacaoUsers[0].tipoutilizadoreCode == "C") {
                    return (<div className="caption ms-3 d-none d-md-block ">
                        <h6 className="mb-0 caption-title">{data.nomeuser}</h6>
                        <p className="mb-0 caption-sub-title">Comprador</p>
                    </div>);
                }
                else {
                    return (<div className="caption ms-3 d-none d-md-block ">
                        <h6 className="mb-0 caption-title">{data.nomeuser}</h6>
                        <p className="mb-0 caption-sub-title">Admin</p>
                    </div>);
                }
            }

        });
    }

    return (<li className="nav-item dropdown">
        <a className="py-0 nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={avatar} alt="User-Profile" className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
            {atualUtilizador()}
        </a>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to={`/dadosconta/${currentUser}`}><i class="fa-sharp fa-solid fa-user me-2"></i>Perfil</Link>
            </li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <li><Link className="dropdown-item" to={`/iniciarsessao/`}><i class="fa-sharp fa-solid fa-right-from-bracket me-2"></i>Sair</Link></li>
        </ul>
    </li>);
}