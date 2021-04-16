import {getClient} from "../client/Client";
import {getTokenProvider} from "../auth/TokenProvider";

class AuthService {
    async login(credentials) {
        const response = await getClient().login(credentials);
        getTokenProvider().storeToken(response.data.token)
    }
}

export const getAuthService = () => {
    return new AuthService();
};
