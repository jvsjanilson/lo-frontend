import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LivrariaProvider } from "../context/LivrariaContext";
import Home from "../pages/home";
import Detalhe from "../pages/livro/detalhe";
import Login from "../pages/login";
import Register from "../pages/register"
import Historico from "../pages/historico";

export default function Rotas() {
    return (
        <Router>
            <LivrariaProvider>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/livro/detalhe" element={<Detalhe/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/historico" element={<Historico/>} />
                </Routes>
            </LivrariaProvider>
        </Router>
    );
}
