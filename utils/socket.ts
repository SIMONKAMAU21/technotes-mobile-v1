import { io } from "socket.io-client";
import { BASE_API_V1_ENDPOINT, BASE_API_V1_ENDPOINT_TEST } from "./constants/sessions";
import { getUserToken } from ".";
console.log('first',  BASE_API_V1_ENDPOINT)

export const API = BASE_API_V1_ENDPOINT;
const LOCAL_BASE = API.replace(`/api`, "");
export const socket = io(LOCAL_BASE, {
  retries: 3,

  ackTimeout: 10000,
  auth: getUserToken(),
});
export const Onlinee = socket.on("connect", () => {
   return console.log('connected')
});
export const Offline = socket.on("disconnect", () => {
//   ErrorToast("offline");
return console.log("offline")
});
