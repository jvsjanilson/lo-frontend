import axios from "axios";
import api from "../utils/api";

class LivroService {
    // async getLivros(search: string, page: string | null) {
    //     let query = "";
    //     if (search?.length > 0) {
    //         query = `?search=${search}`;
    //         query += page ? `&${page}` : "";
    //     } else {
    //         query = page ? `?${page}` : "";
    //     }
    //     return await api.get(`/livros/${query}`).then(r => r.data);
     
    // }

    async getLivros(search: string, field: string | null, page: string = '1') {
        
        let query = field ? `${field}:${search}` : `${search}`;
        const response = 
            await axios(`https://openlibrary.org/search.json?q=${query}&fields=*&language:por$&limit=3&page=${page}`)
                .then((response) => response.data );    
        return response;
      }

    async getCompras(page: string  = '') {
        console.log(page)
        if (page !== '') {
            return await api.get(`compras/?${page}`).then(r => r.data);
        } else {
            return await api.get('compras/').then(r => r.data);
        }
    }

    async finalizarCompra(carrinho: any) {
        const data = {"items_create": carrinho}
        console.log(data)
        return await api.post('compras/', data).then(r => r.data);
    }


}

const livroService = new LivroService();


export default livroService;