import Axios from "axios";

const BASE_URL = 'https://disease.sh/v3/covid-19/';

export async function get<T = any>(url: string) {
  return await Axios.get<T>(BASE_URL + url);
}