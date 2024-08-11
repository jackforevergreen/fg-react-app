// import React from "react";
// import { View, Text, TouchableOpacity, ScrollView } from "react-native";
// import { router } from "expo-router";
// import BackButton from "../../components/BackButton";

// export default function OffsetNowScreen() {
//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="p-6">
//         <BackButton />
//         <View className="flex items-center mt-8">
//           <Text className="text-5xl font-bold">
//             Forever<Text className="text-[#409858]">green</Text>
//           </Text>
//           <Text className="text-3xl font-bold text-center mb-3">
//             Offset you Emissions!
//           </Text>
//           <Text className="text-lg text-center">
//             Reduce your climate impact in a few clicks
//           </Text>

//           <View
//             style={{
//               backgroundColor: "#EEEEEE",
//               borderRadius: 12,
//               padding: 16,
//               marginVertical: 24,
//             }}
//           >
//             <Text className="text-2xl font-bold mb-4">Reforestation</Text>
//             <Text className="text-base mb-4 text-center">
//               One way to fight climate change is through supporting
//               reforestation initiatives. Trees sequester carbon and are a great
//               way to remove carbon directly from our atmosphere and improve
//               biodiversity. By planting a tree you can build a forest and leave
//               a lasting impact for decades to come. Choose to.
//             </Text>
//             <View className="flex-row justify-between">
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: "#409858",
//                   padding: 16,
//                   borderRadius: 9999
//                 }}
//                 onPress={() => router.navigate("/tree-planting")}
//               >
//                 <Text className="text-white font-bold text-lg">
//                   Plant a tree
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: "#409858",
//                   padding: 16,
//                   borderRadius: 9999,
//                 }}
//               >
//                 <Text className="text-white font-bold text-lg">
//                   Monthly Tree Subscription
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View
//             style={{
//               backgroundColor: "#EEEEEE",
//               borderRadius: 12,
//               padding: 16,
//               marginVertical: 24,
//             }}
//           >
//             <Text className="text-2xl font-bold mb-4">
//               Carbon Credit Subscription
//             </Text>
//             <Text className="text-base mb-4 text-center">
//               The Forevergreen carbon credit subscription includes the purchase
//               of the nearest whole number of carbon credits to make sure you are
//               net zero every month. This is the easiest way to reduce your
//               impact on the planet and support awesome climate projects!
//             </Text>
//             <View className="flex-row justify-between">
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: "#409858",
//                   padding: 16,
//                   borderRadius: 9999,
//                 }}
//               >
//                 <Text className="text-white font-bold text-lg">
//                   Buy a credit
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: "#409858",
//                   padding: 16,
//                   borderRadius: 9999,
//                 }}
//               >
//                 <Text className="text-white font-bold text-lg">
//                   Carbon Credit Subscription
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View
//             style={{
//               backgroundColor: "#EEEEEE",
//               borderRadius: 12,
//               padding: 16,
//               marginVertical: 24,
//             }}
//           >
//             <Text className="text-2xl font-bold mb-4">
//               Reduce with Habitual Changes
//             </Text>
//             <Text className="text-base mb-4 text-center">
//               If you want to reduce your emissions with habitual changes,
//               subscribe to our newsletter to learn about habitual changes. This
//               is a free and easy way to make small changes that can have massive
//               impacts over time.
//             </Text>
//             <View className="flex-row justify-center">
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: "#409858",
//                   padding: 16,
//                   borderRadius: 9999,
//                 }}
//               >
//                 <Text className="text-white font-bold text-lg">Subscribe</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }
