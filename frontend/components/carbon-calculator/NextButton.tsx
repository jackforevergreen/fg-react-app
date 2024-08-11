// import React from "react";
// import { View, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { useRouter } from "expo-router";

// const NextButton = ({
//   isFormValid,
//   onNext,
//   saveData,
// }: {
//   isFormValid: boolean;
//   onNext: string;
//   saveData?: () => void;
// }) => {
//   const router = useRouter();

//   const handlePress = async () => {
//     if (isFormValid) {
//       router.navigate(onNext);
//       if (saveData) {
//         saveData();
//       }
//     }
//   };

//   return (
//     <View className="flex items-end mb-10 mr-10">
//       <TouchableOpacity onPress={handlePress}>
//         <View
//           className={`py-3 px-4 rounded-full border-2 h-16 w-16 ${
//             isFormValid
//               ? "border-black bg-[#AEDCA7]"
//               : "border-gray-300 bg-gray-300"
//           }`}
//         >
//           <Icon
//             name="arrow-right"
//             size={30}
//             color={isFormValid ? "#000" : "#AAA"}
//           />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default NextButton;
