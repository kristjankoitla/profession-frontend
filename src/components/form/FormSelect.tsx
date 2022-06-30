import Select, { MultiValue } from "react-select";
import { FormatOptionLabelContext } from "react-select/dist/declarations/src/Select";

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
  const mappedValues = props.value
    .map((value) => props.options.find((option) => option.value === value))
    .filter((option) => !!option) as unknown as Option[];

  const displayFn = (value: Option, context: FormatOptionLabelContext) => {
    const option = props.options.find((option) => option.value === value.value);
    return context === "menu" ? option?.dropdownLabel : option?.inputLabel;
  };

  const onChange = (options: MultiValue<Option>) => {
    const values = options.map((option) => option.value);
    props.onChange(values);
  };

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
        value={mappedValues}
        options={props.options}
        onChange={onChange}
        formatOptionLabel={(value: any, { context }: any) =>
          displayFn(value, context)
        }
        className="sm:text-sm"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#4e46e5",
          },
        })}
      />
    </div>
  );
}
