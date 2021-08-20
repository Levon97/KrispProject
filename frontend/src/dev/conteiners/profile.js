import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

function Profile () {
    const [errMessage, setErrMessage] = useState(null)
    const [userData, setUserData] = useState(null);
    const [authData, setAuthData] = useState(null);
    const [logOut, setlogOut] = useState(null);
    useEffect(() => {
        (async function () {
            const storageData = await JSON.parse(localStorage.getItem('user'));
            setAuthData(storageData);
            if (!storageData) {
                return setErrMessage('Unathorized')
            }
            const res = await fetch("http://localhost:3001/profile",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': storageData.token,
                    'user': storageData.email
                    },
            });
            const data = await res.json();
            if (data.error) {
                setErrMessage(data.error);
            }
            setUserData(data.data);
        })();
    }, [])
    const handleLogOut = () => {
        fetch("http://localhost:3001/logout",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authData.token,
                    },
            });
        localStorage.removeItem('user');
        setlogOut(true);
    }
    return (
        <div>
            {
                userData && <div>
                    <p>{userData.name}</p>
                    <p>{userData.lastName}</p>
                    <p>{userData.email}</p>
                </div>
            }
            {
                errMessage && <Redirect to='login'/>
            }
            {
                logOut && <Redirect to='/'/>
            }
            <button onClick={() => handleLogOut()}>LogOut</button>
        </div>
    )
}
export default Profile;