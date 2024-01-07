export default (axios, endpoint) => ({
  reportByDoctorId: async (body) => {
    const data = await axios.post(endpoint + '/get', body);
    return data;
  },
});
