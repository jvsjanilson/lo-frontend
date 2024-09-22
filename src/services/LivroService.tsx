import api from "../utils/api";

class LivroService {
    async getLivros() {
        return await api.get('livros/').then(res => res.data); ;
    }

    async getLivro(id: number) {
        return await api.get(`livros/${id}/`).then(res => res.data);
    }

   
}

const livroService = new LivroService();


export default livroService;