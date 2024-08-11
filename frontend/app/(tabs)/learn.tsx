// import { router } from 'expo-router';
// import React from 'react';
// import { ScrollView, Text, Pressable, View } from 'react-native';

// export default function LearnScreen() {
//     return (
//         <ScrollView className="flex-1 bg-white">
//             <View className="p-6">
//                 <View className="absolute w-[300px] h-[300px] bg-[#409858] rounded-full top-[150px] left-[-150px]" />
//                 <View className="absolute w-[300px] h-[300px] bg-[#409858] rounded-full top-[500px] left-[300px]" />

//                 <View className="flex items-center mt-8">
//                     <Text className="text-5xl font-bold">
//                         Forever<Text className="text-[#409858]">green</Text>
//                     </Text>
//                     <Text className="text-3xl font-bold">Learn</Text>
//                 </View>

//                 <View className="bg-[#eeeeee] mt-4 mb-6 p-4 rounded-2xl items-center">
//                     <Text className="text-3xl font-bold text-center">Resources Guides</Text>
//                     <Text className="text-xl text-center mb-2">Check out our resources guides with tons of info about how to live a more sustainable lifestyle!</Text>
//                     <Pressable
//                         className="mt-2.5 bg-[#409858] rounded-full items-center justify-center h-10 w-[150px] active:bg-[#3a8a4f]"
//                         onPress={() => router.push('https://www.forevergreen.earth/')}
//                     >
//                         <Text className="text-white text-center text-xl font-bold">Learn More</Text>
//                     </Pressable>
//                 </View>

//                 <View className="bg-[#eeeeee] mb-6 p-4 rounded-2xl items-center">
//                     <Text className="text-3xl font-bold text-center">Course</Text>
//                     <Text className="text-xl text-center mb-2">We have created some follow at your own pace courses about sustainable living!</Text>
//                     <Pressable
//                         className="mt-2.5 bg-[#409858] rounded-full items-center justify-center h-10 w-[150px] active:bg-[#3a8a4f]"
//                         onPress={() => router.push('https://www.forevergreen.earth/')}
//                     >
//                         <Text className="text-white text-center text-xl font-bold">Explore</Text>
//                     </Pressable>
//                 </View>

//                 <View className="bg-[#eeeeee] mb-6 p-4 rounded-2xl items-center">
//                     <Text className="text-3xl font-bold text-center">Blogs</Text>
//                     <Text className="text-xl text-center mb-2">We have tons of blogs about hot climate topics that are easy to read and educational!</Text>
//                     <Pressable
//                         className="mt-2.5 bg-[#409858] rounded-full items-center justify-center h-10 w-[150px] active:bg-[#3a8a4f]"
//                         onPress={() => router.push('https://www.forevergreen.earth/blog')}
//                     >
//                         <Text className="text-white text-center text-xl font-bold">Read Now</Text>
//                     </Pressable>
//                 </View>

//                 <View className="bg-[#eeeeee] mb-6 p-4 rounded-2xl items-center">
//                     <Text className="text-3xl font-bold text-center">Fast Facts</Text>
//                     <Text className="text-xl text-center mb-2">Want a quick fact about climate related topics to expand your view? Check out our fast facts now!</Text>
//                     <Pressable
//                         className="mt-2.5 bg-[#409858] rounded-full items-center justify-center h-10 w-[150px] active:bg-[#3a8a4f]"
//                         onPress={() => router.push('https://www.forevergreen.earth/')}
//                     >
//                         <Text className="text-white text-center text-xl font-bold">View</Text>
//                     </Pressable>
//                 </View>

//                 <View className="bg-[#eeeeee] mb-2 p-4 rounded-2xl items-center">
//                     <Text className="text-3xl font-bold text-center">Newsletter Subscription</Text>
//                     <Text className="text-xl text-center mb-2">By joining the newsletter you will be sent personalized info about your journey towards net-zero. This is a free an easy way to reduce your emissions.</Text>
//                     <Pressable
//                         className="mt-2.5 bg-[#409858] rounded-full items-center justify-center h-10 w-[150px] active:bg-[#3a8a4f]"
//                         onPress={() => router.push('https://www.forevergreen.earth/waitlist')}
//                     >
//                         <Text className="text-white text-center text-xl font-bold">Subscribe</Text>
//                     </Pressable>
//                 </View>

//             </View>
//         </ScrollView>
//     );
// }