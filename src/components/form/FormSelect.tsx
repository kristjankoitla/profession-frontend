import { Control, Controller, FieldValues } from "react-hook-form";

import Select from "react-select";
import { FormatOptionLabelContext } from "react-select/dist/declarations/src/Select";

export interface Option {
  value: string;
  dropdownLabel: string;
  inputLabel: string;
}

export interface FormSelectProps {
  label: string;
  name: string;
  control: Control<FieldValues, object>;
  options: Option[];
}

export default function FormSelect(props: FormSelectProps) {
  const displayFn = (value: Option, context: FormatOptionLabelContext) => {
    const option = props.options.find((option) => option.value === value.value);
    return context === "menu" ? option?.dropdownLabel : option?.inputLabel;
  };

  return (
    <div className="col-span-6 sm:col-span-4">
      <label className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field: { value, onChange } }) => {
          return (
            <Select
              isMulti={true}
              isSearchable={false}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              menuPosition="fixed"
  
              options={props.options}
              value={props.options.filter((option: any) =>
                value?.includes(option.value)
              )}

              onChange={(options) =>
                onChange(options?.map((option) => option.value))
              }
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
          );
        }}
      />
    </div>
  );
}
