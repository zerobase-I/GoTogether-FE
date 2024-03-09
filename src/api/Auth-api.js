import axios from 'axios';

const loginUser = async (email, password) => {
  const response = await fetch('/api/auth/signIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Invalid email or password');
  }
};

export default loginUser;