import { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { Context, ContextValue } from '../ContextStore';
import { loginUser } from '../services/userData'
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SimpleSider from '../components/Siders/SimpleSider';

function Login() {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const { setUserData } = useContext(Context) as ContextValue;
    const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const navigate = useNavigate();

    const handleSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`user: ${user}`);
        setLoading(true);
        loginUser(user)
            .then(res => {
                if (!res.error) {
                    setUserData(res.user)
                    navigate('/')
                } else {
                    setLoading(false);
                    setError(res.error.message);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from login: ', err))
    }

    return (
        <>
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Sign In</h1>
                <Form className="col-lg-6" onSubmit={handleSubmitLogin}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleChanges} required />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={handleChanges} required />
                    </Form.Group>
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign In</Button>
                    }
                    <p className="bottom-msg-paragraph">Don't have an account? <Link to="/auth/register">Sign Up</Link>!</p>
                </Form>
            </div>
        </>
    )
}

export default Login;