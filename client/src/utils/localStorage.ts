export const getUserToken = () => {
    const savedToken = localStorage.getItem('user_token')
     
    return savedToken;
  };
  
  export const saveUserToken = ( token: string) => {
    if (token.length) {
      localStorage.setItem('user_token', token);
    } 
  };

  export const logoutUser = () =>{
    // Clear user token and user data from localStorage
    localStorage.removeItem('user_token');
   window.location.replace('/')
  }