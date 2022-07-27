const apiKey = 'cb3eb68e-15d1-43e6-9f3d-7f56101373ae';

const fetchDataStates = () => {
  return fetch(
    `https://api.airvisual.com/v2/states?country=Indonesia&key=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => { return data })
    .catch((err) => { console.log(err) })
};

const fetchDataCityFromServer = (state) => {
  return fetch(
    `https://api.airvisual.com/v2/cities?state=${state}&country=Indonesia&key=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => { return data })
    .catch((err) => { console.log(err) })
}
export { fetchDataStates, fetchDataCityFromServer };
