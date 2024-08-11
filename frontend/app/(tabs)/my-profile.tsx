import { router } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Image } from "expo-image";
import { LineChartBreakdown } from "../../components/breakdown";
import { getUserFollowCounts } from "../../api/social";
import { useFocusEffect } from "@react-navigation/native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const MyProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [followCounts, setFollowCounts] = useState({
    followerCount: 0,
    followingCount: 0,
  });
  const auth = getAuth();
  const profileIcon = auth.currentUser?.photoURL;

  const fetchFollowCounts = useCallback(async (userId: string) => {
    try {
      const counts = await getUserFollowCounts(userId);
      if (counts) {
        setFollowCounts(counts);
      }
    } catch (error) {
      console.error("Error fetching follow counts:", error);
      // Might want to show an error message to the user here
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchFollowCounts(currentUser.uid);
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, fetchFollowCounts]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchFollowCounts(user.uid);
      }
    }, [user, fetchFollowCounts])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
          onPress={() => router.navigate("/notifications")}
        >
          <TouchableOpacity onPress={() => router.navigate("/notifications")}>
            <Icon name={"bell"} size={40} style={styles.icon} />
            <View style={styles.indicator} />
          </TouchableOpacity>
        </Pressable>
        <Pressable>
          <TouchableOpacity onPress={() => router.navigate("/settings")}>
            <Icon name={"gear"} size={40} style={styles.icon} />
          </TouchableOpacity>
        </Pressable>
      </View>

      <View style={styles.profile}>
        {/* <ProfileIcon /> */}
        {profileIcon ? (
          <Image
            source={profileIcon}
            placeholder={blurhash}
            contentFit={"cover"}
            style={styles.avatar}
          />
        ) : (
          <Icon name={"user"} size={192} />
        )}
        <Text style={styles.name}>{user?.displayName || "Guest"}</Text>
        <View style={styles.followInfo}>
          <TouchableOpacity
            style={styles.followData}
            onPress={() =>
              router.push({
                pathname: "/friends/[uid]",
                params: { uid: user?.uid, type: "Followers" },
              })
            }
          >
            <Text style={{ fontSize: 24 }}>{followCounts.followerCount}</Text>
            <Text style={{ fontSize: 24 }}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.followData}
            onPress={() =>
              router.push({
                pathname: "/friends/[uid]",
                params: { uid: user?.uid, type: "Following" },
              })
            }
          >
            <Text style={{ fontSize: 24 }}>{followCounts.followingCount}</Text>
            <Text style={{ fontSize: 24 }}>Following</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#fff", fontSize: 24 }}>+ Add Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#fff", fontSize: 24 }}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.breakdown}>
        <Text style={{ fontSize: 28, textAlign: "center", marginBottom: 16 }}>
          Your net-zero journey
        </Text>
        <LineChartBreakdown />
        <TouchableOpacity
          style={[styles.button, { marginHorizontal: "auto" }]}
          onPress={() => router.navigate("/offset-now")}
        >
          <Text style={{ color: "#fff", fontSize: 24, textAlign: "center" }}>
            Offset Now!
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 48,
    paddingHorizontal: 36,
  },
  icon: {
    width: 40,
    height: 40,
  },
  indicator: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF0000",
    width: 16,
    height: 16,
    borderRadius: 9999,
  },
  profile: {
    alignItems: "center",
  },
  avatar: {
    width: 192,
    height: 192,
    borderRadius: 9999,
  },
  name: {
    marginTop: 16,
    fontSize: 40,
    fontWeight: "bold",
  },
  followInfo: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
  followData: {
    flexDirection: "column",
    alignItems: "center",
  },
  horizontalLine: {
    marginTop: 20,
    width: 50,
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
  buttons: {
    marginTop: 20,
    flexDirection: "row",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    backgroundColor: "#409858",
    borderRadius: 50,
    color: "#fff",
  },
  breakdown: {
    marginVertical: 20,
    marginHorizontal: "auto",
    backgroundColor: "#EEEEEE",
    borderRadius: 18,
    padding: 16,
  },
});

export default MyProfileScreen;
