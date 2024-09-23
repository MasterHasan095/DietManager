export const getUserId = () => {
    console.log(localStorage)
    return localStorage.getItem('id');  // Retrieve token from local storage
};

export const getUsername = () => {
    return localStorage.getItem('username');  // Retrieve token from local storage
};