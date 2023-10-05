import { store } from "../store/store";
import Cookies from "js-cookie";
export const attempObject = {
  checkAuth() {
    const jwtCookies = Cookies.get("accessToken");
    const expirationDate = Cookies.get("tokenExpirationDate");
    const userId = Cookies.get("UID");
    // store.dispatch("recipe/getRecipesData");
    if (jwtCookies) {
      if (new Date().getTime() < expirationDate) {
        store.commit("auth/setToken", { idToken: jwtCookies, expiresIn: expirationDate });
        store.dispatch("auth/getUser", userId);
        return;
      } else {
        store.commit("auth/clearLoginData");
        return;
      }
    } else {
      return;
    }
  },
};
