import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { CompraInterface } from "../../interfaces/CompraInterface";

import livroService from "../../services/LivroService";

export default function Historico() {
    const [compras, setCompras] = useState<CompraInterface[]>([]);
    useEffect(() => {
        livroService.getCompras().then((response) => {
            console.log(response)
        });
    }, []);



    return (
        <Container  className="mt-4">
            <h1>Historico de compras</h1>
        </Container>
        
    );
}