import a from "axios";

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

export default a.create({
  //creates an instance of axios.
  baseURL: API_URL,
});
