import { Pagination } from "react-bootstrap"

export default function Paginacao(props: any) {
    return (
        <Pagination >
            <Pagination.Prev onClick={() => props.handlePageChange(props.previous)} disabled={!props.previous} />
            <Pagination.Item active>{props.currentPage}</Pagination.Item>
            <Pagination.Next onClick={() => props.handlePageChange(props.next)} disabled={!props.next} />
        </Pagination>
    )
}