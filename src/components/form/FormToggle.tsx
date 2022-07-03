import { FieldValues, UseFormRegister } from "react-hook-form";

export interface FormToggleProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
}

export default function FormToggle(props: FormToggleProps) {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={props.name}
          type="checkbox"
          {...props.register(props.name)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={props.name} className="font-medium text-gray-700">
          {props.label}
        </label>
      </div>
    </div>
  );
}
