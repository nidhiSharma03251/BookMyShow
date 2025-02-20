import {Outlet, Navigate} from "react-router-dom";
function ProtectedRoute(){
    return localStorage.getItem('idigital-bookshow-user') ? (
    <Outlet /> 
    ) : (
        <Navigate to ="/login" />
    ); 
}

export default ProtectedRoute;