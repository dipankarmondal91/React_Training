import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IEmployee } from "./models";



function Display() {

    const [employees,setEmployees] = useState<Array<IEmployee>>([]);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        axios.get("http://localhost:9999/emps",{headers:{Authorization:`Bearer ${token}`}}).then((res)=>{
            const employees:Array<IEmployee> = res.data.map((emp:any)=>({
                no:emp.No,
                name:emp.Name,
                address:emp.Address
            }));
            setEmployees(employees);
           // console.log(res.data);
            console.log(employees);
            
        }).catch(err=>console.log(err));
    },[]);
    const navigate = useNavigate();


    return ( <>
    <div style={{margin:"0 auto",width:"100%",alignContent:"center"}}>
    <div>
            <button onClick={()=>{
                localStorage.removeItem("token");
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("username");
                navigate("/login");
            }}>Logout</button>
        </div>
        <h1>Employees</h1>
        <div>
            <button onClick={()=>{
                navigate(`/create`);
            }}>Create</button>
        </div>
       
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {employees.map(emp=>(
                    <tr key={emp.no}>
                        <td>{emp.no}</td>
                        <td>{emp.name}</td>
                        <td>{emp.address}</td>
                        <td><button onClick={
                            ()=>{
                                navigate(`/edit/${emp.no}`);
                            }
                        }>Edit</button></td>
                        <td><button onClick={()=>{
                            const token = localStorage.getItem("token");
                            axios.delete(`http://localhost:9999/emps/${emp.no}`,{headers:{Authorization:`Bearer ${token}`}}).then(res=>{
                                console.log(res.data);
                                const filtered = employees.filter(e=>e.no!==emp.no);
                                setEmployees(filtered);
                            }).catch(err=>console.log(err));
                        }}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </> );
}

export default Display;