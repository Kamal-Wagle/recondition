// axios instance
import axios from "axios";

const $axios = axios.create({
  baseURL: "https://recondition.vercel.app/"
  // timeout: 5000,
});


export default $axios;
