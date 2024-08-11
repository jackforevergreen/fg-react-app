// // Import necessary libraries and components
// import React, { useState } from 'react';
// import { View, Text, TextInput, Alert, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native';
// import axios from 'axios';

// const ReferralForm = () => {
//   // Define state variables to hold the input values
//   const [friendName, setFriendName] = useState('');
//   const [friendEmail, setFriendEmail] = useState('');
//   const [note, setNote] = useState('');

//   // Function to handle the referral form submission
//   const handleReferral = async () => {
//     try {
//       // Send a POST request to the Flask backend to send an email
//       const res = await axios.post('http://<YOUR_MACHINE_IP>:5000/send-email', {
//         to: friendEmail,
//         subject: "Help the earth! Join Forevergreen today!",
//         content: "Your friend " + friendName + " has referred you to join Forevergreen, a platform that helps you track your carbon footprint and make a positive impact on the environment. " + friendName + " says: " + note + " Sign up today to start your journey to a greener future!"
//       });

//       // Show a success alert if the email was sent successfully
//       Alert.alert('Success', 'Referral sent successfully!');

//       // Clear input fields after successful send
//       setFriendName('');
//       setFriendEmail('');
//       setNote('');

//     } catch (error) {
//       // Show an error alert if the email sending failed
//       Alert.alert('Error', 'Failed to send referral.');
//     }
//   };

//   return (
//     <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
//       <ScrollView className="flex-1 bg-white">
//         <View className="p-6">
//           <View className="absolute w-[300px] h-[300px] bg-[#409858] rounded-full top-[200px] left-[200px]" />
//           <View className="absolute w-[200px] h-[200px] bg-[#409858] rounded-full bottom-[100px] right-[300px]" />

//           <View className="flex items-center mt-8">
//             <Text className="text-5xl font-bold">
//               Forever<Text className="text-[#409858]">green</Text>
//             </Text>
//             <Text className="text-3xl font-bold">Refer a Friend</Text>
//             <Text className="text-xl mt-2">Help the Cause Today by Referring a Friend</Text>
//           </View>

//           <View className="bg-[#eeeeee] mt-8 p-4 rounded-3xl">
//             <Text className="text-4xl mt-2 font-bold">Refer a Friend</Text>
//             <View className="mt-8 p-4 bg-white rounded-3xl">
//               <Text className="text-base font-bold text-black mb-4">Enter Your Friend's Name Below:</Text>
//               <TextInput className="bg-white p-2 rounded border-b border-black" placeholder="Your Answer" value={friendName} onChangeText={setFriendName} />
//             </View>
//             <View className="mt-4 p-4 bg-white rounded-3xl">
//               <Text className="text-base font-bold text-black mb-4">Enter Your Friend's Email Address Below:</Text>
//               <TextInput className="bg-white p-2 rounded border-b border-black" placeholder="Your Answer" value={friendEmail} onChangeText={setFriendEmail} />
//             </View>
//             <View className="mt-4 p-4 bg-white rounded-3xl">
//               <Text className="text-base font-bold text-black mb-4">Enter a Note or Leave Blank:</Text>
//               <TextInput className="bg-white p-2 rounded border-b border-black" placeholder="Your Answer" value={note} onChangeText={setNote} />
//             </View>
//             <Pressable
//               className="mt-4 mx-[90px] py-3 px-8 bg-[#409858] rounded-full active:bg-[#3a8a4f]"
//               onPress={handleReferral}
//             >
//               <Text className="text-white text-center text-2xl font-bold">Submit</Text>
//             </Pressable>
//           </View>

//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default ReferralForm;