import { useState } from "react";
import { Redirect } from "react-router-dom";
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Login component
function Login() {
    const [inputField,setInputFieldVal] = useState({})
    const [errMessage, setErrMessage] = useState(null);
    const [disabledButton, setDisabledButton] = useState(false)
    const [loginSuccess, setSuccessfulLogin] = useState(null);
    const changeHandler = (e) => {
        const {name, value} = e.target;
        errMessage && setErrMessage(null);
        setInputFieldVal({...inputField, [name]: value});
    }
    
    // function to send post request regisdtration
    async function handleSubmit () {
        setDisabledButton(true);
        const res = await fetch(`http://localhost:5000/login`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(inputField)
        })
        const data = await res.json();
        if (data.error) {
            setErrMessage(data.error);
            setDisabledButton(false);
        } else {
            const authData = data.data.token;
        localStorage.setItem('auth-token', JSON.stringify(authData));
        setSuccessfulLogin(true);
        }
    }
    return (
        <Form className='form-container'> 
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange = {(e) => changeHandler(e)} name = 'email' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange = {(e) => changeHandler(e)} name = 'password'  />
            </Form.Group>
            <Button disabled={disabledButton} onClick = {handleSubmit}>
                Submit
            </Button>
            {
                errMessage && <p className={'error-message-registration'}>{errMessage}</p>
            }
            {
                loginSuccess && <Redirect to="/profile"/>
            }
        </Form>
    )
}

export default Login;