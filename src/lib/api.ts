import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = baseUrl;

export async function getUserInfo() {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${baseUrl}/user/getUserById`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true,
  });
  return response.data;
}

export async function signIn(email: string, password: string) {
  const response = await axios.post(`${baseUrl}/auth/signIn`, {
    email: email,
    password: password,
  }, {
    withCredentials: true,
  });
  return response.data;
}

export async function signUp(name: string, email: string, password: string) {
  const response = await axios.post(`${baseUrl}/auth/signup`, {
    name,
    email,
    password,
  });
  return response.data;
}
