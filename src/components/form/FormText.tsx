import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

export interface FormTextProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  registerOptions: RegisterOptions;
  invalid?: boolean;
  errorText?: string;
}

export default function FormText(props: FormTextProps) {
  const error = (
    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
      {props.errorText ?? "Invalid"}
    </span>
  );

  return (
    <div className="col-span-6 sm:col-span-4">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <input
        type="text"
        id={props.name}
        placeholder={props.label + "..."}
        {...props.register(props.name, props.registerOptions)}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
      {props.invalid && error}
    </div>
  );
}
