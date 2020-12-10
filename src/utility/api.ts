import Axios from "axios";

const BASE_URL = 'https://disease.sh/v3/covid-19/';

export async function get<T = any>(url: string) {
  const response = await Axios.get<T>(BASE_URL + url);
  return response.data;
}