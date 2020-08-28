import AuthController from "../services/auth.service";

const user = JSON.parse(localStorage.getItem);
const initState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initState,
    actions: {
        login({ commit }, user) {
            return AuthController.login().then(
                
            )
        }
    }
}