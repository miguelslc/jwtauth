import React from 'react';
import store from '../store';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authentication';
import { Link } from 'react-router-dom';

const Home = () => {
    const jwToken = localStorage.jwtToken;

    if(!jwToken) {
    
        window.location.href = '/login'
    }
        setAuthToken(jwToken);
        const decoded = jwt_decode(jwToken);
        store.dispatch(setCurrentUser(decoded));
        var currentTime = Date.now() / 1000;
        if(decoded.exp < currentTime) {
            store.dispatch(logoutUser());
            window.location.href = '/login'
        }
    //}
    const user = store.dispatch(setCurrentUser(decoded));

    const currentDate =()=> {
        let date = new Date().toJSON().slice(0,10);
        let currentTime= new Date().toLocaleTimeString();
        
        return `La Hora actual es: ${currentTime} de  ${date}`;
    }

    return (
        <div className="container">
            <h2>Inicio</h2>
            {user.payload.name ? (
                <div>
                    <h2>Bienvenido {user.payload.name }</h2>
                    <h2>{currentDate()}</h2>
                </div>
                    ) : (
            <>
                <h2>Por favor, inicia sesion</h2>
                <Link to="/login">Login</Link>
            </>
                )}
        </div>
    );
    }


export default Home;