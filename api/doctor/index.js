export default (axios, endpoint) => ({
  getAllDoctors: async (body) => {
    const data = await axios.post(endpoint + '/get/all', body);
    return data;
  },

  createDoctor: async (body) => {
    const data = await axios.post(endpoint + '/register', body);
    return data;
  },

  updateDoctor: async (body) => {
    const data = await axios.patch(endpoint + '/update', body);
    return data;
  },

  searchDoctor: async (body) => {
    const data = await axios.post(endpoint + '/search', body);
    console.log(body);
    return data;
  },

  deleteDoctor: async (body) => {
    const data = await axios.post(endpoint + '/delete', body);
    return data;
  },
});
