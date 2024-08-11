// import { router } from "expo-router";
// import React from "react";
// import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";

// const PreSurveyScreen = () => {
//   const screenHeight = Dimensions.get("window").height;
//   return (
//     <ScrollView className="p-6 bg-white" style={{ flex: 1}}>
//       <View
//         style={{
//           position: "absolute",
//           width: 300,
//           height: 300,
//           backgroundColor: "#409858",
//           borderRadius: 150,
//           bottom: -300,
//           left: -150,
//         }}
//       />

//       <View
//         style={{
//           position: "absolute",
//           width: 200,
//           height: 200,
//           backgroundColor: "#409858",
//           borderRadius: 100,
//           top: -160,
//           right: -100,
//         }}
//       />

//       <View className="flex items-center" style={{ marginTop: 96 }}>
//         <Text className="text-5xl font-bold my-2">
//           Forever<Text className="text-primary">green</Text>
//         </Text>
//       </View>

//       <View className="bg-[#eeeeee] p-4 rounded-3xl" style={{ marginTop: 96 }}>
//         <Text className="text-4xl mt-4 font-bold text-center">Welcome!</Text>
//         <Text className="text-xl text-center mt-4">
//           Before we begin, we’ll ask you a few quick questions about your
//           transportation, diet, and energy use to help calculate your carbon
//           footprint. Completing this survey will give you personalized tips to
//           reduce your impact on the environment.
//         </Text>
//         <TouchableOpacity
//           onPress={() => router.navigate("/transportation")}
//           className="mt-8 py-4 px-8 bg-[#409858] rounded-full active:bg-[#3a8a4f] mx-auto"
//         >
//           <Text className="text-white text-center text-2xl font-bold">
//             Begin Survey
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default PreSurveyScreen;
