import { useState } from "react";
import { Redirect } from "react-router-dom";

// changeing male female  to m and f
function  sexGen(sex){
    console.log(sex)
    switch (sex){
        case "male":
            return "m"
        case "female":
            return "f"
        default :
            return;
    }

}
// registration component
function Registration() {
    const [inputField, setInputFieldVal] = useState({});
    const [disabledButton,setDisabledButton] = useState(false);
    const [registrationSucces, setSuccessfulReg] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    const changeHandler = (e) => {
        disabledButton && setDisabledButton(false);
        errMessage && setErrMessage(null);
        const { name, value } = e.target;
        if (name === 'sex') {
            var sexName = sexGen(value);
        }
        setInputFieldVal({...inputField, [name]: sexName || value});
        
    }
    
    // function to send post request regisdtration
    async function  handleSubmit() {
        setDisabledButton(true)
        const res = await fetch("http://localhost:3001/registration",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(inputField)
        })

        const data = await res.json();
        if (data.error) {
            return setErrMessage(data.error);
        }
        return setSuccessfulReg(true)
    };
    return (
    <div>
        <input placeholder = "Enter name" onChange={(e) => changeHandler(e)} name='name' />
        <input placeholder = "Enter last name" onChange={(e) => changeHandler(e)} name='lastName' />
        <input placeholder = "Enter email" type='email' onChange={(e) => changeHandler(e)} name='email' />
        <input placeholder = "Enter password" type='password' onChange={(e) => changeHandler(e)} name='password'/>
        <select onChange={(e) => changeHandler(e)} name='sex' >
        <option selected disabled>Select gender</option>
            <option>male</option>
            <option>female</option>
        </select>
        <input type='date' onChange={(e) => changeHandler(e)} name='birth' />
        <button disabled = {disabledButton} onClick = {handleSubmit}>registration</button>
        {
            errMessage && <p>{errMessage}</p>
        }
        {
            registrationSucces && <Redirect to='/login' />
        }
    </div>)
}

export default Registration;