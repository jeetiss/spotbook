/* istanbul ignore file */

const BASE_URL = process.env.REACT_APP_FIREBASE_URL;

if (!BASE_URL) {
  console.error(
    "REACT_APP_FIREBASE_URL (environment variable) has not been set!"
  );
}

export let SPOTS_URL = BASE_URL + "/groups/master.json";

if (window.Cypress) {
  console.warn(
    "We're on the test server now. Changes won't be reflected on the master!"
  );
  SPOTS_URL = BASE_URL + "/groups/tests.json";
}

const handleErrors = res => {
  if (!res.ok) {
    return res.json().then(error => {
      throw error;
    });
  }

  return res;
};

export const getSpots = () => {
  return fetch(SPOTS_URL)
    .then(res => res.json())
    .then(res => {
      if (res) {
        return Object.keys(res).map(id => ({ id, ...res[id] }));
      } else {
        return [];
      }
    });
};

export const createSpot = spot => {
  return fetch(SPOTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot)
  })
    .then(handleErrors)
    .then(res => res.json());
};
