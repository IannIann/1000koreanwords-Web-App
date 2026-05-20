import apiAccess from '@app/data/httpService';

export default {
    login(username, password) {
        return apiAccess.PostJson('/auth/signin', { username, password });
    },
    register(username, email, password) {
        return apiAccess.PostJson('/auth/signup', { username, email, password });
    },
    confirmEmail(token) {
        return apiAccess.GetJson(`/auth/confirmemail/${token}`);
    },
    logout() {
        return apiAccess.PostJson('/auth/signout');
    },
    forgotPassword(email) {
        return apiAccess.PostJson('/auth/forgotpassword', { email });
    },
    checkAuthToken() {
        return apiAccess.GetJson('/auth/checkauthtoken');
    },
    validateResetToken(token) {
        return apiAccess.GetJson(`/auth/validateresettoken/${token}`);
    },
    resetPassword(token, password) {
        return apiAccess.PostJson(`/auth/resetpassword/${token}`, { password });
    },
};