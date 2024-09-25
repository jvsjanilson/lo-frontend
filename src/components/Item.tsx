import { Button, Card, Col, Row } from "react-bootstrap";
import { useContext } from "react";
import { LivrariaContext } from "../context/LivrariaContext";
import { useEffect } from "react";


export default function Item({livro}: any) {
    const livrariaContext  = useContext(LivrariaContext);

    return (
        <Card className='mb-2 shadow-sm'  >
            <Row className='g-0'>
                <Col md>
                <img 
                    src={`https://covers.openlibrary.org/b/id/${livro.cover_i}.jpg`}
                    className="img-fluid h-100 w-100 rounded-3 " alt="..." style={{ padding: '5px'}}/>
                
                </Col>
                <Col md={10} className='border-start'>
                    <Card.Body className='ps-2 '
                    >
                        <Card.Subtitle className="mb-3">{livro.title}</Card.Subtitle>
                        <Card.Subtitle className="mb-3">Autor: {livro.author_name}</Card.Subtitle>
                        <Card.Subtitle className="mb-3">Qtd.: {livro.quantity}</Card.Subtitle>
                        {!livro.id && <Button variant="danger" onClick={() => livrariaContext?.hanbleRemoverLivroCarrinho(livro.isbn)} size='sm' className=''>Remover</Button>}
                        
                        
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}