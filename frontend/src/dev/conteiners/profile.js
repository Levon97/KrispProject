import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePic from '../../assets/profile.png'
function Profile () {
    const [errMessage, setErrMessage] = useState(null)
    const [userData, setUserData] = useState(null);
    const [authData, setAuthData] = useState(null);
    const [logOut, setlogOut] = useState(null);
    useEffect(() => {
        (async function () {
            const storageData = await JSON.parse(localStorage.getItem('auth-token'));
            setAuthData(storageData);
            if (!storageData) {
                return setErrMessage('Unathorized')
            }
            const res = await fetch('http://localhost:5000/profile',{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': storageData,
                    },
            });
            const data = await res.json();
            if (data.error) {
                setErrMessage(data.error);
            }
            setUserData(data.data);
        })();
    }, [])
    const  handleLogOut = async() => {
        const res =  await fetch('http://localhost:5000/logout',{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authData,
                    },
            });

        localStorage.removeItem('auth-token');
         const data = await res.json();
        if(data.error){
            setErrMessage(data.error);
        }
        setlogOut(true);
    }
    return (
        <div className='profile-section'>
            <img src={ProfilePic} />
            {
                userData && <div>
                    <p className='profile-text'>{userData.name} {userData.lastName}</p>
                    
                </div>
            }
            {
                errMessage && <Redirect to='login'/>
            }
            {
                logOut && <Redirect to='/'/>
            }
            <Button className='button-profile' onClick={() => handleLogOut()}>Log Out</Button>
        </div>
    )
}
export default Profile;