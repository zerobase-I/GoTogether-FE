import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://49.50.167.227:8080/api/',

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