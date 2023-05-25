export const getUserToken = () => {
    const savedToken = localStorage.getItem('user_token')
     
    return savedToken;
  };
  
  export const saveUserToken = ( token: string) => {
    if (token.length) {
      localStorage.setItem('user_token', token);
    } 
  };
