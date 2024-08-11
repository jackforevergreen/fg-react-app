// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
// } from "react-native";
// import CreditItem from "../../components/carbon-credit/CreditItem";
// import ProjectCard from "../../components/carbon-credit/ProjectCard";
// import { fetchCredits } from "@/api/credits";
// import { addToCart, removeFromCart, getCart, clearCart } from "@/api/cart";
// import { CarbonCredit } from "@/types";
// import ShoppingCart from "@/components/ShoppingCart";

// export default function CarbonCreditScreen() {
//   const [selectedProject, setSelectedProject] = useState<CarbonCredit | null>(
//     null
//   );
//   const [credits, setCredits] = useState<CarbonCredit[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [cartItems, setCartItems] = useState<CarbonCredit[]>([]);
//   const [showCart, setShowCart] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const initializeData = async () => {
//       const result = await fetchCredits();
//       if (result && result.length > 0) {
//         setCredits(result as CarbonCredit[]);
//         setSelectedProject(result[0] as CarbonCredit);
//       }
//       const cartData = await getCart();
//       setCartItems(cartData);
//     };
//     initializeData();
//     setLoading(false);
//   }, []);

//   const handleAddToCart = async (project: CarbonCredit) => {
//     await addToCart(project);
//     setCartItems([...cartItems, project]);
//   };

//   const handleRemoveFromCart = async (projectId: string) => {
//     await removeFromCart(projectId);
//     setCartItems(cartItems.filter((item) => item.id !== projectId));
//   };

//   const handleCheckout = async () => {
//     // Implement checkout logic here
//     await clearCart();
//     setCartItems([]);
//     setShowCart(false);
//   };

//   const renderCreditItem = ({ item }: { item: CarbonCredit }) => (
//     <CreditItem
//       name={item.name}
//       price={item.price}
//       image={item.image}
//       colors={item.colors}
//       onPress={() => setSelectedProject(item)}
//     />
//   );

//   const renderHeader = () => (
//     <View className="p-6">
//       <View className="flex items-center mt-8">
//         <Text className="text-5xl font-bold">
//           Forever<Text className="text-[#409858]">green</Text>
//         </Text>
//         <Text className="text-3xl font-bold text-center mb-3">
//           Carbon Credits
//         </Text>
//         <Text className="text-lg text-center">
//           Click on a project to learn more or purchase
//         </Text>
//       </View>
//     </View>
//   );

//   const renderFooter = () => (
//     <>
//       {selectedProject && (
//         <ProjectCard
//           project={selectedProject}
//           onAddToCart={() => handleAddToCart(selectedProject)}
//         />
//       )}

//       <View className="bg-gray-100 rounded-2xl p-4 mb-6">
//         <Text className="text-3xl font-bold mb-6 text-center">
//           Carbon Credit Subscription
//         </Text>
//         <Text className="text-lg mb-2 text-center leading-tight">
//           The Forevergreen carbon credit subscription includes the purchase of
//           the nearest whole number of carbon credits to make sure you are net
//           zero every month. This is the easiest way to reduce your impact on the
//           planet and support awesome climate projects!
//         </Text>
//         <TouchableOpacity className="bg-[#409858] p-4 mx-auto rounded-full">
//           <Text className="font-bold text-white text-center text-xl px-2">
//             $20/Month
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       {showCart ? (
//         <ShoppingCart
//           items={cartItems}
//           removeItem={handleRemoveFromCart}
//           checkout={handleCheckout}
//         />
//       ) : (
//         <>
//           <TouchableOpacity
//             onPress={() => setShowCart(true)}
//             className="absolute top-4 right-4 z-10"
//           >
//             <Text className="font-bold">Cart ({cartItems.length})</Text>
//           </TouchableOpacity>
//           <FlatList
//             ListHeaderComponent={renderHeader}
//             data={credits}
//             renderItem={renderCreditItem}
//             keyExtractor={(item) => item.name}
//             numColumns={3}
//             columnWrapperStyle={{
//               justifyContent: "space-between",
//               paddingVertical: 30,
//             }}
//             style={{ paddingHorizontal: 16 }}
//             ListFooterComponent={renderFooter}
//           />
//         </>
//       )}
//     </SafeAreaView>
//   );
// }
