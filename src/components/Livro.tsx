import React, {useContext} from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { LivrariaContext } from '../context/LivrariaContext';
import { Link } from 'react-router-dom';

export default function Livro({livro}: any) {
    const context  = useContext(LivrariaContext);
    return (    
        <Card className='mb-2 shadow-sm'  >
            <Row className='g-0'>
                <Col md>
                <img src={livro.capa_livro}  className="img-fluid h-100 w-100 rounded-3 " alt="..." style={{ maxWidth: 'auto', padding: '5px'}}/>
                
                </Col>
                <Col md={11} className='border-start'>
                    <Card.Body className='ps-2 '
                    >
                        <Card.Title>{livro.titulo}</Card.Title>
                        <Card.Subtitle className='mb-1'>
                           <strong>Autor: </strong> {livro.autor}
                        </Card.Subtitle >
                        <Card.Subtitle className="mb-1">
                           <strong>Categoria: </strong> {livro.categoria}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-1">
                           <strong>Data Publicação: </strong> {livro.data_publicacao}
                        </Card.Subtitle>

                  
                        <div className='d-flex justify-content-between align-self-end'>
                            <Link
                                to="/livro/detalhe"
                                state={{ livro }}>
                            Ver detalhes do livro
                        </Link>
                            <Button variant="primary" onClick={() =>  context?.hanbleAdicionarLivroCarrinho(livro)} size='sm' className='ms-2'>Adicionar</Button>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
            </Card>
       
        
    );
}