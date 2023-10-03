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
      Cookies.set("tokenExpirationDate", payload.expiresIn);
      Cookies.set("accessToken", payload.idToken);
    },
    setUserLogin(state, payload) {
      state.userLogin = payload.userData;
      state.isLogin = payload.loginStatus;
    },
    clearLoginData(state, payload) {
      state.accessToken = null;
      state.userLogin = {};
      state.isLogin = false;
      state.tokenExpirationDate = null;
      Cookies.remove("accessToken");
      Cookies.remove("tokenExpirationDate");
      Cookies.remove("UID");
    },
  },
  actions: {
    // Ini untuk registrasi ke authentication di firebase
    async getRegData(context, payload) {
      const key = import.meta.env.VITE_API_KEY;
      const authURI = import.meta.env.VITE_REG_API;
      try {
        const { data } = await axios.post(authURI + key, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
        // console.log(data);
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
        throw new Error(error.response.data.error.message);
      }
    },
    // Ini untuk bikin field baru di firebase
    async addNewUser(context, payload) {
      try {
        await axios.post(import.meta.env.VITE_BASE_URI + `/users.json?auth=${context.state.accessToken}`, payload);
        context.commit("setUserLogin", { userData: payload, loginStatus: true });
      } catch (error) {
        console.log(error);
      }
    },
    // Login
    async getLoginData(context, payload) {
      const key = import.meta.env.VITE_API_KEY;
      const authURI = import.meta.env.VITE_LOG_API;
      try {
        const { data } = await axios.post(authURI + key, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        });
        // console.log(data);
        context.commit("setToken", {
          idToken: data.idToken,
          expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
        });
        await context.dispatch("getUser", data.localId);
      } catch (error) {
        throw new Error(error.response.data.error.message);
      }
    },
    // Ambil user
    async getUser(context, payload) {
      try {
        const { data } = await axios.get(import.meta.env.VITE_BASE_URI + `/users.json`);
        for (let key in data) {
          if (data[key].userId === payload) {
            context.commit("setUserLogin", { userData: data[key], loginStatus: true });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default auth;
