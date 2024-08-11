// import React, { useState, useRef } from "react";
// import { View, Text, TouchableOpacity, ScrollView } from "react-native";
// import { Image } from "expo-image";
// import Icon from "react-native-vector-icons/Feather";
// import PagerView from "react-native-pager-view";
// import { CarbonCredit } from "@/types";
// import { FGCoin } from "@/constants/Images";

// const ProjectCard = ({
//   project,
//   onAddToCart,
// }: {
//   project: CarbonCredit;
//   onAddToCart: () => void;
// }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [expanded, setExpanded] = useState(false);

//   const pagerRef = useRef<PagerView>(null);

//   const toggleExpanded = () => setExpanded(!expanded);
//   const incrementQuantity = () => setQuantity(quantity + 1);
//   const decrementQuantity = () => setQuantity(Math.max(1, quantity - 1));

//   const navigateDetails = (direction: "next" | "prev") => {
//     if (direction === "next") {
//       pagerRef.current?.setPage((currentPage + 1) % project.details.length);
//     } else {
//       pagerRef.current?.setPage(
//         (currentPage - 1 + project.details.length) % project.details.length
//       );
//     }
//   };

//   pagerRef.current?.setScrollEnabled(true);

//   if (!project) return null;

//   return (
//     // Could not get tailwind to work here. Really inconsistent and dissapointing
//     <View
//       style={{
//         backgroundColor: "#EEEEEE",
//         borderRadius: 16,
//         padding: 15,
//         marginVertical: 20,
//       }}
//     >
//       <View>
//         {/* Title */}
//         <Text className="text-xl font-bold mb-2">{project.name}</Text>

//         {/* Description */}
//         <PagerView
//           ref={pagerRef}
//           initialPage={0}
//           onPageSelected={(e) => {
//             setCurrentPage(e.nativeEvent.position);
//           }}
//           style={{ flex: 1, height: expanded ? 300 : 140 }}
//         >
//           {project.details.map((detail: any, index: any) => (
//             <View key={index}>
//               <Text className="text-lg font-bold mb-2">{detail.title}</Text>
//               {/* Basically bold the words before a colon, unless there isn't a colon. This is mainly for Key Features */}
//               <ScrollView
//                 style={{
//                   maxHeight: expanded ? undefined : 80,
//                   overflow: "hidden",
//                 }}
//                 scrollEnabled={expanded}
//               >
//                 <Text className="text-lg leading-tight">
//                   {detail.content.split("\n").map((item: any, idx: any) => {
//                     const parts = item.split(":");
//                     return (
//                       <Text key={idx}>
//                         {parts.length > 1 ? (
//                           <>
//                             <Text style={{ fontWeight: "bold" }}>
//                               {parts[0]}:
//                             </Text>
//                             {parts.slice(1).join(":")}
//                           </>
//                         ) : (
//                           item
//                         )}
//                         {"\n"}
//                       </Text>
//                     );
//                   })}
//                 </Text>
//               </ScrollView>
//               {detail.content.length > 60 && (
//                 <TouchableOpacity onPress={toggleExpanded} className="mt-2">
//                   <Text className="text-[#409994]">
//                     {expanded ? "Show Less" : "Show More"}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           ))}
//         </PagerView>
//       </View>

//       {/* Controls */}
//       <View className="flex-row justify-center items-center mt-4 mb-4 gap-4">
//         {/* Arrow Left */}
//         <TouchableOpacity onPress={() => navigateDetails("prev")}>
//           <Icon name="chevron-left" size={48}></Icon>
//         </TouchableOpacity>

//         {/* Credit Image */}
//         <Image source={project.image} style={{ height: 75, width: 70 }} />

//         {/* Coins per ton of CO2 */}
//         <View className="flex-row gap-2 items-baseline">
//           <View
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center",
//               gap: 4,
//             }}
//           >
//             <Image source={FGCoin} style={{ height: 24, width: 24 }} />
//             <Text className="text-2xl font-bold leading-tight">
//               {project.price * quantity}
//             </Text>
//           </View>
//           <View className="flex-col ml-2 mt-6">
//             <Text className="leading-tight">per ton</Text>
//             <Text className="leading-tight">CO2</Text>
//           </View>
//         </View>

//         {/* Quantity - Currently axed because RevenueCat does not support purchasing multiple of the same product at once */}
//         <View className="">
//           <View className="flex-row items-center mt-2">
//             <TouchableOpacity
//               onPress={decrementQuantity}
//               className="bg-black w-8 h-8 rounded-lg items-center justify-center"
//             >
//               <Icon name="minus" size={24} color={"#fff"}></Icon>
//             </TouchableOpacity>
//             <Text
//               className="text-xl font-bold"
//               style={{ height: 20, width: 20, textAlign: "center" }}
//             >
//               {quantity}
//             </Text>
//             <TouchableOpacity
//               onPress={incrementQuantity}
//               className="bg-black w-8 h-8 rounded-lg items-center justify-center"
//             >
//               <Icon name="plus" size={24} color={"#fff"}></Icon>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Right Arrow */}
//         <TouchableOpacity onPress={() => navigateDetails("next")}>
//           <Icon name="chevron-right" size={48}></Icon>
//         </TouchableOpacity>
//       </View>

//       {/* Total & Buy Now */}
//       <View className="flex-row items-center gap-8 justify-end">
//         <Text className="text-3xl font-bold">Total:</Text>
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             gap: 4,
//             alignItems: "center",
//           }}
//         >
//           <Image source={FGCoin} style={{ height: 24, width: 24 }} />
//           <Text className="text-3xl">{project.price * quantity}</Text>
//         </View>
//         <TouchableOpacity
//           className="bg-[#409858] p-2 rounded-full flex-row justify-center align-baseline"
//           onPress={() => {onAddToCart}}
//         >
//           <Icon
//             name="shopping-cart"
//             size={18}
//             color={"#fff"}
//             className="p-2"
//           ></Icon>
//           <Text className="text-white font-bold p-2">Add to Cart</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ProjectCard;
