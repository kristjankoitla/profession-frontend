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
  id?: string;
  name: string;
  agreeToTerms: boolean;
  sectors?: Partial<Sector>[];
}

export interface WorkerFormProps {
  defaultValue?: Worker;
  onSave: (worker: Worker) => void;
}

export default function WorkerForm(props: WorkerFormProps) {
  const [sectors, setSectors] = useState<Sector[]>([]);

  const defaultSelectedSectors: string[] =
    props.defaultValue?.sectors?.map((s) => s.id ?? "") ?? [];

  const [name, setName] = useState<string>(props?.defaultValue?.name ?? "");
  const [selectedSectors, setSelectedSectors] = useState<string[]>(
    defaultSelectedSectors
  );
  const [terms, setTerms] = useState(
    props?.defaultValue?.agreeToTerms ?? false
  );

  const postWorker = (worker: Worker) => {
    return axios.post<string>("workers", worker).then((d) => d.data);
  };

  const putWorker = (id: string, worker: Worker) => {
    return axios.put(`workers/${id}`, worker);
  };

  const getSectors = () => {
    return axios.get<Sector[]>("sectors").then((r) => r.data);
  };

  const handleSubmit = () => {
    const worker = {
      name: name,
      agreeToTerms: terms,
      sectors: selectedSectors.map((sector) => ({ id: sector })),
    };

    if (props.defaultValue) {
      putWorker(props.defaultValue.id!, worker).then(() => {
        props.onSave({
          ...worker,
          id: props.defaultValue!.id,
        });
      });
    }

    if (!props.defaultValue) {
      postWorker(worker).then((id) => {
        props.onSave({
          ...worker,
          id: id,
        });
      });
    }
  };

  useEffect(() => {
    getSectors().then((data) => setSectors(data));
  }, []);

  const options = format(sectors);

  return (
    <Form
      onSubmit={handleSubmit}
      submitLabel="Submit"
      title="Please enter your name and pick the Sectors you are currently involved in."
    >
      <FormText label="Name" onChange={setName} value={name} />
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
