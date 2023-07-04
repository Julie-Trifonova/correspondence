import axios, { CreateAxiosDefaults } from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000",
  validateStatus: (status) => {
    return true;
  },
} as CreateAxiosDefaults | undefined);

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}
