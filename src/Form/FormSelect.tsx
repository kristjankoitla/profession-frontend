import Select from "react-select";

export interface FormSelectProps {
  label: string;
  options: any;
  value: any[];
  onChange: (option: any) => void;
}

export default function FormSelect(props: FormSelectProps) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor={props.label}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <Select
        isMulti={true}
        value={props.value}
        options={props.options}
        onChange={props.onChange}
        formatOptionLabel={(option, { context }) => {
          return context === "menu" ? option.dropdownLabel : option.inputLabel;
        }}
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        isSearchable={false}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#4e46e5"
          }
        })}
        className="focus:ring-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  );
}
