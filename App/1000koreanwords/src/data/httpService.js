function getAcessToken() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    return user.accessToken
  }
}

export default
  {
    PostJson(url, data) {
      return fetch('http://localhost:8000/api/v1' + url, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
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
      return fetch('http://localhost:8000/api/v1' + url, {
        method: 'GET',
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
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

    DeleteJson(url, data) {
      return fetch('http://localhost:8000/api/v1' + url, {
          method: 'DELETE',
          body: JSON.stringify(data),
          credentials: "include",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.text().then((err) => { throw Error(err) });
          }
        });
    }
  }

function CheckError(res) {
  if (res.status >= 200 && res.status <= 299) {
    return res;
  } else {
    throw Error(res.statusText);
  }
}