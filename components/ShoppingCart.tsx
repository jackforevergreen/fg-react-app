// // components/ShoppingCart.tsx
// import React from "react";
// import { View, Text, FlatList, TouchableOpacity } from "react-native";
// import { Image } from "expo-image";
// import { FGCoin } from "@/constants/Images";

// const ShoppingCart = ({
//   items,
//   removeItem,
//   checkout,
// }: {
//   items: any[];
//   removeItem: any;
//   checkout: any;
// }) => {
//   const renderItem = ({ item }: any) => (
//     <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
//       <View className="flex-row items-center">
//         <Image source={item.image} style={{ width: 50, height: 50 }} />
//         <Text className="ml-4 font-bold">{item.name}</Text>
//       </View>
//       <View className="flex-row items-center">
//         <Image source={FGCoin} style={{ width: 20, height: 20 }} />
//         <Text className="ml-2">{item.price}</Text>
//         <TouchableOpacity onPress={() => removeItem(item.id)} className="ml-4">
//           <Text className="text-red-500">Remove</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const total = items.reduce((sum, item) => sum + item.price, 0);

//   return (
//     <View className="flex-1">
//       <FlatList
//         data={items}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />
//       <View className="p-4 border-t border-gray-200">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="font-bold text-lg">Total:</Text>
//           <View className="flex-row items-center">
//             <Image source={FGCoin} style={{ width: 24, height: 24 }} />
//             <Text className="ml-2 font-bold text-lg">{total}</Text>
//           </View>
//         </View>
//         <TouchableOpacity
//           onPress={checkout}
//           className="bg-[#409858] p-4 rounded-full"
//         >
//           <Text className="text-white font-bold text-center">Checkout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ShoppingCart;
