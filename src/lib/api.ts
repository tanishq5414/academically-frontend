import axios from "axios";

const baseUrl = process.env.NEXT_API_URL;

export async function getUserInfo() {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${baseUrl}/auth/signIn`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export async function signIn(email: string, password: string) {
  const response = await axios.post(`${baseUrl}/auth/signIn`, {
    email: email,
    password: password,
  });
  return response.data;
}

export async function signUp(email: string, password: string) {
  const response = await axios.post(`${baseUrl}/auth/signUp`, {
    email: email,
    password: password,
  });
  return response.data;
}
