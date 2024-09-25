import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { CompraInterface } from "../../interfaces/CompraInterface";
import Item from "../../components/Item";
import livroService from "../../services/LivroService";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/utils";
import Paginacao from "../../components/Paginacao";

export default function Historico() {
    const [next, setNext] = useState<string | null>(null)
    const [previous, setPrevious] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [compras, setCompras] = useState<CompraInterface[]>([]);
    
    const handlePageChange = (page: string = '') => {
        
        setCurrentPage(page?.includes('page=') ? parseInt(page.split('page=')[1]) : 1);
        livroService.getCompras(page).then((response) => {
            setNext(response.next);
            setPrevious(response.previous);
            setCompras(response.results);
        });
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

    useEffect(() => {
        livroService.getCompras().then((response) => {
            setCompras(response.results);
            changePage(response, "page=1");
        });
    }, []);

    return (
        <Container  className="mt-4">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/" className="btn btn-sm btn-primary">VOLTAR</Link>
            </div>
            {compras.length === 0 && <h3 className="d-flex justify-content-center">Nenhuma compra realizada</h3>}
            
            {compras.map((compra) =>  {
                return (
                    <div key={compra.id}>
                        <Card className='mb-2 shadow-sm'  >
                            <Card.Header>Compra realizada em: <strong>{formatDate(compra.created_at)}</strong> - Total de items: <strong>{compra.total_items}</strong></Card.Header>
                            <Card.Body>
                                {compra.items.map((item) => {
                                    return (
                                        <Item id={compra.id} livro={item} />
                                    )
                                })}
                            </Card.Body>
                        </Card>
                       
                    </div>
                )

            })}

            {compras.length > 0 && (
                <Paginacao next={next} previous={previous} currentPage={currentPage}  handlePageChange={handlePageChange} />

            )}
        </Container>
    );
}