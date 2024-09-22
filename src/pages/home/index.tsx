import { useState, useEffect, useContext } from 'react';
import livroService from '../../services/LivroService';
import { LivroInterface } from '../../interfaces/LivroInterface';
import Layout from '../../components/Layout';
import Livro from '../../components/Livro';
import { ItemInterface } from '../../interfaces/ItemInterface';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { LivrariaContext } from '../../context/LivrariaContext';
import Item from '../../components/Item';


export default function Home() {
    const [livros, setLivros] = useState<LivroInterface[]>([]);

    const livrariaContext = useContext(LivrariaContext);

    useEffect(() => {
        async function fetchData() {
            const response = await livroService.getLivros();
            console.log(response.results);
            setLivros(response.results);
        }

        fetchData();
        console.log(livrariaContext)
    }, []);

    return (
        <Layout>
            <Container fluid>
                <Row className='my-4' >
                    <Col md={8}>
                        <input type="search"  className="form-control" placeholder="Pesquisar" />
                    </Col>
                </Row>

                <Row className='g-2'>
                    <Col md>
                        {livros.map(livro => (
                            <Livro key={livro.id} livro={livro}  />
                        ))}
                    
                    </Col>
                    {livrariaContext?.showCarrinho && (
                        <Col md={4}>
                            <Card className='mb-2 shadow-sm'  >
                            <Card.Header>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        Carrinho ({livrariaContext?.carrinho.length})
                                    </div>
                                    <div>
                                    {livrariaContext.carrinho.length > 0 && (
                                        <Button variant="success" size='sm' className=''>Finalizar Compra</Button>
                                    )}
                                    </div>
                                </div>
                            </Card.Header>
                                <Card.Body className='p-1'>
                                    
                                    <Card.Text>
                                        {livrariaContext?.carrinho &&  livrariaContext.carrinho.map((item: ItemInterface) => (
                                            <Item livro={item}/>
                                        ))}

                                    </Card.Text>
                                </Card.Body>
                                
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </Layout>
    );
}