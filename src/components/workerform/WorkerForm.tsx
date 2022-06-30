import { useEffect, useState } from "react";
import { getSectors, postWorker, putWorker } from "../../api/Api";
import { Worker } from "../../api/Model";
import Form from "../form/Form";
import FormSelect from "../form/FormSelect";
import FormText from "../form/FormText";
import FormToggle from "../form/FormToggle";
import { format } from "./Util";

export interface WorkerFormProps {
  defaultValue?: Worker;
  onSave: (worker: Worker) => void;
}

export default function WorkerForm(props: WorkerFormProps) {
  const [options, setOptions] = useState<any[]>([]);

  const [name, setName] = useState(props.defaultValue?.name ?? "");
  const [selectedSectors, setSelectedSectors] = useState(
    props.defaultValue?.sectors?.map((sector) => sector.id!) ?? []
  );
  const [terms, setTerms] = useState(!!props.defaultValue?.agreeToTerms);

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
    getSectors().then((data) => setOptions(format(data)));
  }, []);

  return (
    <Form
      onSubmit={handleSubmit}
      submitLabel={props.defaultValue ? "Save changes" : "Submit"}
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
