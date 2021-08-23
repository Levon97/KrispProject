import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Badge } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
// registration component
function Registration() {
    const current = new Date().toISOString().split("T")[0];
    const [inputField, setInputFieldVal] = useState({});
    const [disabledButton,setDisabledButton] = useState(false);
    const [registrationSucces, setSuccessfulReg] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    const [confirmPass, setConfirmPass] = useState(null);
    const changeHandler = (e) => {
        disabledButton && setDisabledButton(false);
        errMessage && setErrMessage(null);
        const { name, value } = e.target;
        if (name === "retypePassword") {
            setConfirmPass(value);
        } else {
            if (name === 'sex') {
                var sexName = value[0];
            }
            setInputFieldVal({...inputField, [name]: sexName || value});
        }
        
    }
    // function to send post request regisdtration
    async function  handleSubmit() {
        if(inputField.password !== confirmPass) {
            return setErrMessage("password didn't match")
        }
        setDisabledButton(true)
        setConfirmPass(null);
        const res = await fetch(`http://localhost:5000/registration`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(inputField)
        })

        const data = await res.json();
        if (data.error) {
            setErrMessage(data.error);
        } else {
            setSuccessfulReg(true)
        }
    };
    return (
        <>
        <Form className='form-container'>
         <h4>
            <Badge bg="secondary">Please fill the Form</Badge>
        </h4>
            <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Enter first name" onChange = {(e) => changeHandler(e)} name = 'name' />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Enter last name " onChange = {(e) => changeHandler(e)} name = 'lastName' />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Enter email" onChange = {(e) => changeHandler(e)} name = 'email'  />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Enter password" onChange = {(e) => changeHandler(e)} name = 'password' />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Confirm password" onChange = {(e) => changeHandler(e)} name = 'retypePassword' />
            </Form.Group>
            <Form.FloatingLabel>
            <Form.Select aria-label="Floating label select example" onChange={(e) => changeHandler(e)} name='sex' >
                <option>Select gender</option>
                <option>male</option>
                <option>female</option>
                <option>other</option>
            </Form.Select>
            </Form.FloatingLabel>
            <Form.Group className="mb-3">
                <Form.Control type="date" placeholder="Enter email" onChange = {(e) => changeHandler(e)} name = 'birth' />
            </Form.Group>
            <Button disabled = {disabledButton} onClick = {handleSubmit}>
                Registration
            </Button>
        </Form>
            {
            errMessage && <p className='error-message-registration'>{errMessage}</p>
            }
            {
                registrationSucces && <Redirect to='/login' />
            }
            </>
    )
}

export default Registration;