const BASE_URL = process.env.NODE_ENV === 'production'
    ? `${process.env.API_URL}/api/${process.env.API_VERSION}`
    : '/api';

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

function request(url, options) {
    return fetch(BASE_URL + url, {
        credentials: 'include',
        headers: defaultHeaders,
        ...options,
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return res.text().then((err) => { throw Error(err); });
    });
}

export default {
    PostJson(url, data) {
        return request(url, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    GetJson(url) {
        return request(url, {
            method: 'GET',
        });
    },
    DeleteJson(url, data) {
        return request(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
        });
    },
};