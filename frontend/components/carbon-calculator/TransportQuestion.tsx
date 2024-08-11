// import React, { useRef, useEffect } from "react";
// import { View, Text, TouchableOpacity, Pressable } from "react-native";
// import { RadioButton, TextInput, HelperText } from "react-native-paper";

// const TransportQuestion = ({
//   question,
//   useTransport,
//   setUseTransport,
//   frequency,
//   setFrequency,
//   frequencyError,
//   label,
//   validateNumber,
// }: any) => {
//   const inputRef = useRef<any>(null);

//   useEffect(() => {
//     if (useTransport === "No") {
//       setFrequency("0");
//     }
//   }, [useTransport, setFrequency]);
//   useEffect(() => {
//     if (useTransport === "Yes") {
//       setFrequency("1");
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [useTransport]);

//   return (
//     <>
//       <Text className="mt-8 text-xl">{question}</Text>
//       <View className="flex-row align-middle justify-between mt-6">
//         <View className="-ml-2 w-1/2">
//           {["Yes", "No"].map((option) => (
//             <TouchableOpacity
//               key={option}
//               onPress={() => setUseTransport(option)}
//               activeOpacity={0.7}
//             >
//               <View className="flex-row items-center">
//                 <RadioButton.Android
//                   value={option}
//                   status={useTransport === option ? "checked" : "unchecked"}
//                   onPress={() => setUseTransport(option)}
//                   color="#44945F"
//                   uncheckedColor="#808080"
//                 />
//                 <Text className="text-lg">{option}</Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//         {useTransport === "Yes" && (
//           <View className="w-1/2">
//             <Text className="text-sm">How many times a week?</Text>
//             <TextInput
//               ref={inputRef}
//               placeholder="Number of times"
//               value={frequency}
//               onChangeText={(value) => validateNumber(value, setFrequency)}
//               keyboardType="numeric"
//               mode="outlined"
//               outlineStyle={{
//                 borderWidth: 0,
//               }}
//               style={{
//                 height: 40,
//                 backgroundColor: "#FFF",
//                 width: "auto",
//                 shadowColor: "#000",
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 1.41,
//                 borderRadius: 8,
//                 marginTop: 16,
//               }}
//               dense={true}
//               textColor="#000"
//               right={
//                 label ? (
//                   <TextInput.Affix text={label} textStyle={{ color: "#000" }} />
//                 ) : null
//               }
//             />
//             <HelperText type="error" visible={!!frequencyError}>
//               {frequencyError}
//             </HelperText>
//           </View>
//         )}
//       </View>
//     </>
//   );
// };

// export default TransportQuestion;
