// import React from 'react';
// import { View, Text, Image, Pressable, ScrollView } from 'react-native';
// import { router } from 'expo-router';

// type TreeOption = {
//   name: string;
//   price: number;
//   image: any;
//   description: string;
// };

// const treeOptions: TreeOption[] = [
//   {
//     name: "Costa Rican Teak Tree",
//     price: 10.00,
//     image: require('../../assets/images/teak-tree-1.png'),
//     description: "Planting teak helps reforest areas, supports wildlife habitats, and absorbs carbon, aiding in climate change mitigation."
//   },
//   {
//     name: "PA Oak Tree",
//     price: 10.00,
//     image: require('../../assets/images/oak-tree-1.png'),
//     description: "Oak trees provide essential ecological benefits, such as biodiversity, stabilizing soil, and offering vital habitat and food sources for various wildlife species."
//   },
//   {
//     name: "Brazilian Pepper Tree",
//     price: 10.00,
//     image: require('../../assets/images/pepper-tree-1.png'),
//     description: "Planting Pepper trees helps regenerate rain forest in Brazil while cooling down temperatures."
//   },
// ];

// export default function PlantTreeScreen() {
//   const handleTreeSelect = (tree: TreeOption) => {
//     router.push({
//       pathname: '/checkout',
//       params: { tree: JSON.stringify(tree) }
//     });
//   };

//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="pt-6">
//         {/* Header */}
//         <View className="flex items-center mt-8 mb-4">
//           <Text className="text-5xl font-bold">
//             Forever<Text className="text-[#409858]">green</Text>
//           </Text>
//           <Text className="text-3xl font-bold text-center">Plant a Tree!</Text>
//         </View>
//       </View>
//       <ScrollView className="flex-1 px-4">
//         {treeOptions.map((tree, index) => (
//           <Pressable
//             key={index}
//             className="bg-gray-100 rounded-lg mb-4 overflow-hidden"
//             onPress={() => handleTreeSelect(tree)}
//           >
//             <View className="flex-row p-4">
//               <Image source={tree.image} className="w-24 h-24 mr-4" />
//               <View className="flex-1">
//                 <Text className="text-xl font-bold text-green-700">{tree.name}</Text>
//                 <Text className="text-lg font-semibold">${tree.price.toFixed(2)}</Text>
//                 <Text className="text-sm mt-2">{tree.description}</Text>
//               </View>
//             </View>
//           </Pressable>
//         ))}
//       </ScrollView>
//     </ScrollView>
//   );
// }