import { useState, useEffect, useContext } from 'react';
import livroService from '../../services/LivroService';
import { LivroInterface } from '../../interfaces/LivroInterface';
import Layout from '../../components/Layout';
import Livro from '../../components/Livro';
import { ItemInterface } from '../../interfaces/ItemInterface';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { LivrariaContext } from '../../context/LivrariaContext';
import Item from '../../components/Item';
import Paginacao from '../../components/Paginacao';


export default function Home() {
    const [livros, setLivros] = useState<LivroInterface[]>([]);
    const [next, setNext] = useState<string | null>(null)
    const [previous, setPrevious] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState('');

    const livrariaContext = useContext(LivrariaContext);
    
    async function fetchData(page: string | null = null) {
        livroService.getLivros(search, page).then(response => {
            changePage(response, page);
            setLivros(response.results);
        });
    }
    useEffect(() => {

        fetchData();
        
    }, [search]);

    const changePage = (response: any, page: string | null = null) => {
        setNext(response?.next?.split('?')[1]);
        setPrevious(response?.previous?.split('?')[1]);
        if (!response?.previous?.split('?')[1]) {
            if (response?.previous) {
                setPrevious('page=1');
            }
        }
        setCurrentPage(page?.includes('page=') ? parseInt(page.split('page=')[1]) : 1);
    }

    const handlePageChange = (page: string | null = null) => {
        fetchData(page)
    }


    return (
        <Layout>
            <Container fluid>
                <Row className='my-4' >
                    <Col md={8}>
                        <input type="search" className="form-control" placeholder="Pesquisar" 
                            value={search} onChange={(e) => setSearch(e.target.value)}
                        />
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
                <Paginacao next={next} previous={previous} currentPage={currentPage}  handlePageChange={handlePageChange} />
            </Container>
        </Layout>
    );
}