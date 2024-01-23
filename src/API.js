import {getAccessPIN} from "./Utils";

export const clockIn = (userNumber, password) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/users/clock-in", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "uid": userNumber, "password": password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.code !== 200) return reject("Your user number or password is wrong. Please try again.");
      return resolve(data.data.accessPIN);
    })
    .catch(error => reject(error.message));
  });
};

export const getUserDetails = (accessPIN) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/users/details", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "accessPIN": getAccessPIN() })
  }).then(response => response.json())
  .then(data => {
    if(data.code !== 200) return reject("Your accessPIN is wrong or has expired. Please try again.");
    return resolve(data.data);
  }).catch(error => reject(error.message));
  });
}

export const verifyPIN = (accessPIN) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/users/verifyAccessToken", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "accessPIN": accessPIN })
    })
    .then(response => response.json())
    .then(data => {
      if (data.code !== 200) return reject("Your accessPIN is wrong or has expired. Please try again.");
      return resolve(accessPIN);
    })
    .catch(error => reject(error.message));
  });
};

export const getAllItems = () => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/items", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "accessPIN": getAccessPIN() })
    })
    .then(response => response.json())
    .then(data => {
      if (data.code != 200)  return reject("Could not get items")
      return resolve(data.data);
    })
    .catch(error => reject(error.message));
  });
};