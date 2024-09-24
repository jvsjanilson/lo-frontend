import React from "react";
import { Link } from "react-router-dom";
import { LivrariaContext } from "../context/LivrariaContext";
import { Button } from "react-bootstrap";

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const livrariaContext = React.useContext(LivrariaContext);

    return (
        <>
            <header className="mt-2 d-flex justify-content-between align-items-center mx-3 border rounded p-2">
                <div>
                    Livraria Online
                </div>
                <div>
                    {livrariaContext?.isLogin ? (
                        <>
                            <Button variant="primary me-2" onClick={() => alert('Historico')} size='sm' className=''>HISTORICO COMPRAS</Button>
                            <Button variant="danger" onClick={() => livrariaContext?.logout()} size='sm' className=''>SAIR</Button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-sm btn-primary">ENTRAR</Link>
                    )}

                </div>
            </header>
            {children}
            <footer></footer>
        </>
    );
}

export default Layout;