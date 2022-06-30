import axios from "axios";
import { Sector, Worker } from "./Model";

export const postWorker = (worker: Worker) => {
  return axios.post<string>("workers", worker).then((d) => d.data);
};

export const putWorker = (id: string, worker: Worker) => {
  return axios.put(`workers/${id}`, worker);
};

export const getSectors = () => {
  return axios.get<Sector[]>("sectors").then((r) => r.data);
};
