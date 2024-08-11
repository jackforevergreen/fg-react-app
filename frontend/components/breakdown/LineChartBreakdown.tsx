import React, { useEffect, useState } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { fetchEmissionsData } from "../../api/emissions";
import dayjs from "dayjs";

const generateLastSixMonths = (): string[] => {
  const months = [];
  for (let i = 0; i < 6; i++) {
    months.push(dayjs().subtract(i, "month").format("YYYY-MM"));
  }
  return months.reverse();
};

const LineChartBreakdown = ({ userId }: { userId?: string }) => {
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const months = generateLastSixMonths();
      const promises = months.map((month) => fetchEmissionsData(month, userId));
      const results = await Promise.all(promises);
      setData(results.map((result) => result?.totalData.totalEmissions || 0)); // Extract totalEmissions and default to 0 if no data
      setLoading(false);
    };

    fetchData();
  }, []);

  const screenWidth = Dimensions.get("window").width;

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <LineChart
      data={{
        labels: generateLastSixMonths().map((month) =>
          dayjs(month).format("MMM")
        ), // Labels formatted as 'Jan', 'Feb', etc.
        datasets: [{ data }],
      }}
      width={screenWidth - 67}
      height={220}
      chartConfig={{
        backgroundGradientFrom: "#eeeeee",
        backgroundGradientTo: "#eeeeee",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(27, 117, 179, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        fillShadowGradientOpacity: 0,
        fillShadowGradientToOpacity: 0,
        propsForBackgroundLines: { stroke: "transparent" },
      }}
      bezier
      withInnerLines={false}
      withOuterLines={false}
      style={{ borderRadius: 16 }}
    />
  );
};

export default LineChartBreakdown;
