import React, {useContext} from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { LivrariaContext } from '../context/LivrariaContext';
import { Link } from 'react-router-dom';
import { formatDate, formatMoeda } from '../utils/utils';

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
                        <Card.Subtitle className='mb-2'>
                           <strong>Autor: </strong> {livro.autor}
                        </Card.Subtitle >
                        <Card.Subtitle className="mb-2">
                           <strong>Categoria: </strong> {livro.categoria}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2">
                           <strong>Data Publicação: </strong> {formatDate(livro.data_publicacao)}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2">
                            <strong>Preço: </strong> {formatMoeda(livro.preco)}
                        </Card.Subtitle>

                  
                        <div className='d-flex justify-content-between align-self-end'>
                            <Link className='btn btn-success btn-sm'
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