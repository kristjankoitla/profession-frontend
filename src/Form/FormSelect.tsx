import Select from "react-select";

export interface Option {
  value: string;
  dropdownLabel: string;
  inputLabel: string;
}

export interface FormSelectProps {
  label: string;
  options: Option[];
  value: string[];
  onChange: (option: string[]) => void;
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
        isSearchable={false}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}

        value={props.value.map(v => props.options.find(o => o.value === v))}
        options={props.options}
        onChange={(o) => props.onChange(o.map(v => v?.value ?? ""))}
        formatOptionLabel={(value, { context }) => {
          const option = props.options.find(o => o.value === value?.value);
          return context === "menu" ? option!.dropdownLabel : option!.inputLabel;
        }}

        className="sm:text-sm"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#4e46e5"
          }
        })}
      />
    </div>
  );
}
