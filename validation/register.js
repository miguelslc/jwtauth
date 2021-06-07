const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function valideteRegisterInput(data){
    let errors = {};
    data.name = !isEmpty(data.name)  ? data.name : '';
    data.email = !isEmpty(data.email)  ? data.email : '';
    data.password = !isEmpty(data.password)  ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm)  ? data.password_confirm : '';

    if (!Validator.isLength(data.name,{min: 2, max:15})) {
        errors.name = 'Name must be between 2 and 15 chars';
    }

    if (Validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    if (!Validator.isLength(data.password,{min: 6, max:15})) {
        errors.password = 'Password must be between 6 chars';
    }

    if (Validator.isEmpty(data.password)){
        errors.password = 'Password is required';
    }

    if (!Validator.isLength(data.password_confirm,{min: 6, max:15})) {
        errors.password_confirm = 'Password must be between 6 chars';
    }

    if (Validator.isEmpty(data.password_confirm)){
        errors.password_confirm = 'Password is required';
    }

    if (!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must Match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}