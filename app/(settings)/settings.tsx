import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Href, router, useRouter } from "expo-router";
import { fetchEmissionsData } from "@/api/emissions";
import { Image } from "expo-image";
import { BackButton, PageHeader } from "@/components/common";
import { logout, deleteUserAccount } from "@/api/auth";
import { useStripe } from "@/utils/stripe";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface SettingsItemProps {
  title: string;
  screen: Href<string>;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ title, screen }) => (
  <TouchableOpacity
    onPress={() => router.push(screen)}
    style={styles.settingsItem}
  >
    <Text style={styles.settingsItemTitle}>{title}</Text>
    <Icon name="chevron-right" size={48} />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const auth = getAuth();
  const [totalEmissions, setTotalEmissions] = useState<number>(0);
  const profileIcon = auth.currentUser?.photoURL;
  const { resetPaymentSheetCustomer } = useStripe();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEmissionsData();
      if (data) {
        const totalData = data.totalData;
        setTotalEmissions(totalData.totalEmissions);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await resetPaymentSheetCustomer();
            await logout();
          } catch (error) {
            console.error(error);
          } finally {
            router.replace("/get-started");
          }
        },
      },
    ]);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") {
      Alert.alert("Error", "Please type DELETE to confirm account deletion.");
      return;
    }

    try {
      setIsDeleteModalVisible(false); // Close the modal before proceeding
      await deleteUserAccount();

      // Use setTimeout to delay the navigation slightly, ensuring the modal is fully closed
      setTimeout(() => {
        router.replace("/get-started");
      }, 100);
    } catch (error: any) {
      // Delay the error alert to ensure the delete modal is closed
      setTimeout(() => {
        Alert.alert("Error", error.message);
      }, 100);
    } finally {
      setDeleteConfirmation(""); // Reset the confirmation text
    }
  };

  return (
    <ScrollView style={styles.container}>
      <PageHeader subtitle="Settings" />
      <BackButton />
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.profileImageBG}>
            {profileIcon ? (
              <Image
                style={styles.profileImage}
                source={{ uri: profileIcon }}
                placeholder={blurhash}
                contentFit="cover"
              />
            ) : (
              <Text style={styles.profileEmoji}>👤</Text>
            )}
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>
              {user?.displayName || "Guest"}
            </Text>
            <Text style={styles.profileEmail}>{user?.email || ""}</Text>
          </View>
        </View>

        <SettingsItem title="Profile Settings" screen="/profile-settings" />
        <SettingsItem title="Payment Methods" screen="/payment-methods" />
        <SettingsItem title="Purchase History" screen="/purchase-history" />
        <SettingsItem title="Notifications" screen="/notifications-settings" />

        <View style={styles.carbonFootprint}>
          <Text style={styles.carbonFootprintTitle}>
            Your carbon footprint...
          </Text>
          <View style={styles.carbonFootprintContent}>
            <Text style={styles.emissionText}>
              {totalEmissions.toFixed(2)}
              <Text style={styles.emissionUnit}> tons of CO₂</Text>
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/offset-now")}
              style={styles.offsetButton}
            >
              <Text style={styles.offsetButtonText}>Offset Now!</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.manageSubscriptions}>
          <Text style={styles.manageSubscriptionsTitle}>
            Manage Subscriptions
          </Text>
          <View style={styles.subscriptionButtons}>
            <TouchableOpacity
              onPress={() => router.push("/subscriptions-settings")}
              style={styles.subscriptionButton}
            >
              <Text style={styles.subscriptionEmoji}>⚙️</Text>
              <Text style={styles.subscriptionButtonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/subscriptions")}
              style={styles.subscriptionButton}
            >
              <Text style={styles.subscriptionEmoji}>🛒</Text>
              <Text style={styles.subscriptionButtonText}>
                View Subscriptions
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={() => setIsDeleteModalVisible(true)}
        >
          <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isDeleteModalVisible}
          onRequestClose={() => setIsDeleteModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Delete Account</Text>
              <Text style={styles.modalText}>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Text>
              <Text style={styles.modalText}>
                To confirm, please type DELETE in all caps:
              </Text>
              <TextInput
                style={styles.deleteConfirmationInput}
                placeholder="Type DELETE here"
                value={deleteConfirmation}
                onChangeText={setDeleteConfirmation}
                autoCapitalize="characters"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setIsDeleteModalVisible(false);
                    setDeleteConfirmation("");
                  }}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.deleteButton]}
                  onPress={handleDeleteAccount}
                >
                  <Text style={styles.modalButtonText}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileContainer: {
    paddingHorizontal: 20,
  },
  profileInfo: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 5,
    marginTop: 5,
  },
  profileImageBG: {
    backgroundColor: "#337946",
    width: 110,
    height: 110,
    borderRadius: 60,
    marginRight: 10,
  },
  profileEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  profileTextContainer: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
  },
  profileEmail: {
    fontSize: 16,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e5e7eb",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  settingsItemTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  carbonFootprint: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    marginTop: 30,
    backgroundColor: "#e5e7eb",
  },
  carbonFootprintTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "700",
  },
  carbonFootprintContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emissionText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#b91c1c",
  },
  emissionUnit: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  offsetButton: {
    backgroundColor: "#409858",
    borderRadius: 999,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  offsetButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  manageSubscriptions: {
    backgroundColor: "#e5e7eb",
    padding: 16,
    borderRadius: 8,
  },
  manageSubscriptionsTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "700",
  },
  subscriptionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  subscriptionButton: {
    alignItems: "center",
  },
  subscriptionEmoji: {
    fontSize: 24,
  },
  subscriptionButtonText: {
    fontWeight: "600",
  },
  logoutButton: {
    padding: 12,
    borderRadius: 8,
    marginTop: 42,
    backgroundColor: "#e5e7eb",
  },
  logoutButtonText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  deleteAccountButton: {
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    backgroundColor: "#b91c1c",
    marginBottom: 15,
  },
  deleteAccountButtonText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  deleteConfirmationInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "45%",
  },
  cancelButton: {
    backgroundColor: "#2196F3",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: "auto",
  },
});
