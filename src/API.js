import { getAccessPIN } from "./Utils";

export const clockIn = (userNumber, password) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/users/clock-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: userNumber, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200)
          return reject(
            "Your user number or password is wrong. Please try again.",
          );
        return resolve(data.data.accessPIN);
      })
      .catch((error) => reject(error.message));
  });
};

export const getUserDetails = (accessPIN) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/users/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: getAccessPIN() }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200)
          return reject(
            "Your accessPIN is wrong or has expired. Please try again.",
          );
        return resolve(data.data);
      })
      .catch((error) => reject(error.message));
  });
};

export const getExpiringProducts = () => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/items/expiring", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: getAccessPIN() }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code != 200) return reject("Could not get items");
        return resolve(data.data);
      })
      .catch((error) => reject(error.message));
  });
};

export const addItemToOrder = (products) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/delivery/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessPIN: getAccessPIN(),
        products: products,
        endpoint: " on expiry page",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200)
          return reject(
            "Your accessPIN is wrong or has expired. Please try again.",
          );
        return resolve(data);
      })
      .catch((error) => reject(error.message));
  });
};

export const removeItemFromOrder = (product) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/delivery/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessPIN: getAccessPIN(),
        productID: product.productID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200) return reject(data.message);
        return resolve(data);
      })
      .catch((error) => reject(error.message));
  });
};

export const editItemFromOrder = (product, newQuantity) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/delivery/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessPIN: getAccessPIN(),
        productID: product.productID,
        quantity: newQuantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200) return reject(data.message);
        return resolve(data);
      })
      .catch((error) => reject(error.message));
  });
};

export const getAllOrderedProducts = () => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/delivery/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: getAccessPIN() }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200)
          return reject(
            "Your accessPIN is wrong or has expired. Please try again.",
          );
        return resolve(data);
      })
      .catch((error) => reject(error.message));
  });
};

export const getAllItemsInDelivery = (orderID) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/delivery/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: getAccessPIN(), orderID: orderID }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200)
          return reject(
            "Your accessPIN is wrong or has expired. Please try again.",
          );
        return resolve(data);
      })
      .catch((error) => reject(error.message));
  });
};

export const finaliseDelivery = (orderID) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/delivery/finalise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: getAccessPIN(), orderID: orderID }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200) {
          console.log(data);
          return reject(
            "Your accessPIN is wrong or has expired. Please try again.",
          );
        }

        return resolve(data);
      })
      .catch((error) => reject(error.message));
  });
};

export const getDeliveryOrderItems = (accessCode, orderID) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/delivery/final-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: accessCode, orderID: orderID }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200)
          return reject(
            "Your accessPIN is wrong or has expired. Please try again.",
          );
        return resolve(data);
      })
      .catch((error) => reject(error.message));
  });
};

export const markAsDelivered = (
  accessPIN,
  deliveryID,
  orderID,
  deliveredItems,
  undeliveredItems,
  deliveryNotes,
) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/delivery/delivered", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessPIN: accessPIN,
        orderID: orderID,
        deliveryID: deliveryID,
        deliveredItems: deliveredItems,
        undeliveredItems: undeliveredItems,
        deliveryNotes: deliveryNotes,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200)
          return reject(
            "Your accessPIN is wrong or has expired. Please try again.",
          );
        return resolve(data);
      })
      .catch((error) => reject(error.message));
  });
};

export const verifyPIN = (accessPIN) => {
  return new Promise((resolve, reject) => {
    return fetch("https://aad-api.ellisn.com/v1/users/verifyAccessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: accessPIN }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200) {
          return verifyDeliveryPIN(accessPIN)
            .then((deliveryData) => {
              console.log(deliveryData);
              return resolve(deliveryData);
            })
            .catch((error) => {
              return reject(
                "Your accessPIN is wrong or has expired. Please try again.",
              );
            });
        }
        return resolve(accessPIN);
      })
      .catch((error) => reject(error.message));
  });
};

export const getDeliveries = () => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/delivery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: getAccessPIN() }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code !== 200) return reject("Could not get deliveries");
        return resolve(data);
      })
      .catch((error) => reject(error.message));
  });
};

export const verifyDeliveryPIN = (accessPIN) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/delivery/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: accessPIN }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code != 200) return reject("Could not get delivery");
        return resolve(data);
      })
      .catch((error) => reject(error.message));
  });
};

export const getAllItems = () => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: getAccessPIN() }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code != 200) return reject("Could not get items");
        return resolve(data.data);
      })
      .catch((error) => reject(error.message));
  });
};

export const getAllItemsInStock = () => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/items?instock=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: getAccessPIN() }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code != 200) return reject("Could not get items");
        return resolve(data.data);
      })
      .catch((error) => reject(error.message));
  });
};

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/users/getallusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessPIN: getAccessPIN() }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code != 200) return reject("Could not get items");
        return resolve(data.data);
      })
      .catch((error) => reject(error.message));
  });
};

export const changeUserAccess = (uid, access) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/users/change-user-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessPIN: getAccessPIN(),
        uid: uid,
        newAccessValue: access,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code != 200) return reject("Could not update user's access");
        return resolve(data.data);
      })
      .catch((error) => reject(error.message));
  });
};

export const registerUser = (first_name, last_name, password, access) => {
  return new Promise((resolve, reject) => {
    fetch("https://aad-api.ellisn.com/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        password: password,
        access: access,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code != 200) return reject("Could not register user");
        return resolve(data.data);
      })
      .catch((error) => reject(error.message));
  });
};
