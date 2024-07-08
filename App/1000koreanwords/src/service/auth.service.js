import apiAccess from "../data/httpService";

export default {
    login(username, password) {
        return apiAccess.PostJson(`auth/signin`, { username, password })
        .then((res) => {
            if (res.token) {
              localStorage.setItem("user", JSON.stringify(res));
            }
            return res;
          })
    },
    register(username, email, password) {
        return apiAccess.PostJson(`auth/signup`, { username, email, password })
    },
    logout() {
        localStorage.removeItem("user");
    },
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    },
    checkPremium()
    {
        return apiAccess.GetJson(`user/premium`);
    }
}