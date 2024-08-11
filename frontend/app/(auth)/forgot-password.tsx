// import { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   KeyboardAvoidingView,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { TextInput } from "react-native-paper";
// import { router } from "expo-router";
// import { handleResetPassword } from "../../api/auth";

// export default function ForgotPasswordScreen() {
//   const [email, setEmail] = useState("");

//   return (
//     <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <SafeAreaView
//           className="flex-1 justify-center px-4"
//           style={{ backgroundColor: "#fff" }}
//         >
//           {/* Header */}
//           <Text className="text-5xl font-bold text-center tracking-tighter my-10">
//             Reset <Text className="text-primary">Password</Text>
//           </Text>

//           {/* Logo */}
//           <View className="items-center">
//             <Image
//               className="w-80 h-40"
//               source={require("../../assets/images/tree-logo.png")}
//             />
//           </View>

//           {/* Form */}
//           <View className="space-y-4 px-12 mt-6">
//             {/* Email Field */}
//             <View className="relative">
//               <Text className="mb-2">Email</Text>
//               <TextInput
//                 placeholder="Ex. abc@example.com"
//                 className="w-full pl-16"
//                 value={email}
//                 onChangeText={setEmail}
//                 mode="outlined"
//                 dense={true}
//                 outlineStyle={{ borderColor: "#000" }}
//                 theme={{ roundness: 9999, colors: { background: "#fff" } }}
//                 textColor="#000"
//                 left={<TextInput.Icon icon="at" color="#000" />}
//               />
//             </View>

//             {/* Info */}
//             <View className="mt-4 p-2">
//               <Text className="leading-relaxed">
//                 By clicking the "Reset Password" button you'll receive an email
//                 with a link to create a new password. This helps to ensure your
//                 account remains secure and accessible to you.
//               </Text>
//             </View>
//           </View>

//           {/* Controls */}
//           <View className="px-12 mt-6">
//             {/* Reset password button */}
//             <TouchableOpacity
//               className="bg-primary rounded-full p-4 hover:bg-primary/90 mt-4 border shadow-sm"
//               onPress={() => handleResetPassword(email)}
//             >
//               <Text className="text-onPrimary text-center text-2xl font-bold">
//                 Reset Password
//               </Text>
//             </TouchableOpacity>

//             {/* Or */}
//             <View className="flex flex-row items-center my-4">
//               <View className="flex-1 h-1 bg-onBackground" />
//               <Text className="mx-4 font-bold text-xl">Or</Text>
//               <View className="flex-1 h-1 bg-onBackground" />
//             </View>

//             {/* Back to Log in button */}
//             <TouchableOpacity
//               className="flex flex-row items-center justify-center bg-white border border-black rounded-full p-4 shadow-sm"
//               onPress={() => router.push("/login")}
//             >
//               <Text className="text-center text-xl font-bold">
//                 Back to Log in
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </SafeAreaView>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }
