// import { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { Image } from "expo-image";
// import { FgCoin } from "@/constants/Images";
// import { PageHeader, BackButton } from "@/components/common";
// import { LinearGradient } from "expo-linear-gradient";
// import {
//   fetchFgCoinsOptions,
//   purchaseFgCoins,
//   getFgCoinsBalance,
// } from "@/api/coins";
// import { CoinBalance } from "@/components/CoinBalance";
// import { getAuth } from "firebase/auth";
// import { router } from "expo-router";

// const ForevergreenCoins = () => {
//   const [coinOptions, setCoinOptions] = useState<
//     { coins: number; price: number }[]
//   >([]);
//   const [fgCoinsBalance, setFgCoinsBalance] = useState<number | null>(0);
//   const [loading, setLoading] = useState(true);
//   const auth = getAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const coins = await fetchFgCoinsOptions();
//         setCoinOptions(coins);

//         const fgCoins = await getFgCoinsBalance(auth.currentUser?.uid || "");
//         setFgCoinsBalance(fgCoins);
//       } catch (error: any) {
//         console.error("Error fetching coin options");
//         Alert.alert("Error", "Failed to load data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [auth.currentUser?.uid]);

//   const handlePurchase = async (coins: number, price: number) => {
//     try {
//       const result = await purchaseFgCoins(
//         auth.currentUser?.uid || "",
//         coins,
//         "credit_card"
//       );
//       if (result.success) {
//         Alert.alert("Success", `You have purchased ${coins} FG Coins!`);
//         const newBalance = await getFgCoinsBalance(auth.currentUser?.uid || "");
//         setFgCoinsBalance(newBalance);
//         router.push({
//           pathname: "purchase-complete",
//           params: {
//             transactionId: result.transactionId, // Pass the transaction ID
//           },
//         });
//       } else {
//         Alert.alert("Error", "Purchase failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error purchasing coins:", error);
//       Alert.alert(
//         "Error",
//         "An error occurred during purchase. Please try again."
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <PageHeader
//         subtitle="Forevergreen Coins"
//         description="Buy Coins to Spend on Forevergreen Products"
//       />
//       <BackButton />
//       <CoinBalance numCoins={fgCoinsBalance || undefined} />
//       <ScrollView>
//         {coinOptions.map((option, index) => (
//           <View key={index} style={styles.coinOption}>
//             <LinearGradient
//               colors={["#34C759", "#409858", "#25532E"]}
//               start={{ x: 0.5, y: 0 }}
//               end={{ x: 0.5, y: 1 }}
//               style={styles.gradient}
//             >
//               <Image source={FgCoin} style={styles.bigCoinImage} />
//             </LinearGradient>
//             <View style={styles.coinInfo}>
//               <View style={styles.coinDetails}>
//                 <View style={styles.coinAmountWrapper}>
//                   <Image source={FgCoin} style={styles.smallCoinImage} />
//                   <Text style={styles.coinAmount}>{option.coins}</Text>
//                 </View>
//                 <Text style={styles.coinPrice}>${option.price.toFixed(2)}</Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.buyButton}
//                 onPress={() => handlePurchase(option.coins, option.price)}
//               >
//                 <Text style={styles.buyButtonText}>Buy Now</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default ForevergreenCoins;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   backButton: {
//     fontSize: 16,
//     color: "black",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "green",
//   },
//   coinCount: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   coinCountText: {
//     marginLeft: 5,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     color: "gray",
//     marginBottom: 20,
//   },
//   coinOption: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#EEEEEE",
//     borderRadius: 20,
//     padding: 24,
//     marginBottom: 16,
//   },
//   gradient: {
//     width: 112,
//     height: 112,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   bigCoinImage: {
//     width: 80,
//     height: 86,
//   },
//   coinInfo: {
//     flex: 1,
//     flexDirection: "column",
//     justifyContent: "space-between",
//     marginLeft: 12,
//   },
//   coinDetails: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginLeft: 15,
//   },
//   smallCoinImage: {
//     width: 27,
//     height: 29,
//   },
//   coinAmountWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },
//   coinAmount: {
//     fontSize: 24,
//     fontWeight: "semibold",
//   },
//   coinPrice: {
//     fontSize: 32,
//     fontWeight: "bold",
//   },
//   buyButton: {
//     backgroundColor: "#409858",
//     borderRadius: 50,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     marginHorizontal: "auto",
//     fontSize: 18,
//   },
//   buyButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });
