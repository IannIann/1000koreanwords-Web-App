//const urlLocation = 'http://127.0.0.1:8000/api/v1/';

const host = process.env.API_HOST
const port = process.env.API_PORT
const endpoint = process.env.API_ENDPOINT
const urlLocation = `http://${host}:${port}/${endpoint}`;


function getAcessToken() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    return user.accessToken
  }
}

export default
  {
    PostJson(url, data) {
      return fetch(urlLocation + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getAcessToken()
        }
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.text().then((err) => { throw Error(err) });
          }
        });
    },

    GetJson(url) {
      return fetch(urlLocation + url, { method: 'GET' })
        .then(CheckError)
        .then((res) => res.json());
    },

    DeleteJson(url) {
      return fetch(urlLocation + url, { method: 'DELETE' })
        .then((res) => res.json());
    },

    PutJson(url) {
      return fetch(urlLocation + url, { method: 'PUT', headers: authHeaders })
        .then((res) => res.json());
    }
  }

function CheckError(res) {
  if (res.status >= 200 && res.status <= 299) {
    return res;
  } else {
    throw Error(res.statusText);
  }
}