// import { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   KeyboardAvoidingView,
//   ScrollView,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { TextInput } from "react-native-paper";
// import { Link, router } from "expo-router";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithCredential,
// } from "firebase/auth";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { fetchEmissionsData } from "../../api/emissions";

// export default function LoginScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const auth = getAuth();

//   /* Function to sign up the user with the email and password */
//   const onLogin = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         if (user) {
//           fetchEmissionsData().then((data) => {
//             if (data) {
//               router.replace("/home");
//             } else {
//               router.replace("/pre-survey");
//             }
//           });
//         }
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         Alert.alert("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
//       });
//   };

//   const onGoogleLogin = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const user = await GoogleSignin.signIn();

//       const auth = getAuth();
//       const credential = GoogleAuthProvider.credential(user.idToken);
//       const userCredential = await signInWithCredential(auth, credential);

//       const currentUser = userCredential.user;
//       if (currentUser) {
//         fetchEmissionsData()
//           .then((data) => {
//             if (data) {
//               router.replace("/home");
//             } else {
//               router.replace("/pre-survey");
//             }
//           })
//           .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             Alert.alert(
//               "Error",
//               `Code: ${errorCode}\nMessage: ${errorMessage}`
//             );
//           });
//       }
//     } catch (error: any) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       Alert.alert("Error", `Code: ${errorCode}\nMessage: ${errorMessage}`);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior="padding"
//       style={{ flex: 1, backgroundColor: "white" }}
//     >
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <SafeAreaView className="flex-1 justify-center px-4">
//           <Text className="text-5xl font-bold text-center tracking-tighter my-10">
//             Log <Text className="text-primary">in</Text>
//           </Text>
//           <View className="items-center">
//             <Image
//               className="w-80 h-40"
//               source={require("../../assets/images/tree-logo.png")}
//             />
//           </View>
//           <View className="space-y-4 px-12 mt-6">
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
//                 left={<TextInput.Icon icon="at" color={"#000"} />}
//               />
//             </View>
//             <View className="relative mt-6">
//               <Text className="mt-4 mb-2">Your Password</Text>
//               <TextInput
//                 placeholder="Your Password"
//                 secureTextEntry={!showPassword}
//                 className="w-full pl-16"
//                 value={password}
//                 onChangeText={setPassword}
//                 mode="outlined"
//                 dense={true}
//                 outlineStyle={{ borderColor: "#000" }}
//                 theme={{ roundness: 9999, colors: { background: "#fff" } }}
//                 textColor="#000"
//                 left={<TextInput.Icon icon="lock" color="#000" />}
//                 right={
//                   <TextInput.Icon
//                     icon={showPassword ? "eye-off" : "eye"}
//                     onPress={() => setShowPassword(!showPassword)}
//                     color="#000"
//                   />
//                 }
//               />
//             </View>
//             <View className="flex flex-row justify-end">
//               <Link href="/forgot-password">
//                 <Text className="text-lg font-normal underline mt-2">
//                   Forgot Password?
//                 </Text>
//               </Link>
//             </View>
//             <TouchableOpacity
//               onPress={onLogin}
//               className="bg-primary rounded-full p-4 hover:bg-primary/90 mt-8 border shadow-sm"
//             >
//               <Text className="text-onPrimary text-center text-2xl font-bold">
//                 Log in
//               </Text>
//             </TouchableOpacity>
//             <View className="flex flex-row items-center my-4">
//               <View className="flex-1 h-1 bg-onBackground" />
//               <Text className="mx-4 font-bold text-xl">Or</Text>
//               <View className="flex-1 h-1 bg-onBackground" />
//             </View>
//             <TouchableOpacity
//               onPress={() => {
//                 onGoogleLogin();
//               }}
//               className="flex flex-row items-center justify-center bg-white border border-black rounded-full p-4 shadow-sm"
//             >
//               <Image
//                 source={{
//                   uri: "https://img.icons8.com/color/48/000000/google-logo.png",
//                 }}
//                 className="w-8 h-8 mr-4"
//               />
//               <Text className="text-center text-xl font-bold">
//                 Continue with Google
//               </Text>
//             </TouchableOpacity>
//             <View className="flex-row justify-center mt-8">
//               <TouchableOpacity onPress={() => router.navigate("/signup")}>
//                 <Text className="text-xl font-extrabold underline">
//                   Back to Sign Up
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </SafeAreaView>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }
