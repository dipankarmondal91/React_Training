import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();
    return ( <>
    <h1>Ooops!! Something went wrong</h1>
    <a onClick={()=>{
        navigate("/login")
    }}>Click here to retry</a>
    </>);
}

export default ErrorPage;