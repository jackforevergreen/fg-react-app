// import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { RadioButton } from "react-native-paper";

// const RadioButtonGroup = ({ question, options, value, onChange }: any) => {
//   return (
//     <>
//       <Text className="mt-6 text-xl mb-3">{question}</Text>
//       <View className="-ml-2">
//         {options.map((item: any) => (
//           <TouchableOpacity
//             key={item}
//             onPress={() => onChange(item)}
//             activeOpacity={0.7}
//           >
//             <View className="flex-row items-center">
//               <RadioButton.Android
//                 value={item}
//                 status={value === item ? "checked" : "unchecked"}
//                 onPress={() => onChange(item)}
//                 color="#44945F"
//                 uncheckedColor="#808080"
//               />
//               <Text className="text-lg">{item}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </>
//   );
// };

// export default RadioButtonGroup;