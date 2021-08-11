export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTO_LOGIN = 'AUTO_LOGIN';

export const Login = (payload) => ({
    type: LOGIN,
    payload
})


export const logoutUser = (payload) => ({
    type: LOGOUT,
    payload
})
