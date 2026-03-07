import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Protectedroute = ({children}) => {

    const isAuthenticated =false;
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated) navigate('/login')

    }, [])

  return (
    children
  )
}

export default Protectedroute