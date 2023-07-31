import React from "react";

type Props = {};

const Table = (props: Props) => {
  return (
    <div className="mt-4 ">
      <table className="border-collapse border border-slate-500 p-2 table-fixed">
        <caption className="caption-top">
          Projected Returns for varios time duration [@13%]
        </caption>
        <thead>
          <tr>
            <th className="border border-slate-600 p-3 px-6 ">Duration</th>
            <th className="border border-slate-600 p-3 px-6 ">Amount</th>
            <th className="border border-slate-600 p-3  px-6">Future Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-700 p-3 px-6 ">10yr</td>
            <td className="border border-slate-700 p-3 px-6 ">10000</td>
            <td className="border border-slate-700 p-3 px-6">10000</td>
          </tr>
          <tr>
            <td className="border border-slate-700 p-3 px-6 ">10yr</td>
            <td className="border border-slate-700 p-3 px-6 ">10000</td>
            <td className="border border-slate-700 p-3 px-6">10000</td>
          </tr>{" "}
          <tr>
            <td className="border border-slate-700 p-3 px-6 ">10yr</td>
            <td className="border border-slate-700 p-3 px-6 ">10000</td>
            <td className="border border-slate-700 p-3 px-6">10000</td>
          </tr>{" "}
          <tr>
            <td className="border border-slate-700 p-3 px-6 ">10yr</td>
            <td className="border border-slate-700 p-3 px-6 ">10000</td>
            <td className="border border-slate-700 p-3 px-6">10000</td>
          </tr>{" "}
          <tr>
            <td className="border border-slate-700 p-3 px-6 ">10yr</td>
            <td className="border border-slate-700 p-3 px-6 ">10000</td>
            <td className="border border-slate-700 p-3 px-6">10000</td>
          </tr>{" "}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
