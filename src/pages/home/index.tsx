import { useState, useEffect, useContext } from 'react';
import livroService from '../../services/LivroService';
import { LivroInterface } from '../../interfaces/LivroInterface';
import Layout from '../../components/Layout';
import Livro from '../../components/Livro';
import { ItemInterface } from '../../interfaces/ItemInterface';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { LivrariaContext } from '../../context/LivrariaContext';
import Item from '../../components/Item';
import Paginacao from '../../components/Paginacao';
import { formatMoeda } from '../../utils/utils';
import { InputGroup } from 'react-bootstrap';

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
        
    }, []);

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
                        
                       <InputGroup>
                            <select name="" id="" className='form-select' style={{maxWidth: '11rem'}}>
                                <option value="q">Tudo</option>
                                <option selected value="title">Nome do livro</option>
                                <option value="author_name">Nome do autor</option>
                                <option value="subject">Categoria</option>
                            </select>
                            <input type="search" className="form-control" placeholder="Pesquisar" 
                                value={search} onChange={(e) => setSearch(e.target.value)}
                                />
                            <Button variant='primary' onClick={() => fetchData()} >Pesquisar</Button>
                        </InputGroup>
                        
                    </Col>
                    
                </Row>
                <Row className='g-2'>
                    <Col md>
                        {livros.map(livro => (
                            <Livro key={livro.id} livro={livro}  />
                        ))}
                    <Paginacao next={next} previous={previous} currentPage={currentPage}  handlePageChange={handlePageChange} />
                    </Col>
                    {livrariaContext?.showCarrinho && (
                        <Col md={4}>
                            <Card className='mb-2 shadow-sm'  >
                            <Card.Header>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div> 
                                        <strong>
                                            Carrinho ({livrariaContext?.carrinho.length}) -  Total: R$  { formatMoeda(livrariaContext?.carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0))}
                                        </strong>
                                    </div>
                                    <div>
                                    {(livrariaContext.carrinho.length > 0 && livrariaContext?.isLogin) &&    (
                                        <Button variant="success" onClick={() => {}} size='sm' className=''>Finalizar Compra </Button>
                                    )}
                                    </div>
                                </div>
                            </Card.Header>
                                <Card.Body className='p-1' style={{ maxHeight: '34.38rem', overflowY: 'auto' }}>
                                    
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