import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";


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
    email: ''
}

const initialFieldsError = {
    username: [],
    password: [],
    first_name: [],
    endereco: [],
    numero: [],
    cep: [],
    bairro: [],
    celular: [],
    cidade: [],
    estado: [],
    email: [],
    complemento: [],
    
}

const estados = [
    {value: 'AC', label: 'Acre'},
    {value: 'AL', label: 'Alagoas'},
    {value: 'AP', label: 'Amapá'},
    {value: 'AM', label: 'Amazonas'},
    {value: 'BA', label: 'Bahia'},
    {value: 'CE', label: 'Ceará'},
    {value: 'DF', label: 'Distrito Federal'},
    {value: 'ES', label: 'Espírito Santo'},
    {value: 'GO', label: 'Goiás'},
    {value: 'MA', label: 'Maranhão'},
    {value: 'MT', label: 'Mato Grosso'},
    {value: 'MS', label: 'Mato Grosso do Sul'},
    {value: 'MG', label: 'Minas Gerais'},
    {value: 'PA', label: 'Pará'},
    {value: 'PB', label: 'Paraíba'},
    {value: 'PR', label: 'Paraná'},
    {value: 'PE', label: 'Pernambuco'},
    {value: 'PI', label: 'Piauí'},
    {value: 'RJ', label: 'Rio de Janeiro'},
    {value: 'RN', label: 'Rio Grande do Norte'},
    {value: 'RS', label: 'Rio Grande do Sul'},
    {value: 'RO', label: 'Rondônia'},
    {value: 'RR', label: 'Roraima'},
    {value: 'SC', label: 'Santa Catarina'},
    {value: 'SP', label: 'São Paulo'},
    {value: 'SE', label: 'Sergipe'},
    {value: 'TO', label: 'Tocantins'},
]

