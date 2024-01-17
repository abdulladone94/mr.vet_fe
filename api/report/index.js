export default (axios, endpoint) => ({
  reportByDoctorId: async (body) => {
    const data = await axios.post(endpoint + '/get', body);
    return data;
  },

  deleteReport: async (body) => {
    const data = await axios.post(endpoint + '/delete', body);
    return data;
  },

  searchReports: async (body) => {
    const data = await axios.post(endpoint + '/search', body);
    return data;
  },
});
