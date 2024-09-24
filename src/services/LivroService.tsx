import axios from "axios";

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
        console.log('search ',search)
        let query = field ? `${field}:${search}` : `${search}`;
        const response = 
            await axios(`https://openlibrary.org/search.json?q=${query}&fields=*&language:por$&limit=3&page=${page}`)
                .then((response) => response.data );    
        return response;
      }

}

const livroService = new LivroService();


export default livroService;