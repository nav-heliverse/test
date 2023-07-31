type Props = {};
// @ts-ignore
import { PieChart } from "@mui/x-charts/PieChart";

const Chart = (props: Props) => {
  const data2 = [
    { label: "A1", value: 100 },
    { label: "A2", value: 300 },
  ];

  const size = {
    width: 350,
    height: 200,
  };

  return (
    <div className="max-w-xs h-fit ">
      <PieChart
        series={[
          {
            data: data2,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -180,
            endAngle: 180,
          },
        ]}
        {...size}
      />
    </div>
  );
};

export default Chart;
