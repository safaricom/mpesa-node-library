import axios, { AxiosInstance } from 'axios';
import Mpesa from '../';
export async function request(
  mpesa: Mpesa,
  _baseURL?: string
): Promise<AxiosInstance> {
  const credentials = await mpesa.oAuth();
  const instance = axios.create({
    baseURL: _baseURL || mpesa.baseURL,
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + credentials.data['access_token'],
      'Content-Type': 'application/json',
    },
  });
  return instance;
}
