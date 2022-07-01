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
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<any[]>([]);

  const [nameError, setNameError] = useState(false);
  const [name, setName] = useState(props.defaultValue?.name ?? "");
  const [selectedSectors, setSelectedSectors] = useState(
    props.defaultValue?.sectors?.map((sector) => sector.id!) ?? []
  );
  const [terms, setTerms] = useState(!!props.defaultValue?.agreeToTerms);

  const handleNameChange = (value: string) => {
    setName(value);
    setNameError(!value);
  };

  const submitOrEdit = (worker: Worker) => {
    return props.defaultValue
      ? putWorker(props.defaultValue.id!, worker).then(() => props.defaultValue?.id!)
      : postWorker(worker);
  };

  const handleSubmit = () => {
    const formValid = !!name;

    if (!formValid) {
      setNameError(true);
      return;
    }

    setLoading(true);

    const worker = {
      name: name,
      agreeToTerms: terms,
      sectors: selectedSectors.map((sector) => ({ id: sector })),
    };

    submitOrEdit(worker).then((id) => {
      props.onSave({
        ...worker,
        id: id
      })
      setLoading(false);
    })
  };

  useEffect(() => {
    getSectors().then((data) => setOptions(format(data)));
  }, []);

  return (
    <Form
      onSubmit={handleSubmit}
      submitLabel={props.defaultValue ? "Save changes" : "Submit"}
      loading={loading}
      title="Please enter your name and pick the Sectors you are currently involved in."
    >
      <FormText
        label="Name"
        onChange={handleNameChange}
        value={name}
        errorText="Field is required"
        invalid={nameError}
      />
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
