import { Button, Card, Col, Row } from "react-bootstrap";
import { useContext } from "react";
import { LivrariaContext } from "../context/LivrariaContext";
import { formatMoeda } from "../utils/utils";

export default function Item({livro}: any) {
    const livrariaContext  = useContext(LivrariaContext);
    return (
        <Card className='mb-2 shadow-sm'  >
        <Row className='g-0'>
            <Col md>
            <img src={livro.capa_livro}  className="img-fluid h-100 w-100 rounded-3 " alt="..." style={{ padding: '5px'}}/>
            
            </Col>
            <Col md={10} className='border-start'>
                <Card.Body className='ps-2 '
                >
                    <Card.Title>{livro.titulo}</Card.Title>
                    <Card.Subtitle className='mb-2'>
                    <strong>Preco: </strong> {livro.preco}
                    </Card.Subtitle >
                    <Card.Subtitle className="mb-2">
                    <strong>Quantidade: </strong> {livro.quantidade}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2">
                    <strong>Total: </strong> {formatMoeda(livro.total)}
                    </Card.Subtitle>
                    <Button variant="danger" onClick={() => livrariaContext?.hanbleRemoverLivroCarrinho(livro.id)} size='sm' className=''>Remover</Button>
                    
                </Card.Body>
            </Col>
        </Row>
    
    </Card>
    );
}