// import React from "react";
// import { PieChart } from "react-native-chart-kit";

// type PieChartProps = {
//   names: string[];
//   values: number[];
//   colors: string[];
//   height: number;
//   width: number;
// };

// const PieChartBreakdown = ({
//   names,
//   values,
//   colors,
//   height,
//   width,
// }: PieChartProps) => {
//   const data = names.map((name, index) => ({
//     name,
//     value: values[index],
//     color: colors[index],
//     legendFontColor: "#7F7F7F",
//     legendFontSize: 15,
//   }));

//   return (
//     <PieChart
//       data={data}
//       width={width}
//       height={height}
//       chartConfig={{
//         backgroundColor: "#ffffff",
//         backgroundGradientFrom: "#ffffff",
//         backgroundGradientTo: "#ffffff",
//         color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//       }}
//       accessor="value"
//       backgroundColor="transparent"
//       paddingLeft="45"
//       hasLegend={false}
//     />
//   );
// };

// export default PieChartBreakdown;