const Register: React.FC = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(initial)
    const [errors, setErrors] = useState(initialFieldsError);
    
    const hanbleFormRegisterUser = (e: any) => {
        e.preventDefault();
        setErrors(initialFieldsError);
        userService.createUser(user).then(response => {
            navigate('/login')
        }).catch(err => {
            if (err.response.status === 400) {
                setErrors(err.response.data)
            }
        })

    }

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        
        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div style={
            { 
                alignItems: 'center', 
                backgroundColor: '#e9ecef', 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100vh', 
                justifyContent: 'center' 
            }
        }>
            <Container className="" style={{ maxWidth: '50rem',}}>
                
                <Form onSubmit={hanbleFormRegisterUser}>
                    <Card style={{borderTop: '3px solid #007bff'}}>
                        <Card.Header className="py-3 text-center fw-bold card-outline-primary">
                            Registro de usuário
                        </Card.Header>
                        <Card.Body>
                            <Row className="g-2">
                                <Col>
                            
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>Usuário:</Form.Label>
                                        <Form.Control type="text" name="username" 
                                            onChange={handleChange}
                                            value={user.username}
                                        autoFocus/>
                                        
                                            {errors.username && (
                                                <ul className="errorfield">
                                                    {errors.username.map((error, index) => (
                                                        <li key={index} className="text-danger">{error}</li>
                                                        ))}
                                                </ul>
                                            )}
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Senha:</Form.Label>
                                        <Form.Control type="password" 
                                            onChange={handleChange}
                                            value={user.password}
                                            name="password"  />
                                        {errors.password && (
                                            <ul className="errorfield">
                                            {errors.password.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                                ))}
                                            </ul>
                                         )}                                            
                                    </Form.Group>
                                </Col>

                            </Row>   

                            <Row  className="g-2">
                                <Col>
                            
                                    <Form.Group className="mb-3" controlId="first_name">
                                        <Form.Label>Nome do usuário:</Form.Label>
                                        <Form.Control type="text" name="first_name" maxLength={150}
                                            onChange={handleChange}
                                            value={user.first_name}
                                        
                                        />
                                        
                                            {errors.first_name && (
                                            <ul className="errorfield">
                                            {errors.first_name.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                                ))}
                                                </ul>
                                                )}
                                    </Form.Group>
                                </Col>

                                <Col>
                            
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>e-mail:</Form.Label>
                                        <Form.Control type="text" name="email" maxLength={150}
                                            onChange={handleChange}
                                            value={user.email}
                                        
                                        />
                                        
                                            {errors.email && (
                                            <ul className="errorfield">
                                            {errors.email.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                                ))}
                                                </ul>
                                                )}
                                    </Form.Group>
                                </Col>


                                <Col md={2}>
                                    <Form.Group className="mb-3" controlId="celular">
                                        <Form.Label>Celular:</Form.Label>
                                        <Form.Control type="text" name="celular" maxLength={11}
                                            onChange={handleChange}
                                            value={user.celular}
                                        />
                                        
                                            {errors.celular && (
                                            <ul className="errorfield">
                                            {errors.celular.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                                ))}
                                                </ul>
                                                )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row  className="g-2">
                                <Col>
                            
                                    <Form.Group className="mb-3" controlId="endereco">
                                        <Form.Label>Endereço:</Form.Label>
                                        <Form.Control type="text" name="endereco" maxLength={100} 
                                            onChange={handleChange}
                                            value={user.endereco}
                                        />
                                        
                                            {errors.endereco && (
                                            <ul className="errorfield">
                                            {errors.endereco.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                                ))}
                                                </ul>
                                                )}
                                    </Form.Group>
                                </Col>

                                <Col md={2}>
                            
                                    <Form.Group className="mb-3" controlId="numero">
                                        <Form.Label>Numero:</Form.Label>
                                        <Form.Control type="text" name="numero" maxLength={10} 
                                            onChange={handleChange}
                                            value={user.numero}
                                        />
                                        
                                            {errors.numero && (
                                            <ul className="errorfield">
                                            {errors.numero.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                                ))}
                                                </ul>
                                                )}
                                    </Form.Group>
                                </Col>

                                <Col md={2}>
                            
                                    <Form.Group className="mb-3" controlId="cep">
                                        <Form.Label>CEP:</Form.Label>
                                        <Form.Control type="text" name="cep" maxLength={8}
                                            onChange={handleChange}
                                            value={user.cep}
                                        />
                                        
                                            {errors.cep && (
                                            <ul className="errorfield">
                                            {errors.cep.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                                ))}
                                                </ul>
                                                )}
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Row  className="g-2">
                                <Col>
                            
                                    <Form.Group className="mb-3" controlId="complemento">
                                        <Form.Label>Complemento:</Form.Label>
                                        <Form.Control type="text" name="complemento" maxLength={50} 
                                            onChange={handleChange}
                                            value={user.complemento}
                                        />
                                        
                                            {errors.complemento && (
                                            <ul className="errorfield">
                                            {errors.complemento.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                                ))}
                                                </ul>
                                                )}
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId="bairro">
                                        <Form.Label>Bairro:</Form.Label>
                                        <Form.Control type="text" name="bairro" maxLength={100}
                                            onChange={handleChange}
                                            value={user.bairro}
                                        />
                                            {errors.bairro && (
                                            <ul className="errorfield">
                                            {errors.bairro.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                                ))}
                                                </ul>
                                                )}
                                    </Form.Group>
                                </Col>
                               
                            </Row>


                            <Row className="g-2">
                                <Col >
                                    <Form.Group className="mb-3" controlId="cidade">
                                        <Form.Label>Cidade:</Form.Label>
                                        <Form.Control type="text" name="cidade" maxLength={100} 
                                            onChange={handleChange}
                                            value={user.cidade}
                                        />
                                        
                                            {errors.cidade && (
                                            <ul className="errorfield">
                                            {errors.cidade.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                                ))}
                                                </ul>
                                                )}
                                    </Form.Group>
                                </Col>
                            
                                <Col md={4}>
                                    <Form.Group className="mb-3" controlId="estado">
                                        <Form.Label>Estado:</Form.Label>
                                        <Form.Select name="estado" 
                                            onChange={handleChange}
                                            value={user.estado}
                                        >
                                            <option value="">Selecione...</option>
                                            {estados.map((estado, index) => (
                                                <option key={index} value={estado.value}>{estado.label}</option>
                                            ))}
                                        </Form.Select>
                                            {errors.estado && (
                                            <ul className="errorfield">
                                            {errors.estado.map((error, index) => (
                                                <li key={index} className="text-danger">{error}</li>
                                                ))}
                                                </ul>
                                                )}
                                    </Form.Group>
                                </Col>
                            </Row>
                        
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-between">
                            <Link to="/login" className="btn btn-secondary">Voltar</Link>
                            <div className="row g-2">
                                
                                
                                <div className="col">
                                    
                                    <Button type="submit" variant="primary">Registrar</Button>
                                </div>
                            </div>
                            
                        </Card.Footer>
                    </Card>
                </Form>
                
            </Container>
       </div>
    );
}

export default Register;