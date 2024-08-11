// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// interface PurchaseItem {
//   type: string;
//   amount: number;
// }

// interface Purchase {
//   date: string;
//   items: PurchaseItem[];
//   total: number;
//   paymentMethod: string;
// }

// const PurchaseHistory: React.FC = () => {
//   const [purchases, setPurchases] = useState<Purchase[]>([]);
//   const db = firebase.firestore();

//   useEffect(() => {
//     const fetchPurchases = async () => {
//       const snapshot = await db.collection('purchaseHistory').get();
//       const data = snapshot.docs.map(doc => doc.data() as Purchase);
//       setPurchases(data);
//     };

//     fetchPurchases();
//   }, [db]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Purchase History</Text>
//       {purchases.map((purchase, index) => (
//         <View key={index} style={styles.purchaseItem}>
//           <View style={styles.purchaseHeader}>
//             <Text>{purchase.date}</Text>
//             <Text>${purchase.total.toFixed(2)}</Text>
//           </View>
//           <View style={styles.purchaseDetails}>
//             {purchase.items.map((item, idx) => (
//               <View key={idx} style={styles.itemDetail}>
//                 <Text>{item.type}</Text>
//                 <Text>${item.amount.toFixed(2)}</Text>
//               </View>
//             ))}
//           </View>
//           <Text style={styles.paymentMethod}>Payment Method: {purchase.paymentMethod}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#4caf50',
//   },
//   purchaseItem: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   purchaseHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     fontWeight: 'bold',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     paddingBottom: 5,
//   },
//   purchaseDetails: {
//     marginBottom: 10,
//   },
//   itemDetail: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   paymentMethod: {
//     fontStyle: 'italic',
//     textAlign: 'right',
//   },
// });

// export default PurchaseHistory;
