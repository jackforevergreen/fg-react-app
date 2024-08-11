import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from "expo-image";
import { getAuth, updateProfile } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import BackButton from '@/components/BackButton';
import { Feather } from '@expo/vector-icons';


export default function ProfileSettings() {
  const auth = getAuth();
  const storage = getStorage();

  const [user, setUser] = useState(auth.currentUser);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [profileImage, setProfileImage] = useState(user?.photoURL || null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setDisplayName(user?.displayName || "");
      setProfileImage(user?.photoURL || null);
    });

    return () => unsubscribe();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string | URL | Request) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `profilePictures/${user?.uid}/${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);

    try {
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setProfileImage(downloadURL);
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  const saveProfile = async () => {
    if (user) {
      try {
        await updateProfile(user, {
          displayName: displayName,
          photoURL: profileImage,
        });
        Alert.alert("Success", "Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile: ", error);
        Alert.alert("Error", "Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <BackButton />
      <View style={styles.header}>
        <Text style={styles.title}>
          Forever<Text style={styles.greenText}>green</Text>
        </Text>
        <Text style={styles.subtitle}>Profile Settings</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <TouchableOpacity style={styles.profileImageButton} onPress={pickImage}>
          {profileImage ? (
            <>
              <Image
                style={styles.profileImage}
                source={{ uri: profileImage }}
                contentFit="cover"
              />
              <View style={styles.iconOverlay}>
                <Feather name="edit-2" size={24} color="white" />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.profileImageText}>+</Text>
              <Text style={styles.uploadText}>Upload a profile picture!</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Display Name</Text>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email</Text>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
  },
  greenText: {
    color: '#409858',
    fontWeight: '600'
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#337946',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  profileImageText: {
    fontSize: 60,
    color: '#fff',
  },
  profileImage: {
    width: 135,
    height: 135,
    borderRadius: 65,
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
  uploadText: {
    marginTop: 10,
    color: '#409858',
    fontSize: 18,
    fontWeight: '500',
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 20,
  },
  emailText: {
    fontSize: 18,
    color: '#878585',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#409858',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 100
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
});