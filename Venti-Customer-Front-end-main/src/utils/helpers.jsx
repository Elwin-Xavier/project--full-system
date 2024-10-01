import secureLocalStorage from "react-secure-storage";

export function setUserDetails(user) {
  if (user && Object.keys(user).length > 0) {
    secureLocalStorage.setItem("user", JSON.stringify(user));
  } else {
    secureLocalStorage.removeItem("user");
  }
}

export function getXpermissions() {
  return JSON.parse(secureLocalStorage.getItem("permissions"));
}

export function getUserDetails() {
  const userString = secureLocalStorage.getItem("user");
  if (!userString) return null;
  try {
    const user = JSON.parse(userString);
    return user;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}

export function setToken(token) {
  secureLocalStorage.setItem("token", JSON.stringify(token));
}

export function getToken() {
  return JSON.parse(secureLocalStorage.getItem("token"));
}
export function logout() {
  secureLocalStorage.removeItem("user");
  secureLocalStorage.removeItem("token");
  secureLocalStorage.removeItem("permissions");
  window.location.href = '/'
}
