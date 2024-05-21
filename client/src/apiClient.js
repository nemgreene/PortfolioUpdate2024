import axios from "axios";
// const url = "http://localhost:5000/";

const url = "/";

export class ApiClient {
  async checkServer() {
    return await axios.get(`${url}checkServer`);
  }
}
