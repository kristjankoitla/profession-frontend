import axios from "axios";
import { useEffect, useState } from "react";

export interface Sector {
  id: string;
  name: string;
  parentSectorId?: string;
}

export interface Worker {
  name: string;
  agreeToTerms: boolean;
  sectorId?: string;
}

export default function WorkerForm() {
  const [sectors, setSectors] = useState<Sector[]>([]);

  const [name, setName] = useState<string>(""); // todo: won't need after validation
  const [sectorId, setSectorId] = useState<string>();
  const [terms, setTerms] = useState(false);

  const postWorker = (worker: Worker) => {
    return axios
      .post<string>("http://localhost:8080/workers", worker)
      .then((d) => d.data);
  };

  const getSectors = () => {
    return axios
      .get<Sector[]>("http://localhost:8080/sectors")
      .then((r) => r.data);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    postWorker({
      name: name,
      agreeToTerms: terms,
      sectorId: sectorId,
    });
  };

  useEffect(() => {
    getSectors().then((data) => setSectors(data));
  }, []);

  return (
    <div>
      Please enter your name and pick the Sectors you are currently involved in.
      <form onSubmit={handleSubmit}>
        Name:
        <textarea value={name} onChange={(v) => setName(v.target.value)} />
        <br />
        <br />
        Sectors:
        <select value={sectorId} onChange={(v) => setSectorId(v.target.value)}>
          <option value="">None</option>
          {sectors.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <input
          type="checkbox"
          checked={terms}
          onChange={() => setTerms(!terms)}
        />
        Agree to terms
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
