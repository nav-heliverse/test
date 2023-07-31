"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Slider,
  TextField,
  Input,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import * as Yup from "yup";
import Chart from "./Chart";
import CustomInput from "./CustomInput";
import Table from "@/Components/Table";

const Calculator = () => {
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [sip, setSIP] = useState(true);

  const validationSchema = Yup.object().shape({
    paymentFrequency: Yup.string().required(" Payment type is required"),

    investment: Yup.number()
      .min(1, "Minimum investment must be ₹500")
      .max(100000, "Maximun investment can be ₹100000")
      .required("Time Period is required"),

    rate: Yup.number()
      .min(1, "Minimum retrun is 1%")
      .max(40, "Maximun return can be 40%")
      .required("Time Period is required"),
    time: Yup.number()
      .min(1, "Minimum time is 1 year")
      .max(40, "Max can be 40 years")
      .required("Time Period is required"),
  });

  const methods = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = methods;

  const values = watch();
  console.log("🚀 ~ file: Calculator.tsx:47 ~ Calculator ~ errors:", errors);

  const performCalculation = (values: any) => {
    const interestRate = parseFloat(values.rate) / 100;
    let totalInvestment = parseFloat(values.investment);
    const investmentYears = parseFloat(values.time);
    const annualStepUpPercentage = parseFloat(values.stepup) / 100;

    let currentYear = 1;
    while (currentYear <= investmentYears) {
      totalInvestment *= 1 + annualStepUpPercentage;

      if (values.paymentFrequency === "monthly") {
        totalInvestment *= 12;
      } else if (values.paymentFrequency === "quarterly") {
        totalInvestment *= 4;
      }

      currentYear++;
    }

    const maturityValue =
      totalInvestment * (1 + interestRate * investmentYears);

    console.log(maturityValue);
    return maturityValue.toFixed(2);
  };

  const initialValues = {
    paymentFrequency: "monthly",
    principal: 10000,
    investment: 25000,
    stepup: 10,
    rate: 12,
    time: 10,
  };

  useEffect(() => {
    console.log(values);
    // setMaturityAmount(performCalculation(initialValues));
  }, [initialValues]);

  return (
    <div className="flex space-x-8 ">
      <div className=" border border-solid-gray-500 p-8 rounded w-full  shadow items-center justify-between lg:items-start  flex flex-col space-y-8 lg:flex-row space-x-4">
        <div className=" w-full lg:w-1/2 ">
          <div className="flex space-x-4 pb-4 pt-2 items-center">
            <button
              className={`  ${
                sip && "bg-blue-50"
              } text-right rounded-md px-2 py-1   text-blue-700 font-medium`}
              onClick={() => setSIP(true)}
            >
              SIP
            </button>
            <button
              className={`  ${
                !sip && "bg-blue-50"
              } text-right rounded-md px-2 py-1   text-blue-700 font-medium`}
              onClick={() => setSIP(false)}
            >
              Lumpsum
            </button>
          </div>

          <FormProvider {...methods}>
            <form>
              {sip && (
                <div className="flex justify-between items-center py-2 ">
                  <label htmlFor="paymentFrequency">Payment Frequency</label>
                  <Controller
                    name={"paymentFrequency"}
                    control={control}
                    defaultValue={initialValues.paymentFrequency}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl>
                        <Select
                          {...field}
                          id="paymentFrequency"
                          sx={{
                            boxShadow: "none",
                            ".MuiOutlinedInput-notchedOutline": { border: 0 },
                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                              {
                                border: 0,
                              },
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                              {
                                border: 0,
                              },
                          }}
                          className="bg-blue-50 text-right rounded h-12 w-32 text-blue-700 font-medium"
                        >
                          <MenuItem value="monthly">Monthly</MenuItem>
                          <MenuItem value="quarterly">Quarterly</MenuItem>
                          <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
              )}

              <CustomInput
                name="investment"
                defaultValue={initialValues.investment}
                setValue={setValue}
                label="Investment"
                min={500}
                max={100000}
                step={500}
                startAdornment={"₹"}
                endAdornment={""}
                error={errors?.investment}
              />

              {sip && (
                <CustomInput
                  name="stepup"
                  defaultValue={initialValues.stepup}
                  setValue={setValue}
                  label="Annual Step Up"
                  min={0}
                  max={50}
                  step={0.1}
                  startAdornment={""}
                  endAdornment={"%"}
                />
              )}

              <CustomInput
                name="rate"
                defaultValue={initialValues.rate}
                setValue={setValue}
                label="Expected return rate (p.a)"
                min={1}
                max={40}
                step={1}
                startAdornment={""}
                endAdornment={"%"}
              />

              <CustomInput
                name="time"
                defaultValue={initialValues.time}
                setValue={setValue}
                label="Time Period"
                min={1}
                max={40}
                step={1}
                startAdornment={""}
                endAdornment={"Yr"}
                error={errors?.time}
              />
            </form>
          </FormProvider>
          <div className="pt-6">
            <div className="flex justify-between items-center pt-3">
              <p className="text-sm text-[#7c7e8c] font-normal ">
                {" "}
                Invested Amount
              </p>
              <p className="text-base text-[#000] font-medium ">
                {" "}
                ₹4,75,19,429
              </p>
            </div>

            <div className="flex justify-between items-center pt-3">
              <p className="text-sm text-[#7c7e8c] font-normal ">
                {" "}
                Est. returns
              </p>
              <p className="text-base text-[#000] font-medium ">
                {" "}
                ₹4,75,19,429
              </p>
            </div>
            <div className="flex justify-between items-center pt-3">
              <p className="text-sm text-[#7c7e8c] font-normal ">
                {" "}
                Total value
              </p>
              <p className="text-base text-[#000] font-medium ">
                {" "}
                ₹4,75,19,429
              </p>
            </div>
          </div>
        </div>
        <div className="flex  flex-col items-center gap-10">
          <Chart />
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
