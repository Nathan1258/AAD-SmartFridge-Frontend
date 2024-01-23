export const hasAccessPIN = async() => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === 'accessPIN') {
      try {
        const response = await fetch("https://aad-api.ellisn.com/v1/users/verifyAccessToken", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "accessPIN": cookieValue })
        });
        const data = await response.json();
        return data.code === 200;
      } catch (error) {
        console.error(error)
        return false;
      }
    }
  }
  return false;
}

export const getAccessPIN = () => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === 'accessPIN') {
      return cookieValue;
    }
  }
  return null;
};

