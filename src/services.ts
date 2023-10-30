import axios from 'axios';

export const login = async (email: string, password: string) => {
  const response = await axios.post('http://localhost:4000/login', {
    email,
    password,
  });
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post('http://localhost:4000/register', {
    name: name,
    email: email,
    password: password,
  });
  return response.data;
};

export const getCourses = async () => {
  const response = await axios.get(`http://localhost:4000/courses/all`);
  return response.data;
};

export const getAuthors = async () => {
  const response = await axios.get(`http://localhost:4000/authors/all`);
  return response.data;
};

export const deleteCourse = async (id: string) => {
  const response = await axios.delete(`http://localhost:4000/courses/${id}`);
  return response.data;
};
