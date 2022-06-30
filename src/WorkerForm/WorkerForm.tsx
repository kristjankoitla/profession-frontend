import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../Form/Form";
import FormSelect from "../Form/FormSelect";
import FormText from "../Form/FormText";
import FormToggle from "../Form/FormToggle";
import { format } from "./Util";

export interface Sector {
  id: string;
  name: string;
  parentSectorId?: string;
}

export interface Worker {
  name: string;
  agreeToTerms: boolean;
  sectors?: Partial<Sector>[];
}

export default function WorkerForm() {
  const [sectors, setSectors] = useState<Sector[]>([]);

  const [name, setName] = useState<string>("");
  const [selectedSectors, setSelectedSectors] = useState<any[]>([]);
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

  const handleSubmit = () => {
    postWorker({
      name: name,
      agreeToTerms: terms,
      sectors: selectedSectors.map((sector) => ({ id: sector.value })),
    });
  };

  useEffect(() => {
    getSectors().then((data) => setSectors(data));
  }, []);

  const options = format(sectors);

  return (
    <Form
      onSubmit={handleSubmit}
      submitLabel="Submit"
      title=" Please enter your name and pick the Sectors you are currently involved in."
    >
      <FormText label="Name" onChange={setName} />
      <FormSelect
        label="Sector"
        onChange={setSelectedSectors}
        options={options}
        value={selectedSectors}
      />
      <FormToggle
        label="Agree to terms"
        value={terms}
        onChange={() => setTerms(!terms)}
      />
    </Form>
  );
}
