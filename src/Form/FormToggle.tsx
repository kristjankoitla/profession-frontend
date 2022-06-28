export interface FormToggleProps {
  label: string;
  value: boolean;
  onChange: () => void;
}

export default function FormToggle(props: FormToggleProps) {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={props.label}
          name={props.label}
          checked={props.value}
          type="checkbox"
          onChange={props.onChange}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={props.label} className="font-medium text-gray-700">
          {props.label}
        </label>
      </div>
    </div>
  );
}
