// import { router } from 'expo-router';
// import React from 'react';
// import { ScrollView, Text, Pressable, View, Image } from 'react-native';

// export default function TreePlantingScreen() {
//     return (
//         <ScrollView className="flex-1 bg-white">
//             <View className="pt-6">
//                 {/* Header */}
//                 <View className="flex items-center mt-8 mb-4">
//                     <Text className="text-5xl font-bold">
//                         Forever<Text className="text-[#409858]">green</Text>
//                     </Text>
//                     <Text className="text-3xl font-bold text-center">Tree Planting</Text>
//                     <Text className="text-xl text-center mb-2">Subscribe today to plant a tree monthly!</Text>
//                 </View>
//             </View>
//             <View className="flex-row justify-around mb-6">
//                 <Pressable
//                     className="bg-[#eeeeee] p-4 rounded-lg"
//                     onPress={() => router.push('/plant-a-tree')}
//                 >
//                     <Text className='text-3xl text-center'>🌱</Text>
//                     <Text className='text-lg'>Plant a new tree!</Text>
//                 </Pressable>
//                 <Pressable className="bg-[#eeeeee] p-4 rounded-lg">
//                     <Text className='text-3xl text-center'>🌳</Text>
//                     <Text className='text-lg'>View my Forest!</Text>
//                 </Pressable>
//             </View>
//             <View className="flex-1 items-center mb-4">
//                 <Image
//                     source={require('../../assets/images/map.png')}
//                     className="w-128 h-128 mb-2"
//                     resizeMode="contain"
//                 />
//             </View>

//             <View className="mb-4 bg-[#eeeeee] mx-4 p-4 rounded-2xl flex-row justify-center">
//                 <View className="flex-1 items-center justify-center p-2">
//                     <Text className="text-xl font-bold text-center mb-2">
//                         You have planted:
//                     </Text>
//                     <Text className="text-lg text-center mb-4">
//                         12 trees
//                     </Text>
//                 </View>
//                 <View className="flex-1 items-center p-2 justify-center">
//                     <Text className="text-xl font-bold text-center mb-2">
//                         Your trees have sequestered:
//                     </Text>
//                     <Text className="text-lg text-center mb-4">
//                         576 pounds of CO2
//                     </Text>
//                 </View>
//             </View>

//             <View className="mb-4 bg-[#eeeeee] mx-4 p-4 rounded-2xl">
//                 <Text className="text-2xl font-bold text-center mb-4">
//                     Check out our reforestation projects!
//                 </Text>
//                 <View className="flex-row justify-around">
//                     <Pressable className="items-center">
//                         <Image
//                             source={require('../../assets/images/costa-rica.png')}
//                             className="w-28 h-28 mb-2"
//                             resizeMode="contain"
//                         />
//                         <Text className='font-bold text-lg'>Costa Rica</Text>
//                     </Pressable>
//                     <Pressable className="items-center">
//                         <Image
//                             source={require('../../assets/images/brazil.png')}
//                             className="w-28 h-28 mb-2"
//                             resizeMode="contain"
//                         />
//                         <Text className='font-bold text-lg'>Brazil</Text>
//                     </Pressable>
//                     <Pressable className="items-center">
//                         <Image
//                             source={require('../../assets/images/penn.png')}
//                             className="w-28 h-28 mb-2"
//                             resizeMode="contain"
//                         />
//                         <Text className='font-bold text-lg'>Pennsylvania</Text>
//                     </Pressable>
//                 </View>
//             </View>
//             <View className="mb-4 bg-[#eeeeee] mx-4 p-4 rounded-2xl items-center">
//                 <Text className="text-3xl font-bold text-center mb-4">
//                     Tree Planting Subscription
//                 </Text>
//                 <Text className="text-base text-center mb-4 text-lg">
//                     The Forevergreen tree planting subscription includes 1 tree planted on our reforestation projects. We will populate your forest with all the relevant data and credit the carbon sequestered to you. Build a forest and a sustainable future with a consistent effort.
//                 </Text>
//                 <Pressable className="bg-[#409858] p-4 rounded-3xl">
//                     <Text className="text-xl font-bold text-white text-center">$10 Month</Text>
//                 </Pressable>
//             </View>
//         </ScrollView>
//     );
// };
