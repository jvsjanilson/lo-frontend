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
                    <Card.Title className="border-bottom pb-2">{livro.title}</Card.Title>


                    <Row className='g-3'>
                        <Col md>
                            <Card.Img variant="top"  src={ livro.cover_i !== undefined ? `https://covers.openlibrary.org/b/id/${livro.cover_i}.jpg` : ''} />
                        </Col>
                        <Col md={10} className='border-start'>
                            <Card.Text>
                                <strong>Número páginas: </strong>{livro.number_of_pages_median}
                            </Card.Text>
                            <Card.Text>
                                <strong>Autor: </strong>{livro.author_name}
                            </Card.Text>
                            <Card.Text>
                                <strong>Categoria: </strong>{typeof(livro.subject) === 'object' ? livro.subject.join(', ').split(',')[0] : livro.subject}
                            </Card.Text>
                            <Card.Text>
                                <strong>Data Publicação: </strong>{typeof(livro.publish_date) === 'object' ? livro.publish_date.join(', ').split(',')[0] : livro.publish_date}
                            </Card.Text>


                            <Card.Text>
                                <strong>Sinopse: </strong>
                                <br />
                                    {livro.first_sentence}
                            </Card.Text>
                            <Link to="/" className="btn  btn-secondary">Voltar</Link>
                        </Col>
                    </Row>
                    
                 
                    
                </Card.Body>
            </Card>
            
        </Container>
    );
}