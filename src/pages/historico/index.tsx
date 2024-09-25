import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { CompraInterface } from "../../interfaces/CompraInterface";
import Item from "../../components/Item";
import livroService from "../../services/LivroService";
import { Link } from "react-router-dom";

export default function Historico() {
    const [compras, setCompras] = useState<CompraInterface[]>([]);
    useEffect(() => {
        livroService.getCompras().then((response) => {
            console.log(response)
            setCompras(response.results);
        });
    }, []);

    return (
        <Container  className="mt-4">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/" className="btn btn-sm btn-primary">VOLTAR</Link>
            </div>

            
            {compras.map((compra) =>  {
                return (
                    <div key={compra.id}>
                        <Card className='mb-2 shadow-sm'  >
                            <Card.Header>Compra realizada em: <strong>{compra.created_at}</strong> - Total de items: <strong>{compra.items.map(item => item.quantity).reduce((acc, q) => (acc+q) ) }</strong></Card.Header>
                            <Card.Body>
                                {compra.items.map((item) => {
                                    return (
                                        <Item livro={item} />
                                    )
                                })}
                            </Card.Body>
                        </Card>
                       
                    </div>
                )

            })}
        </Container>
    );
}