import { Controller, set, useFormContext } from "react-hook-form";
import { Slider, Input, FormHelperText, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type Props = {};

const CustomInput = ({
  name,
  defaultValue,
  setValue,
  label,
  min,
  max,
  step,
  endAdornment,
  startAdornment,
  error,
}: any) => {
  const { control } = useFormContext();

  const [inputValue, setInputValue] = useState<number>(defaultValue);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValue(Number(e.target.value));
    if (e.target.value > max) {
      setValue(name, Number(max));
    } else if (e.target.value < min) {
      setValue(name, Number(min));
    } else {
      setValue(name, Number(e.target.value));
    }
  };

  return (
    <div className="py-2 ">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className="">
            <div className="flex justify-between items-center ">
              <label htmlFor={name}>{label}</label>

              <div className="bg-blue-50 text-right rounded px-2 py-1  flex w-32  text-blue-700 font-medium">
                <span>{startAdornment}</span>

                <input
                  {...field}
                  step={1}
                  value={inputValue}
                  onChange={handleChange}
                  type="number"
                  className="w-full border-none outline-none bg-transparent text-right pr-0"
                />
                <span>{endAdornment}</span>
              </div>
            </div>
            {inputValue < min && (
              <FormHelperText className="text-right" error>
                Minimum value is {min}
              </FormHelperText>
            )}
            <Slider
              {...field}
              value={inputValue}
              onChange={(event: any, value) => handleChange(event)}
              min={min}
              max={max}
              step={step}
              className="pt-8"
              slotProps={{
                thumb: {
                  className:
                    "ring-blue-500   w-6 h-6 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute",
                },
                root: {
                  className: "w-full relative inline-block h-2",
                },
                rail: {
                  className:
                    "bg-gray-200  h-1.5 w-full rounded-full block absolute",
                },
                track: {
                  className:
                    "bg-blue-500  h-1.5 absolute rounded-full border-0",
                },
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default CustomInput;
