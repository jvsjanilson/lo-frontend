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
                <img 
                    src={ livro.cover_i !== undefined ? `https://covers.openlibrary.org/b/id/${livro.cover_i}.jpg` : ''}
                    className="img-fluid h-100 w-100 rounded-3 " alt="" style={{ maxWidth: 'auto', padding: '5px'}}/>
                
                </Col>
                <Col md={11} className='border-start'>
                    <Card.Body className='ps-2 '
                    >
                        <Card.Title>{livro.title}</Card.Title>
                        <Card.Subtitle className='mb-2'>
                           <strong>Autor: </strong> {livro.author_name}
                        </Card.Subtitle >
                        <Card.Subtitle className="mb-2">
                           <strong>Categoria: </strong> {typeof(livro.subject) === 'object' ? livro.subject.join(', ').split(',')[0] : livro.subject}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2">
                           <strong>Data Publicação: </strong> {typeof(livro.publish_date) === 'object' ? livro.publish_date.join(', ').split(',')[0] : livro.publish_date}
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