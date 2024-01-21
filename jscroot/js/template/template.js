

export let URLPost = `https://asia-southeast2-gis-project-401902.cloudfunctions.net/RegisterUser`
export let URLLogin = `https://asia-southeast2-gis-project-401902.cloudfunctions.net/loginotp`
export let token = 'token';
export function getTokenFromCookies(cookieName) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  }
  