import axios from "axios";
import axiosRetry from "axios-retry";


export const pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  params: {
    limit: 6
  }
});

axiosRetry(pokeAPI, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
});