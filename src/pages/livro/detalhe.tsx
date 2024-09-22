import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Detalhe() {
    const location = useLocation();
    const {livro} = location.state || {};

    return (
        <Container className="mt-4">
            
            <Card>
                {/* <Card.Header></Card.Header> */}
                <Card.Body>
                    <Card.Title className="border-bottom pb-2">{livro.titulo}</Card.Title>


                    <Row className='g-3'>
                        <Col md>
                            <Card.Img variant="top" src={livro.capa_livro} />
                        </Col>
                        <Col md={10} className='border-start'>
                            <Card.Text>
                                <strong>Número páginas: </strong>{livro.numero_paginas}
                            </Card.Text>
                            <Card.Text>
                                <strong>Autor: </strong>{livro.autor}
                            </Card.Text>
                            <Card.Text>
                                <strong>Categoria: </strong>{livro.categoria}
                            </Card.Text>
                            <Card.Text>
                                <strong>Data Publicação: </strong>{livro.data_publicacao}
                            </Card.Text>


                            <Card.Text>
                                <strong>Sinopse: </strong>
                                <br />
                                    {livro.sinopse}
                            </Card.Text>
                            <Link to="/" className="btn  btn-secondary">Voltar</Link>
                        </Col>
                    </Row>
                    
                 
                    
                </Card.Body>
            </Card>
            
        </Container>
    );
}