import React, {createContext, useState} from "react";
import { ItemInterface } from "../interfaces/ItemInterface";


interface LivrariaContextInterface {
    carrinho: ItemInterface[];
    showCarrinho: boolean;
    hanbleAdicionarLivroCarrinho: (livro: any) => void;
    hanbleRemoverLivroCarrinho: (id: number) => void;
}

export const LivrariaContext = createContext<LivrariaContextInterface | null>(null);

export const LivrariaProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [carrinho, setCarrinho] = useState<ItemInterface[]>([]);
    const [showCarrinho, setShowCarrinho] = useState(true);

    const hanbleRemoverLivroCarrinho = (id: number) => {
        setCarrinho(carrinho.filter(item => item.id !== id));
    }

    const hanbleAdicionarLivroCarrinho = (livro: any) => {
        
        setShowCarrinho(true);

        const item = carrinho.find(item => item.id === livro.id);
        if (item) {
            const newCarrinho = carrinho.map(item => {
                if (item.id === livro.id) {
                    return { ...item, quantidade: item.quantidade + 1, total: item.preco * (item.quantidade + 1) };
                }
                return item;
            });
            return setCarrinho(newCarrinho);
        }
        else {
            setCarrinho([...carrinho, { id: livro.id, titulo: livro.titulo, capa_livro: livro.capa_livro, quantidade: 1, preco: livro.preco, total: livro.preco }]);
        }
    }

    return (
        <LivrariaContext.Provider value={{carrinho, showCarrinho, hanbleAdicionarLivroCarrinho, hanbleRemoverLivroCarrinho}}>
            {children}
        </LivrariaContext.Provider>
    );
}

