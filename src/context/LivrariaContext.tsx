import React, {createContext, useState} from "react";
import { ItemInterface } from "../interfaces/ItemInterface";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";


interface LivrariaContextInterface {
    carrinho: ItemInterface[];
    showCarrinho: boolean;
    handleFinalizarCompra: () => void;
    hanbleAdicionarLivroCarrinho: (livro: any) => void;
    hanbleRemoverLivroCarrinho: (id: number) => void;
    login: (username: string, password: string) => void;
    logout: () => void;
    isLogin: boolean;
    errors: {
        username: string[],
        password: string[],
        
    };
    showError: boolean;
    showMessageError: string;
    setShowError: React.Dispatch<React.SetStateAction<boolean>>;
    
}

const initialFieldsError = {
    username: [] as string[],
    password: [] as string[],
    
}

export const LivrariaContext = createContext<LivrariaContextInterface | null>(null);

export const LivrariaProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [showError, setShowError] = useState(false);
    const [showMessageError, setShowMessageError] = useState('');
    const [errors, setErrors] = useState(initialFieldsError);
    const [carrinho, setCarrinho] = useState<ItemInterface[]>([]);
    const [showCarrinho, setShowCarrinho] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const hanbleRemoverLivroCarrinho = (id: number) => {
        setCarrinho(carrinho.filter(item => item.id !== id));
    }

    const logout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
        navigate('/');
    }

    const login = (username: string, password: string) => {
        setErrors(initialFieldsError);
        api.post('token/', {username, password}).then(response => {

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setIsLogin(true);
                navigate('/');
            }
        }).catch(err => {
            if (err.response.status === 400) {
                setErrors(err.response.data)
            }
            else if (err.response.status === 401) {
                setShowError(true);
                setShowMessageError('Usuário ou senha inválidos');
            }
            else {
                setShowMessageError(err.response.data.detail)
                setShowError(true);
            } 
                


            setIsLogin(false);
        });

    }

    const handleFinalizarCompra = () => {
        setCarrinho([]);
        setShowCarrinho(false);
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
        <LivrariaContext.Provider value={
                {
                    carrinho, 
                    showCarrinho, 
                    hanbleAdicionarLivroCarrinho, 
                    hanbleRemoverLivroCarrinho, 
                    handleFinalizarCompra, 
                    login,
                    isLogin,
                    logout,
                    errors,
                    showError,
                    showMessageError,
                    setShowError

                }
            }>
            {children}
        </LivrariaContext.Provider>
    );
}

