// import axios from 'axios';

// // 이메일 중복 확인
// export const checkEmailDuplicate = async (email) => {
//   const response = await axios.post('/api/checkEmail', { email });
//   return response.data;
// };

// // 이메일 인증 코드 발송
// export const sendEmailVerificationCode = async (email) => {
//   const response = await axios.post('/api/auth/mail/certification', { email });
//   return response.data;
// };

// // 회원가입 요청
// export const signUp = async (userData) => {
//   const response = await axios.post('/api/signup', userData);
//   return response.data;
// };