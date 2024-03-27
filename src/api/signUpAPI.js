import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://gotogether.site/api/',

});
const signUpAPI = {
  requestEmailVerification: async (email) => {
    return await apiClient.post('auth/mail/certification', { email } );
},

  verifyEmailCode: async (email, code) => {
    return await apiClient.post('auth/mail/verify', { email, code } );
},

  submitSignUpForm: async (formData) => {
    return await apiClient.post('auth/signUp',  formData );
  },

   checkEmail: async (email) => {
    return await apiClient.get(`auth/checkEmail?email=${email}`);
  },

  checkNickname: async (nickname) => {
    return await apiClient.get(`auth/checkNickname?nickname=${nickname}`);
  },
};

export default signUpAPI;