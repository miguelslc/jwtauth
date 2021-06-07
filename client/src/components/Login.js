import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser} from '../actions/authentication';
import classnames from 'classnames';

const Login = (props) => {

    const initialInputState = { email: "", password:"", errors:{}};
    const [inputs, setInputs] = useState(initialInputState);
    const {email, password, errors} = inputs;

    const handleInputChange = (e) => {
        e.persist();
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        }
        loginUser(user);
    }
    
    //Hooks - componentWillReceiveProps
    useEffect(() => {
        console.log('errors', props.errors);
        if(props.auth.isAuthenticated) {
            props.history.push('/')
        }
    }, [props.errors, props.auth.isAuthenticated, props.history])

    return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Login</h2>
            <form onSubmit={ handleSubmit }>   
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ handleInputChange }
                    value={ email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ handleInputChange }
                    value={ password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Login User
                    </button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Login)