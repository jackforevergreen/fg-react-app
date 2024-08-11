import React from "react";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

type BarChartProps = {
  names: string[];
  values: number[];
  colors: string[];
};

const BarChartBreakdown = ({ names, values, colors }: BarChartProps) => {
  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: names,
    datasets: [
      {
        data: values,
        colors: values.map((value, index) => () => colors[index]),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(68, 148, 95, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 2,
  };

  return (
    <BarChart
      data={data}
      width={screenWidth - 96}
      height={220}
      chartConfig={chartConfig}
      fromZero
      showBarTops={false}
      yAxisLabel=""
      yAxisSuffix=""
      withCustomBarColorFromData={true}
      flatColor={true}
      style={{ marginLeft: -12}}
    />
  );
};

export default BarChartBreakdown;
