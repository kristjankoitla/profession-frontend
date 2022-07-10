import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { getSectors, postWorker, putWorker } from "../api/Api";
import { Worker } from "../api/Model";
import { formatSectorsToOptions } from "../util/SectorFormat.util";
import Form from "./form/Form";
import FormSelect, { Option } from "./form/FormSelect";
import FormText from "./form/FormText";
import FormToggle from "./form/FormToggle";

export interface FormFields {
  name: string;
  terms: boolean;
  sectors: string[];
}

export interface WorkerFormProps {
  defaultValue?: Worker;
  onSave: (worker: Worker) => void;
}

export default function WorkerForm(props: WorkerFormProps) {
  const {register, handleSubmit, control, formState: { errors }} = useForm({
    defaultValues: {
      name: props.defaultValue?.name,
      terms: props.defaultValue?.agreeToTerms,
      sectors: props.defaultValue?.sectors?.map((sector) => sector.id),
    } as any,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  const submitOrEdit = (worker: Worker) => {
    return props.defaultValue
      ? putWorker(props.defaultValue.id!, worker).then(() => props.defaultValue?.id!)
      : postWorker(worker);
  };

  const onSubmit = (data: FieldValues) => {
    setLoading(true);
    
    const worker = {
      name: data.name,
      agreeToTerms: data.terms,
      sectors: data.sectors.map((sector: string) => ({ id: sector })),
    };

    submitOrEdit(worker).then((id) => {
      props.onSave({
        ...worker,
        id: id,
      });
    })
    .then(handleSuccess)
    .catch(handleFail);
  };

  const handleSuccess = () => {
    toast.success("Successfully " + (props.defaultValue ? "updated" : "submitted"), {autoClose: false});
    setLoading(false);
  }

  const handleFail = () => {
    toast.error("Failed to " + (props.defaultValue ? "update" : "submit"), {autoClose: false});
    setLoading(false);
  }

  useEffect(() => {
    getSectors().then((data) => setOptions(formatSectorsToOptions(data)));
  }, []);

  return (
    <Form
      title="Please enter your name and pick the Sectors you are currently involved in."
      submitLabel={props.defaultValue ? "Save changes" : "Submit"}
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
    >
      <FormText
        label="Name"
        name="name"
        register={register}
        registerOptions={{ required: true }}
        invalid={!!errors.name}
        errorText="Field is required"
      />
      <FormSelect label="Sectors" name="sectors" control={control} options={options}/>
      <FormToggle label="Agree to terms" name="terms" register={register} />
    </Form>
  );
}
