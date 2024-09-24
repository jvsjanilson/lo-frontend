import React, {createContext, useState} from "react";
import { ItemInterface } from "../interfaces/ItemInterface";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";


interface LivrariaContextInterface {
    carrinho: ItemInterface[];
    showCarrinho: boolean;
    user: string
    handleFinalizarCompra: () => void;
    hanbleAdicionarLivroCarrinho: (livro: any) => void;
    hanbleRemoverLivroCarrinho: (coverId: string) => void;
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
    const [showCarrinho, setShowCarrinho] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    //auth
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
                setUser(username);
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

    // compras
    const hanbleAdicionarLivroCarrinho = (livro: any) => {
        setShowCarrinho(true);
        let isbn =  typeof(livro.isbn) === 'object' ? livro.isbn.join(', ').split(',')[0] : livro.isbn
        let subject = typeof(livro.subject) === 'object' ? livro.subject.join(', ').split(',')[0] : livro.subject;
        let publish_date = typeof(livro.publish_date) === 'object' ? livro.publish_date.join(', ').split(',')[0] : livro.publish_date;
        
        const item = carrinho.find(item => item.isbn === isbn);
        
        if (!item) {
            setCarrinho([...carrinho, { 
                title: livro.title, 
                cover_i: livro.cover_i, 
                isbn: isbn, 
                author_name: livro.author_name, 
                subject: subject, 
                publish_date: publish_date, 
                first_sentence: livro.first_sentence 
            }]);
        }
    }

    const hanbleRemoverLivroCarrinho = (isbn: string) => {
        setCarrinho(carrinho.filter(item => item.isbn !== isbn));
        if (carrinho.length === 1) {
            setShowCarrinho(false);
        }
    }

    const handleFinalizarCompra = () => {
        setCarrinho([]);
        setShowCarrinho(false);
    }

    return (
        <LivrariaContext.Provider value={
                {
                    carrinho, 
                    showCarrinho, 
                    user,
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

