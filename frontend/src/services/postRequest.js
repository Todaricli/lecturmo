import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    const isResponseError = error.response && error.response.data;
    const message =
      isResponseError && error.response.data.message
        ? error.response.data.message
        : 'Unknown error occurred';
    return {
      error: true,
      status: isResponseError ? error.response.status : 500,
      message: message,
    };
  }
};
