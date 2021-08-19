import { useState } from "react";
import { Redirect } from "react-router-dom";

function Login() {
    const [inputField,setInputFieldVal] = useState({})
    const [errMessage, setErrMessage] = useState(null);
    const [loginSuccess, setSuccessfulLogin] = useState(null);
    const changeHandler = (e) => {
        const {name, value} = e.target;
        errMessage && setErrMessage(null);
        setInputFieldVal({...inputField, [name]: value});
    }
    
    // function to send post request regisdtration
    const handleSubmit = async () => {
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
        } else {
            setSuccessfulLogin(true)
        }
    }
    return (
        <div>
            <input onChange = {(e) => changeHandler(e)} type='mail' name = 'email' />
            <input onChange = {(e) => changeHandler(e)} type='password' name = 'password' />
            <button onClick = {handleSubmit}>login</button>
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