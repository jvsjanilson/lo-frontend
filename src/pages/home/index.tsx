import { useState, useEffect, useContext } from 'react';
import livroService from '../../services/LivroService';
import Layout from '../../components/Layout';
import Livro from '../../components/Livro';
import { ItemInterface } from '../../interfaces/ItemInterface';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { LivrariaContext } from '../../context/LivrariaContext';
import Item from '../../components/Item';
import { InputGroup } from 'react-bootstrap';


export default function Home() {
    const [livros, setLivros] = useState([]);
    const [search, setSearch] = useState('');
    const [tipoBusta, setTipoBusca] = useState('title');
    const livrariaContext = useContext(LivrariaContext);
    const [showSpinner, setShowSpinner] = useState(true);
    
    async function fetchData(page: string | null = null) {
        setShowSpinner(true);
        if (search?.length > 0) {
         
            await livroService.getLivros(search, tipoBusta).then(response => {
                setLivros(response.docs);
                setShowSpinner(false);
            }).catch((error) => {
                setShowSpinner(false);
            });
        } else  {
            setLivros([]);
            setShowSpinner(false);
        }
    }
     
    const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchData();
        }
    }
  
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Layout>
            <Container fluid>
                {/* formulario de busca do livro */}
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
                    <Col  style={{ float: 'right' }} >
                        <Spinner style={{ float: 'right' }} variant="success" hidden={!showSpinner} 
                            animation="border" role="status"/>
                    </Col>
                </Row>
                <Row className='g-2'>
                    <Col md>
                        {/* Listagem de livros da pesquisa */}
                        {livros.map((livro, i) => (
                            <Livro key={i} livro={livro}  />
                        ))}
                    </Col>
                    {/* carrinho de compras */}
                    {livrariaContext?.showCarrinho && (
                        <Col md={4}>
                            {livrariaContext?.showError && (<span>{livrariaContext?.showMessageError} ola</span>)}
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