import { Link } from "react-router-dom";

function Home () {
    return (
        <div>
            <Link to='/login'>Login</Link>
            <Link to='/registration'>Registration</Link>
        </div>
    )
}
export default Home;