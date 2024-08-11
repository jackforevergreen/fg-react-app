import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
// import { fetchEmissionsData } from "../../api/emissions";
import dayjs from "dayjs";
// import {
//   PieChartBreakdown,
//   BarChartBreakdown,
//   EarthBreakdown,
//   LineChartBreakdown,
// } from "../../components/breakdown";

const TextButton = ({ label, style }: { label: string; style: string }) => (
  <View
    className={`flex items-center justify-center w-7 h-7 m-1 rounded-full ${style}`}
  >
    <Text className="text-white text-md">{label}</Text>
  </View>
);

const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const [emissionsPerYear, setEmissionsPerYear] = useState(0.0);
  const [transportationEmissions, setTransportationEmissions] = useState(0.0);
  const [dietEmissions, setDietEmissions] = useState(0.0);
  const [energyEmissions, setEnergyEmissions] = useState(0.0);

  // useEffect(() => {
  //   const loadData = async () => {
  //     const data = await fetchEmissionsData();
  //     if (data !== null) {
  //       const totalData = data.totalData;
  //       setEmissionsPerYear(totalData.totalEmissions);
  //       setTransportationEmissions(totalData.transportationEmissions);
  //       setDietEmissions(totalData.dietEmissions);
  //       setEnergyEmissions(totalData.energyEmissions);
  //     }
  //   };

  //   loadData();
  // }, []);

  // Generate a list of 6 months ago to now
  const months = [];

  for (let i = 0; i < 6; i++) {
    months.push(dayjs().subtract(i, "month").format("YYYY-MM"));
  }
  months.reverse();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        {/* Header */}
        <View className="flex items-center mt-8 mb-6">
          <Text className="text-5xl font-bold">
            Forever<Text className="text-[#409858]">green</Text>
          </Text>
        </View>

        {/* Fast Fact */}
        <View className="bg-[#eeeeee] mb-6 p-6 rounded-2xl">
          <Text className="text-2xl text-center font-bold mb-4">
            Forevergreen Fast Fact of the Day
          </Text>
          <Text className="text-xl text-center">
            Turning off the tap while brushing your teeth can save up to 8
            gallons of water a day, over 2900 gallons of water a year!
          </Text>
        </View>

        {/* Carbon Footprint and Calculator */}
        <View className="flex flex-row justify-between mb-6">
          <TouchableOpacity
            className="bg-[#f0caca] rounded-2xl w-[47%] h-72 justify-center p-4"
            onPress={() => router.push("/breakdown")}
          >
            <Text className="text-2xl font-bold text-center mb-4">
              Your Carbon Footprint
            </Text>
            <Text className="text-7xl font-bold text-center mb-4">
              {Math.min(emissionsPerYear, 99.9).toFixed(1)}
            </Text>
            <Text className="text-4xl font-bold text-center">Tons of CO2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#eeeeee] rounded-2xl w-[47%] h-72 p-4"
            onPress={() => router.push("/transportation")}
          >
            <Text className="text-2xl font-bold text-center mb-4">
              Calculate your impact
            </Text>
            <Pressable className="flex-1 bg-[#eeeeee] rounded-lg justify-center">
              <>
                <View className="flex flex-row w-full">
                  <TextButton label="AC" style="bg-[#a5a5a5] w-[20%]" />
                  <TextButton label="+/-" style="bg-[#a5a5a5] w-[20%] ml-1" />
                  <TextButton label="%" style="bg-[#a5a5a5] w-[20%] ml-1" />
                  <TextButton label="/" style="bg-[#409858] w-[20%] ml-1" />
                </View>
                <View className="flex flex-row w-full">
                  <TextButton label="7" style="bg-[#333333] w-[20%]" />
                  <TextButton label="8" style="bg-[#333333] w-[20%] ml-1" />
                  <TextButton label="9" style="bg-[#333333] w-[20%] ml-1" />
                  <TextButton label="X" style="bg-[#409858] w-[20%] ml-1" />
                </View>
                <View className="flex flex-row w-full">
                  <TextButton label="4" style="bg-[#333333] w-[20%]" />
                  <TextButton label="5" style="bg-[#333333] w-[20%] ml-1" />
                  <TextButton label="6" style="bg-[#333333] w-[20%] ml-1" />
                  <TextButton label="-" style="bg-[#409858] w-[20%] ml-1" />
                </View>
                <View className="flex flex-row w-full">
                  <TextButton label="1" style="bg-[#333333] w-[20%]" />
                  <TextButton label="2" style="bg-[#333333] w-[20%] ml-1" />
                  <TextButton label="3" style="bg-[#333333] w-[20%] ml-1" />
                  <TextButton label="+" style="bg-[#409858] w-[20%] ml-1" />
                </View>
                <View className="flex flex-row w-full">
                  <TextButton label="0" style="bg-[#333333] w-[45%] mr-1" />
                  <TextButton label="." style="bg-[#333333] w-[20%] ml-1" />
                  <TextButton label="=" style="bg-[#409858] w-[20%] ml-1" />
                </View>
              </>
            </Pressable>
          </TouchableOpacity>
        </View>

        {/* Monthly Graph of Emissions */}
        <View className="bg-[#eeeeee] mb-6 p-6 rounded-2xl items-center">
          <Text className="text-2xl font-bold text-center mb-4">
            Your net-zero journey
          </Text>
          <View className="flex-1 items-center justify-center p-4">
            {/* <LineChartBreakdown /> */}
          </View>
          <TouchableOpacity
            className="mt-2.5 bg-[#409858] rounded-full items-center justify-center h-10 w-[150px]"
            style={{ paddingVertical: 4, paddingHorizontal: 16 }}
            onPress={() => {
              router.push("/offset-now");
            }}
          >
            <Text className="text-white text-center text-xl font-bold">
              Offset Now!
            </Text>
          </TouchableOpacity>
        </View>

        {/* Community */}
        <View className="mb-6">
          <Text className="text-2xl mb-4 font-bold text-center">
            Forevergreen Community
          </Text>
          <View className="flex flex-row justify-between">
            <View className="bg-[#eeeeee] rounded-2xl w-[47%] h-40 items-center justify-center p-4">
              <Text className="text-4xl font-bold text-center mb-2">
                10,000
              </Text>
              <Text className="text-2xl font-bold text-center">
                Trees Planted
              </Text>
            </View>
            <View className="bg-[#eeeeee] rounded-2xl w-[47%] h-40 items-center justify-center p-4">
              <Text className="text-4xl font-bold text-center mb-2">
                10,000
              </Text>
              <Text className="text-2xl font-bold text-center">
                Tons CO2 Gone
              </Text>
            </View>
          </View>
        </View>

        {/* Forevergreen Community Leaders/Referral */}
        <View className="mb-6">
          <Text className="text-2xl mb-4 text-center font-bold">
            Community Leaders
          </Text>
          <View className="flex flex-row justify-between bg-[#eeeeee] p-6 items-center rounded-2xl">
            <View>
              <Text className="text-xl mb-2">
                <Text className="font-bold">1.</Text> jpear - 10 Referrals
              </Text>
              <Text className="text-xl mb-2">
                <Text className="font-bold">2.</Text> joegjoe - 9 Referrals
              </Text>
              <Text className="text-xl">
                <Text className="font-bold">3.</Text> zyardley - 8 Referrals
              </Text>
            </View>
            <Pressable
              className="bg-[#409858] ml-1.25 rounded-full items-center justify-center h-10 w-[150px]"
              onPress={() => router.push("/referral")}
            >
              <Text className="text-white text-center text-xl font-bold">
                Refer a friend!
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Charts */}
        <View className="bg-[#eeeeee] p-6 rounded-2xl mb-6">
          {/* Your Breakdown Pie Chart */}
          <View className="bg-white rounded-2xl p-4 mb-6">
            <Text className="text-2xl mb-4">Your Breakdown</Text>
            <View className="flex flex-row justify-between align-middle">
              {/* <PieChartBreakdown
                names={["Transportation", "Diet", "Energy"]}
                values={[
                  transportationEmissions,
                  dietEmissions,
                  energyEmissions,
                ]}
                colors={["#44945F", "#AEDCA7", "#66A570"]}
                width={Math.round(width / 3)}
                height={100}
              /> */}
              <View className="flex-col justify-center mb-4 gap-2">
                <View className="flex-row items-center mr-4">
                  <View
                    className="mr-2"
                    style={{
                      backgroundColor: "#44945F",
                      height: 16,
                      width: 16,
                    }}
                  />
                  <Text>Transportation</Text>
                </View>
                <View className="flex-row items-center mr-4">
                  <View
                    className="mr-2"
                    style={{
                      backgroundColor: "#AEDCA7",
                      height: 16,
                      width: 16,
                    }}
                  />
                  <Text>Diet</Text>
                </View>
                <View className="flex-row items-center">
                  <View
                    className="mr-2"
                    style={{
                      backgroundColor: "#66A570",
                      height: 16,
                      width: 16,
                    }}
                  />
                  <Text>Energy</Text>
                </View>
              </View>
            </View>
          </View>

          {/* You vs the Average American */}
          <View className="bg-white rounded-2xl p-4 mb-6">
            <Text className="text-2xl">You vs the Average American</Text>
            <Text className="text-md mb-4">
              See how you rank vs the average American
            </Text>
            {/* <BarChartBreakdown
              names={["You", "Average American"]}
              values={[emissionsPerYear, 21]}
              colors={["#44945F", "#A9A9A9"]}
            /> */}
          </View>

          {/* If everyone lived like you */}
          <View className="bg-white rounded-2xl p-4 mb-6">
            <Text className="text-lg mb-4">
              If everyone lived like you we'd need{" "}
              {(emissionsPerYear / 6.4).toFixed(2)} Earths
            </Text>
            {/* <EarthBreakdown emissions={emissionsPerYear} /> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
