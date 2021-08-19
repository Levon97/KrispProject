import { useState } from "react";

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
function Registration() {
    const [inputField, setInputFieldVal] = useState({});
    const  handleSubmit = async () => {
        const res = await fetch("http://localhost:3001/registration",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(inputField)
        })
        console.log(res);
    };
    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'sex') {
            var sexName = sexGen(value);
        }
        setInputFieldVal({...inputField, [name]: sexName || value});
        
    }
    console.log(inputField);
    return (
    <div>
        <input onChange={(e) => changeHandler(e)} name='name' />
        <input onChange={(e) => changeHandler(e)} name='lastName' />
        <input type='email' onChange={(e) => changeHandler(e)} name='email' />
        <input type='password' onChange={(e) => changeHandler(e)} name='password'/>
        <select onChange={(e) => changeHandler(e)} name='sex' >
        <option selected disabled>Choose here</option>
            <option>male</option>
            <option>female</option>
        </select>
        <input type='date' onChange={(e) => changeHandler(e)} name='birth' />
        <button onClick = {()=>handleSubmit()}>submit</button>
    </div>)
}

export default Registration;