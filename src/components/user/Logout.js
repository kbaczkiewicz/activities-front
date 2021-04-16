import React from 'react';
import {getTokenProvider} from "../../auth/TokenProvider";

const useOnLogoutAction = () => {
    const tokenProvider = getTokenProvider();
    tokenProvider.clearToken();
};

export const Logout = () => {
    useOnLogoutAction();
    window.location.href = "/";

    return null;
};
