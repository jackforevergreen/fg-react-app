// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { router } from "expo-router";
// // todo: replace fetchEmissionsData with the calculate emissions data function (not written yet)
// import { fetchEmissionsData } from "@/api/emissions";
// import {
//   PieChartBreakdown,
//   BarChartBreakdown,
//   EarthBreakdown,
// } from "@/components/breakdown";
// import CalculatingScreen from "./calculating";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// export default function Breakdown() {
//   const [emissionsPerYear, setEmissionsPerYear] = useState(0.0);
//   const emissionsPerMonth = emissionsPerYear / 12;
//   const [transportationEmissions, setTransportationEmissions] = useState(0.0);
//   const [dietEmissions, setDietEmissions] = useState(0.0);
//   const [energyEmissions, setEnergyEmissions] = useState(0.0);
//   const [retryCount, setRetryCount] = useState(0);

//   useEffect(() => {
//     const loadData = async () => {
//       const data = await fetchEmissionsData();
//       if (data) {
//         const totalData = data.totalData;
//         setEmissionsPerYear(totalData.totalEmissions);
//         setTransportationEmissions(totalData.transportationEmissions);
//         setDietEmissions(totalData.dietEmissions);
//         setEnergyEmissions(totalData.energyEmissions);
//       } else if (retryCount < 3) {
//         setTimeout(() => {
//           setRetryCount((prevCount) => prevCount + 1);
//         }, 1000 * (retryCount + 1));
//       }
//     };

//     loadData();
//   }, [retryCount]);

//   const screenWidth = Dimensions.get("window").width;

//   const [isAnonymous, setIsAnonymous] = useState(false);
//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsAnonymous(user.isAnonymous);
//       }
//     });

//     // Rest of your existing useEffect code...

//     return () => unsubscribe();
//   }, [retryCount]);

//   if (!emissionsPerYear) {
//     return <CalculatingScreen />;
//   }

//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="p-6">
//         {/* Header */}
//         <View className="flex-row items-center gap-6 mt-4">
//           <Icon
//             name="arrow-left"
//             size={24}
//             color="black"
//             onPress={() => router.back()}
//           />
//           <Text className="text-4xl mt-1">Results</Text>
//         </View>

//         <View className="px-4 pb-6 pt-2">
//           {/* Carbon Footprint */}
//           <View className="shadow-lg rounded-xl bg-white p-4 mb-4">
//             <Text className="text-2xl font-bold my-2">
//               Your Carbon Footprint
//             </Text>
//             <Text className="mb-1">Your total emissions are:</Text>
//             <Text className="text-green-600 text-xl mb-2">
//               {emissionsPerYear.toFixed(2)} tons co2/year
//             </Text>
//             <Text className="mb-1">Your total monthly emissions are:</Text>
//             <Text className="text-green-600 text-xl mb-4">
//               {emissionsPerMonth.toFixed(2)} tons co2/month
//             </Text>
//           </View>

//           {/* Emission Breakdown */}
//           <View className="shadow-lg rounded-xl bg-white p-4 mb-4">
//             <Text className="text-2xl font-bold mb-4">
//               Your Emission Breakdown
//             </Text>
//             <View className="mx-auto mb-4">
//               <PieChartBreakdown
//                 names={["Transportation", "Diet", "Energy"]}
//                 values={[
//                   transportationEmissions,
//                   dietEmissions,
//                   energyEmissions,
//                 ]}
//                 colors={["#44945F", "#AEDCA7", "#66A570"]}
//                 height={220}
//                 width={screenWidth}
//               />
//             </View>
//             <View className="flex-row justify-center mb-4">
//               <View className="flex-row items-center mr-4">
//                 <View
//                   className="mr-2"
//                   style={{ backgroundColor: "#44945F", height: 16, width: 16 }}
//                 />
//                 <Text>Transportation</Text>
//               </View>
//               <View className="flex-row items-center mr-4">
//                 <View
//                   className="mr-2"
//                   style={{ backgroundColor: "#AEDCA7", height: 16, width: 16 }}
//                 />
//                 <Text>Diet</Text>
//               </View>
//               <View className="flex-row items-center">
//                 <View
//                   className="mr-2"
//                   style={{ backgroundColor: "#66A570", height: 16, width: 16 }}
//                 />
//                 <Text>Energy</Text>
//               </View>
//             </View>
//           </View>

//           {/* Average American */}
//           <View className="shadow-lg rounded-xl bg-white p-4 mb-4">
//             <Text className="text-2xl font-bold mb-4">
//               You vs the Average American
//             </Text>
//             <View className="flex-row items-center justify-center mb-4">
//               <View className="flex-row items-center mr-4">
//                 <View className="w-4 h-4 mr-2 bg-[#44945F]" />
//                 <Text>You</Text>
//               </View>
//               <View className="flex-row items-center">
//                 <View className="w-4 h-4 mr-2 bg-[#A9A9A9]" />
//                 <Text>Average American</Text>
//               </View>
//             </View>
//             <View className="mx-auto mb-5"></View>
//             <View className="flex-1 items-center justify-center">
//               <BarChartBreakdown
//                 names={["You", "Average American"]}
//                 values={[emissionsPerYear, 21]}
//                 colors={["#44945F", "#A9A9A9"]}
//               />
//             </View>
//           </View>

//           {/* Earth Breakdown */}
//           <View className="shadow-lg rounded-xl bg-white px-4 mb-6 py-4">
//             <Text className="text-4xl font-bold mb-2 text-center">
//               Earth Breakdown
//             </Text>
//             <Text className="mb-4 text-lg">
//               If everyone lived like you we would need{" "}
//               {(emissionsPerYear / 6.4).toFixed(2)} Earths!
//             </Text>
//             <EarthBreakdown emissions={emissionsPerYear} />
//           </View>

//           {/* Call to Action */}
//           <View className="shadow-lg rounded-xl bg-white p-4 mb-4">
//             <Text className="text-4xl font-bold text-center mb-2">
//               Help us help you change the World 🌍
//             </Text>
//             <Text className="text-center mb-4 text-lg">
//               Support green projects around the world!
//             </Text>

//             <TouchableOpacity
//               onPress={() => {
//                 if (isAnonymous) {
//                   router.push("/signup");
//                 } else {
//                   router.push("/offset-now");
//                 }
//               }}
//               className="rounded-full py-3 mb-4"
//               style={{ backgroundColor: "#44945F" }}
//             >
//               <Text className="text-white text-center text-lg font-bold">
//                 Learn More
//               </Text>
//             </TouchableOpacity>
//             <Text className="text-center mb-4 text-lg">
//               Build your legacy and leave a lasting impact by planting your own
//               forest.
//             </Text>

//             <TouchableOpacity
//               onPress={() => {
//                 if (isAnonymous) {
//                   router.push("/signup");
//                 } else {
//                   router.replace("/tree-planting");
//                 }
//               }}
//               className="rounded-full py-3 mb-6"
//               style={{ backgroundColor: "#44945F" }}
//             >
//               <Text className="text-white text-center text-lg font-bold">
//                 Start the Pledge today!
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       {/* Next Button */}
//       <View className="flex items-end mb-10 mr-10">
//         <TouchableOpacity
//           onPress={() => {
//             if (isAnonymous) {
//               router.push("/signup");
//             } else {
//               router.replace("/home");
//             }
//           }}
//         >
//           <View className="py-3 px-4 rounded-full border-2 h-16 w-16 border-black bg-[#AEDCA7]">
//             <Icon name="arrow-right" size={30} color={"#000"} />
//           </View>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }
