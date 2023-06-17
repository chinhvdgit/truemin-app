class TokenService {
  getLocalRefreshToken() {
      return localStorage.getItem("refreshToken");
  }

  updateLocalRefreshToken(token) {
      localStorage.setItem("refreshToken", token);
  }

  getLocalAccessToken() {
      return localStorage.getItem("accessToken");
  }

  // getLocalAccessToken() {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     return user?.accessToken;
  // }

  updateLocalAccessToken(token) {
      localStorage.setItem("accessToken", token);
  }

  // updateLocalAccessToken(token) {
  //     let user = JSON.parse(localStorage.getItem("user"));
  //     user.accessToken = token;
  //     localStorage.setItem("user", JSON.stringify(user));
  // }

  // getUser() {
  //     return JSON.parse(localStorage.getItem("user"));
  // }

  setUser(user) {
      console.log(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
      localStorage.removeItem("user");
  }
}

export default new TokenService();
