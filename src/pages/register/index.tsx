import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import api from "../../utils/api";
import React, {useState} from "react";


const initial = {
    username: '',
    password: '',
    first_name: '',
    endereco: '',
    numero: '',
    cep: '',
    complemento: '',
    bairro: '',
    celular: '',
    cidade: '',
    estado: '',
}

const Register: React.FC = () => {
    const [user, setUser] = useState(initial)

    const hanbleFormRegisterUser = () => {

    }

    return (
       <Container>
            <h1>Register user</h1>
       </Container>
    );
}

export default Register;