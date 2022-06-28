export interface FormSelectProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
  displayFn?: (value: string) => string;
}

export default function FormSelect(props: FormSelectProps) {
  const displayFn = props.displayFn
    ? props.displayFn
    : (value: string) => value;

  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor={props.label}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <select
        id={props.label}
        name={props.label}
        onChange={(v) => props.onChange(v.target.value)}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {props.options.map((option) => {
          return (
            <option key={option} value={option}>
              {displayFn(option)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
