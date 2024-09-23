import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LivrariaProvider } from "../context/LivrariaContext";
import Home from "../pages/home";
import Detalhe from "../pages/livro/detalhe";
import Login from "../pages/login";
import Register from "../pages/register"

export default function Rotas() {
    return (
        <Router>
            <LivrariaProvider>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/livro/detalhe" element={<Detalhe/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
            </LivrariaProvider>
        </Router>
    );
}
