import React, {createContext, useState, useEffect} from "react";
import { ItemInterface } from "../interfaces/ItemInterface";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";
import livroService from "../services/LivroService";


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

    useEffect(() => {
        const car = localStorage.getItem('carrinho');
        
        if (car) {
            setCarrinho(JSON.parse(car));
        }
        setShowCarrinho(car ? true : false);
    }, [])


    //auth
    const logout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
        navigate('/');
    }

    const login = (username: string, password: string) => {
        setErrors(initialFieldsError);
        axios.post(BASE_URL +'token/', {username, password}).then(response => {
            if (response.status === 200) {
                localStorage.setItem('token', JSON.stringify(response.data));
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
        let author_name = typeof(livro.author_name) === 'object' ? livro.author_name.join(', ').split(',')[0] : livro.author_name;
        let first_sentence = typeof(livro.first_sentence) === 'object' ? livro.first_sentence.join(', ').split(',')[0] : livro.first_sentence;
        
        const item = carrinho.find(item => item.isbn === isbn);

        if (!item) {
            
                setCarrinho([...carrinho, { 
                    title: livro.title, 
                    cover_i: livro.cover_i, 
                    isbn: isbn, 
                    author_name: author_name, 
                    subject: subject, 
                    publish_date: publish_date, 
                    first_sentence: first_sentence,
                    quantity: 1 
                }]);
            
            localStorage.setItem('carrinho', JSON.stringify([...carrinho, { 
                title: livro.title, 
                cover_i: livro.cover_i, 
                isbn: isbn, 
                author_name: author_name, 
                subject: subject, 
                publish_date: publish_date, 
                first_sentence: first_sentence,
                quantity: 1 
            } ]));
        } else {
            const newCarrinho = carrinho.map(item => {
                if (item.isbn === isbn) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            localStorage.setItem('carrinho', JSON.stringify(newCarrinho));
            return setCarrinho(newCarrinho);
        }

    }

    const hanbleRemoverLivroCarrinho = (isbn: string) => {
        localStorage.removeItem('carrinho');
        setCarrinho(carrinho.filter(item => item.isbn !== isbn));
        if (carrinho.length === 1) {
            setShowCarrinho(false);
        }

    }

    const handleFinalizarCompra = () => {

       livroService.finalizarCompra(carrinho).then(response => {
        localStorage.removeItem('carrinho');
        setShowCarrinho(false);
        setCarrinho([]);
        }).catch(err => {
            console.log(err);
            setShowError(true);
            setShowMessageError(err.response.data.detail);
        });
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

