import axios from "axios";

const API = "http://localhost:8080/api/user";

class AuthController {
  login() {
    return axios.post(API).then((res) => {
      if (res.status === 200 && res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthController();
