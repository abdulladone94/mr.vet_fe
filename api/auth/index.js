export default (axios, endpoint) => ({
  login: async (body) => {
    const data = await axios.post(`${endpoint}/login`, body);
    return data;
  },
  register: async (body) => {
    const data = await axios.post(`${endpoint}/register`, body);
    return data;
  },
  changePassword: async (body) => {
    const data = await axios.patch(`${endpoint}/password/reset`, body);
    return data;
  },
});
