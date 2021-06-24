import axios from 'axios'
import Swal from 'sweetalert2'


const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_URL
});


export function setToken(config, idToken = '') {
  config.headers.common['Authorization'] = `Bearer ${idToken}`;
}

instance.interceptors.request.use(config => {

  //set interceptor token header
  setToken(config, localStorage.getItem('token'));

  return config
}, error => {
  return Promise.reject(error)
});

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  async (error) => {
    if (!error.response) {
      Swal.fire({
        type: 'info',
        title: 'Network Error: Request Failed',
        showConfirmButton: false,
        // timer: 1000,
        allowOutsideClick: true
      });
      return Promise.reject({
        response: {
          data: {
            code: 502,
            description: "Network unavailable",
            status: false,
            data:{}
          }
        }
      })
    }

    // console.log(error.config)
    if (error.response.status == 401) {
        logout()

    } else {
      return Promise.reject(error);
    }
  });

/**
 * oauth api axios object
 */

// returns default axios config
export default instance

export const logout = ()=>{
  localStorage.clear()
  window.location.href = '/'
}
