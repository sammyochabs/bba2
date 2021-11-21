import axios from "axios";

export const apiLogin = axios.create({
  // baseURL: 'http://localhost:64988',
  //baseURL: 'https://localhost:44342',
  //baseURL: 'http://192.168.3.7:8000',
  baseURL: "http://51.210.176.186:8000",
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  //   //'x-ApiKey': localStorage.getItem('keyAPP'),
  //   //'Access-Control-Allow-Origin': '*',
  // },
});
