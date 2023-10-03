import axios from "axios";
import Cookies from "js-cookie";

const auth = {
  namespaced: true,
  state() {
    return {
      accessToken: null,
      tokenExpirationDate: null,
      userLogin: {},
      isLogin: false,
    };
  },
  mutations: {
    setToken(state, payload) {
      state.accessToken = payload.idToken;
      state.tokenExpirationDate = payload.expiresIn;
      Cookies.set("tokenExpr", payload.expiresIn);
      Cookies.set("jwt", payload.idToken);
    },
    setUserLogin(state, payload) {
      state.userLogin = payload.userData;
      state.isLogin = payload.loginStatus;
    },
  },
  actions: {
    // Ini untuk registrasi ke authentication di firebase
    async getRegData(context, payload) {
      const key = import.meta.env.VITE_API_KEY;
      const authURI = import.meta.env.VITE_AUTH_API;
      try {
        const { data } = await axios.post(authURI + key, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
        console.log(data);
        context.commit("setToken", {
          idToken: data.idToken,
          expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });
        // Setelah daftar, kita langsung update data user-nya berupa nama, username, dan foto
        const newUserData = {
          userId: data.localId,
          firstname: payload.firstname,
          lastname: payload.lastname,
          username: payload.username,
          email: payload.email,
          imageLink: payload.imageLink,
        };
        Cookies.set("UID", newUserData.userId);
        await context.dispatch("addNewUser", newUserData);
      } catch (error) {
        console.log(error);
      }
    },
    // Ini untuk bikin collection baru di firebase
    async addNewUser(context, payload) {
      try {
        await axios.post(import.meta.env.VITE_BASE_URI + `/users.json?auth=${context.state.accessToken}`, payload);
        context.commit("setUserLogin", { userData: payload, loginStatus: true });
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default auth;
