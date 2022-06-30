export interface FormTextProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function FormText(props: FormTextProps) {
  return (
    <div className="col-span-6 sm:col-span-4">
      <label
        htmlFor={props.label}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <input
        type="text"
        value={props.value}
        name={props.label}
        id={props.label}
        onChange={(v) => props.onChange(v.target.value)}
        placeholder={props.label + "..."}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  );
}
