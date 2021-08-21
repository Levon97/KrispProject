import { useState } from "react";
import { Redirect } from "react-router-dom";

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
        const res = await fetch("http://localhost:3001/login",{
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
            const authData ={
                'token': data.data.token,
                'email': inputField.email
            };
        localStorage.setItem('user', JSON.stringify(authData));
        setSuccessfulLogin(true);
        }
    }
    return (
        <div>
            <input placeholder = "Enter email" onChange = {(e) => changeHandler(e)} type='mail' name = 'email' />
            <input placeholder = "Enter password" onChange = {(e) => changeHandler(e)} type='password' name = 'password' />
            <button disabled={disabledButton} onClick = {handleSubmit}>login</button>
            {
                errMessage && <p>{errMessage}</p>
            }
            {
                loginSuccess && <Redirect to="/profile"/>
            }
        </div>
    )
}

export default Login;