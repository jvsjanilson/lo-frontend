import React, { useState, useContext} from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { LivrariaContext } from "../../context/LivrariaContext";
import { Link } from "react-router-dom";

const initial = {
    username: '',
    password: '',
}

const Login: React.FC = () => {
    const [usuarioForm, setUsuarioForm] = useState(initial);
    const livrariaContext = useContext(LivrariaContext);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUsuarioForm({...usuarioForm, [name]: value});
      }

    const handleExitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        livrariaContext?.login(usuarioForm.username, usuarioForm.password)
    }

    return (
        <div style={{ alignItems: 'center', backgroundColor: '#e9ecef', 'display': 'flex', 
            flexDirection: 'column', 'height': '100vh', justifyContent: 'center' }}>
        
        <Container className="justify-content-center"
            style={{ maxWidth: '400px',}}
        >
            
            
                <Alert variant="danger" show={livrariaContext?.showError} 
                    onClose={() => livrariaContext?.setShowError(false)}
                    dismissible>
                    <span>{livrariaContext?.showMessageError}</span>
                </Alert>
                    <Form onSubmit={handleLogin}>
                        <Card style={{borderTop: '3px solid #007bff'}}>
                            <Card.Header className="py-3 text-center fw-bold card-outline-primary">
                                Informe suas credenciais
                            </Card.Header>
                            <Card.Body>
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>Usuário:</Form.Label>
                                        <Form.Control type="text" name="username" 
                                            value={usuarioForm.username} onChange={handleChange}
                                            onBlur={handleExitLogin}
                                            autoFocus
                                        />
                                        
                                         {livrariaContext?.errors.username && (
                                            <ul className="errorfield">
                                                {livrariaContext?.errors.username.map((error, index) => (
                                                    <li key={index} className="text-danger">{error}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Senha:</Form.Label>
                                        <Form.Control type="password" value={usuarioForm.password} 
                                            name="password"  onChange={handleChange} />
                                        {livrariaContext?.errors.password && (
                                            <ul className="errorfield">
                                                {livrariaContext?.errors.password.map((error, index) => (
                                                    <li key={index} className="text-danger">{error}</li>
                                                ))}
                                            </ul>
                                        )}                                            
                                    </Form.Group>

                                    
                           
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between">
                                
                                <div className="row g-2">
                                    <div className="col">
                                    <Link to="/" className="btn btn-secondary">Voltar</Link>        
                                   </div>
                                   <div className="col">
                                    
                                    <Link to="/register" className="btn btn-success">Registrar</Link>
                                   </div>
                                </div>
                                <Button variant="primary" type="submit">
                                    Entrar
                                </Button>
                                
                            </Card.Footer>
                        </Card>
                    </Form>
                
        </Container>
        </div>
    );
}

export default Login;