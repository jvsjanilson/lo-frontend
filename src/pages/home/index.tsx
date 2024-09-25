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
import { InputGroup } from 'react-bootstrap';


export default function Home() {
    const [livros, setLivros] = useState([]);
    const [next, setNext] = useState<string | null>(null)
    const [previous, setPrevious] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState('');
    const [tipoBusta, setTipoBusca] = useState('title');
    const livrariaContext = useContext(LivrariaContext);
    
    
    async function fetchData(page: string | null = null) {
        if (search?.length > 0) {
            livroService.getLivros(search, tipoBusta).then(response => {
                setLivros(response.docs);
            });
        } else  {
            setLivros([]);
        }
    }
     
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

    const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchData();
        }
    }

    const handlePageChange = (page: string | null = null) => {
        fetchData(page)
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <Layout>
            <Container fluid>
                <Row className='my-4' >
                    <Col md={8}>
                        
                       <InputGroup>
                            <select name="" id="" className='form-select' style={{maxWidth: '11rem'}} 
                                onChange={(e) => setTipoBusca(e.target.value)}
                                value={tipoBusta}
                            >
                                <option value="q">Tudo</option>
                                <option selected value="title">Nome do livro</option>
                                <option value="author_name">Nome do autor</option>
                                <option value="subject">Categoria</option>
                            </select>
                            <input type="search" className="form-control" placeholder="Pesquisar" 
                                value={search} onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => handleInputEnter(e)}
                                />
                            <Button variant='primary' onClick={() => fetchData()} >Pesquisar</Button>
                        </InputGroup>
                        
                    </Col>
                    
                </Row>
                <Row className='g-2'>
                    <Col md>
                        {livros.map((livro, i) => (
                            <Livro key={i} livro={livro}  />
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
                                            Carrinho ({livrariaContext?.carrinho.length})
                                        </strong>
                                    </div>
                                    <div>
                                    {(livrariaContext.carrinho.length > 0 && livrariaContext?.isLogin) &&    (
                                        <Button variant="success" onClick={() => livrariaContext.handleFinalizarCompra()} size='sm' className=''>Finalizar Compra </Button>
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