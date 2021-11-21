import axios from "axios";

// const axios = require('axios');

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const apiClient = axios.create({
  // baseURL: 'https://localhost:44342',
  // baseURL: "http://localhost:64988",

  //baseURL: 'http://192.168.3.7:8000',
  baseURL: "http://51.210.176.186:8000",
  //mode: 'cors',
  //timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
    "x-ApiKey": localStorage.getItem("keyAPP"),
    //'Access-Control-Allow-Origin': '*',
  },
});

// Step-2: Create request, response & error handlers
const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  //Bearer
  request.headers.Authorization = "Bearer " + localStorage.getItem("keyAPP");

  return request;
};

const responseHandler = (response) => {
  // if (response?.status === 401) {
  if (response?.status != 200) {
    window.location = "/login";
  }

  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
apiClient.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

apiClient.interceptors.response?.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

// Step-4: Export the newly created Axios instance to be used in different locations.
export default apiClient;
// import axios from 'axios'
// export const apiClient = axios.create({
//   baseURL: 'https://localhost:44342',
//   headers: {
//     authorization:
//       'X-ApiKey c477888c7f9b89b89c24af26f0d9f0858f3a5eb42e5152a3c63dc68cfb891558',
//   },
// })

// //X-ApiKey c477888c7f9b89b89c24af26f0d9f0858f3a5eb42e5152a3c63dc68cfb891558

// // const x = apiClient.interceptors.request.use((req) => {
// //   req.headers.authorization =
// //     'X-ApiKey c477888c7f9b89b89c24af26f0d9f0858f3a5eb42e5152a3c63dc68cfb891558'
// //   return req
// // })

// // export const apiClient = apiC
// // const apiC = () => {
// //   const api = axios.create({
// //     baseURL: 'https://localhost:44342',
// //   })
// //   api.interceptors.request.use((req) => {
// //     req.headers.authorization =
// //       'X-ApiKey c477888c7f9b89b89c24af26f0d9f0858f3a5eb42e5152a3c63dc68cfb891558'
// //   })
// //   return api
// // }

// //export const apiClient = axios.create({ baseUrl: 'https://localhost:44342' })
// // apiClient.interceptors.request.use((req) => {
// //   req.headers.authorization =
// //     'X-ApiKey c477888c7f9b89b89c24af26f0d9f0858f3a5eb42e5152a3c63dc68cfb891558'
// //   return req
// // })

// //  export const apiClient = axios.create({
// //    baseURL: 'https://localhost:44342'});,
// //    //baseURL: 'http://192.168.3.7:8000',
// //    //baseURL: 'https://51.210.176.186',
// //    headers: {
// //      'Content-Type': 'multipart/form-data', //application/json',
// //      Authorization:
// //       'X-ApiKey c477888c7f9b89b89c24af26f0d9f0858f3a5eb42e5152a3c63dc68cfb891558',
// //    },
// //    apiClient.interceptors.reques.use((req) => { req.headers.authorization = `X-ApiKey c.........................................................'});
// //  })
// export const apiClientLogin = axios.create({
//   baseURL: 'https://localhost:44342',
//   //baseURL: 'http://192.168.3.7:8000',
//   //baseURL: 'https://51.210.176.186',
// })
