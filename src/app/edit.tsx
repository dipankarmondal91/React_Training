import {  useEffect, useState, type BaseSyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IEmployee, IEmployeeRequest } from "./models";
import axios from "axios";

function Edit() {
    const params = useParams()
    const [employee,setEmployee] = useState<IEmployee>({no:0,name:"",address:""});
    const [error,setError] = useState<string>("");
    const navigate = useNavigate();
    console.log(params.empNo);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:9999/emps/${params.empNo}`,{headers:{Authorization:`Bearer ${token}`}}).then((res)=>{
            const employee:IEmployee = {
                no:res.data[0].No, 
                name:res.data[0].Name,
                address:res.data[0].Address
            };
            setEmployee(employee);
           // console.log(res.data);
            console.log(employee);
            
        }).catch(err=>console.log(err));
    },[]);
     const onChange = (args:BaseSyntheticEvent)=>{
            if(!args.target.name) return;
            const emp:IEmployee = {...employee};
    
            emp[args.target.name] = args.target.value;
            setEmployee(emp);
           // setCredential({...credentials,[args.target.name]:args.target.value});
        }
        const onSubmit = ()=>{
            if(employee.no===0 || employee.name.trim()==="" || employee.address.trim()===""){
                setError("All fields are required");
                return;
            }
            setError("");
            const token = localStorage.getItem("token");
            const empRequest:IEmployeeRequest={
                No:employee.no,
                Name:employee.name,
                Address:employee.address
            }
            axios.put(`http://localhost:9999/emps/${params.empNo}`,empRequest,{headers:{Authorization:`Bearer ${token}`}}).then(res=>{
                console.log(res.data);  
                navigate("/display");
                
            }).catch(err=>console.log(err));
            //submit the form
    
        }
    return ( <>
     <div>
            <button onClick={()=>{
                localStorage.removeItem("token");
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("username");
                navigate("/login");
            }}>Logout</button>
        </div>
    <h1>Edit</h1>
        <div>
        <label>No:</label>
        <input type="number" name="no" value={employee.no} onChange={onChange} />
        </div>
        <div>
        <label>Name:</label>
        <input type="text" name="name" value={employee.name} onChange={onChange} />
        </div>
        <div>
        <label>Address:</label>
        <input type="text" name="address" value={employee.address} onChange={onChange} />
        </div>
        <div>
            {error && <p style={{color:"red"}}>{error}</p>}
        </div>
        <div>
            <button onClick={onSubmit}>Submit</button>
        </div>
    </> );
}

export default Edit;