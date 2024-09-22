import api from "../utils/api";

class LivroService {
    async getLivros(search: string, page: string | null) {
        let query = "";
        if (search?.length > 0) {
            query = `?search=${search}`;
            query += page ? `&${page}` : "";
        } else {
            query = page ? `?${page}` : "";
        }
        return await api.get(`/livros/${query}`).then(r => r.data);
     
    }

}

const livroService = new LivroService();


export default livroService;