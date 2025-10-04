import { Route, Routes } from "react-router-dom";
import Display from "./display";
import Edit from "./edit";
import Create from "./create";
import Login from "./login";
import ProtectedRoute from "./protectedroute";
import ErrorPage from "./error-page";

function Launcher() {
    return (
        
        <Routes>
        <Route path="/" element={<ProtectedRoute>
            <Display />
            </ProtectedRoute>} />
        <Route path="/display" element={
            <ProtectedRoute>
            <Display />
            </ProtectedRoute>} />
        <Route path="/edit/:empNo" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
    </Routes> );
}

export default Launcher;