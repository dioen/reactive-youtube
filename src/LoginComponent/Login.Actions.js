export const login = (loginData) => ({
    "type": "USER_LOGIN",
    "payload": loginData
});

export const logout = () => ({
    "type": "USER_LOGOUT"
});