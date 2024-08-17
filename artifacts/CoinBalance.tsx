// import { useEffect, useState } from "react";
// import { Text, Pressable, StyleSheet } from "react-native";
// import { router } from "expo-router";
// import { Image } from "expo-image";
// import { FgCoin } from "@/constants/Images";
// import { getAuth } from "firebase/auth";
// import { getFgCoinsBalance } from "@/api/coins";

// export const CoinBalance = ({ numCoins }: { numCoins?: number }) => {
//   const auth = getAuth();
//   const [balance, setBalance] = useState<number | undefined>(
//     numCoins || undefined
//   );
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       const balance = await getFgCoinsBalance(auth.currentUser?.uid || "");
//       setBalance(balance);
//       setLoading(false);
//     };

//     if (numCoins !== undefined) {
//       setBalance(numCoins);
//       setLoading(false);
//     } else {
//       fetchBalance();
//     }
//   }, [auth.currentUser?.uid, numCoins]);

//   return (
//     <Pressable
//       style={styles.container}
//       onPress={() => router.navigate("fg-coins")}
//       hitSlop={24}
//     >
//       <Image source={FgCoin} style={styles.coinImage} />
//       {/* todo: add cool loading skeleton */}
//       <Text style={styles.text}>{loading ? "..." : balance}</Text>
//     </Pressable>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     top: 72,
//     right: 16,
//     height: 44,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   coinImage: {
//     width: 27,
//     height: 29,
//     marginRight: 3,
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "semibold",
//   },
// });
