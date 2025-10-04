import axios from "axios";
import { useState, type BaseSyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";


interface ICredentials {
    username: string,
    password: string
}

function Login() {
    const [credentials,setCredential] = useState<ICredentials>({username:"",password:""});
    const navigate = useNavigate();

    const onTextChange = (args:BaseSyntheticEvent)=>{
        if(!args.target.name) return;
        const copyCredential:ICredentials = {...credentials};

        copyCredential[args.target.name] = args.target.value;
        setCredential(copyCredential);
       // setCredential({...credentials,[args.target.name]:args.target.value});
    }
    const login=()=>{
        console.log(credentials);
        axios.post("http://localhost:9999/signin",credentials).then((result)=>{
            console.log(result.data);
            if(result.data.jwtoken!=undefined){
                localStorage.setItem("token",result.data.jwtoken);
                localStorage.setItem("loggedIn","true");
                localStorage.setItem("username",credentials.username);
                navigate("/display",{replace:true});

            }else{
                console.log("failed to get token");
                navigate("/error",{replace:true});
            }
            
        });
    };
    return (  <>
    <h1>Login Here</h1>
    username: <input type="text" name="username" value={credentials.username} onChange={onTextChange} /><br></br>
    password: <input type="password" name="password" value={credentials.password} onChange={onTextChange}/><br></br>
    <hr></hr>
    <button onClick={login}>Sign In</button>
    </>);
}

export default Login;