import { Link } from "react-router-dom";

function Home () {
    return (
        <div className='nav-bar'>
            <Link to='/login'>Login</Link>
            <Link to='/registration'>Registration</Link>
        </div>
    )
}
export default Home;