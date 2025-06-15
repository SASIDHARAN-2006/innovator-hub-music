import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContextAPI } from '../context/AuthContext'

const ProtectedRoutes = (props) => {
    let {authuser} = useContext(AuthContextAPI)
    
    if(!authuser){
        return <Navigate to="/auth/login"/>
    }else{
        return props.children
    }
  
}

export default ProtectedRoutes
