import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Col, Spinner, Alert, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/Register/Register.css';

interface UserData {
  name: string | null;
  username: string;
  lastName: string | null;
  gender: string | null;
  phoneNumber: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface RegisterProps {
    history?: string
}

const Register: React.FC<RegisterProps> = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    name: null,
    lastName: null,
    gender: null,
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }
  
  const navigate = useNavigate()

  const handleSubmitReg = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    registerUser(userData)
      .then(res => {
        if (!res.error) {
          navigate('/auth/login');
        } else {
          setLoading(false);
          setError(res.error);
          setAlertShow(true);
        }
      })
      .catch(err => console.error('error from register: ', err));
  }

  return (
    <>
      <SimpleSider />
      <div className="container auth-form">
        <h1 className="auth-heading">Sign Up</h1>
        <Form className="col-lg-8" onSubmit={handleSubmitReg}>
          {alertShow && (
            <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
              <p>{error}</p>
            </Alert>
          )}
          <Row>
            <Form.Group controlId="forName" className="col-lg-5">
              <Form.Label>Name *</Form.Label>
              <Form.Control type="text" name="name" placeholder="Ivan Ivanov" onChange={() => handleChanges} required />
              <Form.Text muted>
                The name can be your real one or a username.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="forUsername" className="col-lg-4">
              <Form.Label>Username *</Form.Label>
              <Form.Control type="text" name="username" placeholder="Username" onChange={() => handleChanges} required />
              <Form.Text muted>
                Must be unique, 8 characters or more
              </Form.Text>
            </Form.Group>
            {/* <Form.Group controlId="forLastName" className="col-lg-4">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" placeholder="Ivanov" onChange={handleChanges} />
            </Form.Group> */}
            <Form.Group as={Col} controlId="formGridGender" className="col-lg-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" defaultValue="not specified" name="gender" onChange={() => handleChanges}>
                <option>male</option>
                <option>female</option>
                <option>not specified</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="col-lg-12">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control type="text" name="phoneNumber" placeholder="+359888888888" onChange={() => handleChanges} required />
              <Form.Text muted>
                Phone Number should be a valid BG number.
              </Form.Text>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formBasicEmail" className="col-lg-12">
              <Form.Label>Email address *</Form.Label>
              <Form.Control type="email" name="email" placeholder="ivan@abv.bg" onChange={() => handleChanges} required />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formBasicPassword" className="col-lg-6">
              <Form.Label>Password *</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={() => handleChanges} required />
              <Form.Text muted>
                Your password must be 8-20 characters long
              </Form.Text>
            </Form.Group>
            <Form.Group className="col-lg-6">
              <Form.Label>Reepeat Password *</Form.Label>
              <Form.Control type="password" name="repeatPassword" placeholder="Repeat password" onChange={() => handleChanges} required />
            </Form.Group>
          </Row>
          {loading ? (
            <Button className="col-lg-12 btnAuth" variant="dark" disabled>
              Please wait... <Spinner animation="border" />
            </Button>
          ) : (
            <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign Up</Button>
          )}

          <p className="bottom-msg-paragraph">Already have an account? <Link to="/auth/login">Sign In</Link>!</p>
        </Form>
      </div>
    </>
  );
}

export default Register;
