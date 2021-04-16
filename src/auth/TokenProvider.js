export class TokenProvider {
    constructor(key) {
        this._key = key;
    }

    storeToken(token) {
        if (null === this._key) {
            throw new Error('Key is not provided');
        }

        if (null === token) {
            throw new Error('Token is not provided');
        }

        sessionStorage.setItem(this._key, token)
    }

    getToken() {
        return sessionStorage.getItem(this._key);
    }

    clearToken() {
        sessionStorage.removeItem(this._key);
    }
}

export const getTokenProvider = () => {
    const KEY = 'API_AUTH_TOKEN';
    return new TokenProvider(KEY);
}
