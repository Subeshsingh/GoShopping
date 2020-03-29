import axios from 'axios';
import * as actionTypes from './ActionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
            type:actionTypes.AUTH_LOGOUT
        };
}

export const checkAuthTimeOut = (expirationtime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logOut());
        }, expirationtime*1000);
    }
}


export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        let url ='http://localhost:8000/login';
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                const expirationDate= new Date( new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.email);
                dispatch(authSuccess(response.data.token, response.data.email));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const signup = (email, password,cnfpassword) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            cnfpassword: cnfpassword
        };
        let url ='http://localhost:8000/signup';
        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                const expirationDate= new Date( new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.email);
                dispatch(authSuccess(response.data.token, response.data.email));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logOut());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};