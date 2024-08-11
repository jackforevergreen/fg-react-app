import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from "expo-image";
import { LineChartBreakdown } from "@/components/breakdown";
import { getUserProfile, followUser, unfollowUser } from "@/api/social";
import { useLocalSearchParams } from "expo-router";
import BackButton from "@/components/BackButton";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const ProfileScreen = () => {
  const { uid } = useLocalSearchParams();
  const [targetUserProfile, setTargetUserProfile] = useState({
    name: "",
    photoURL: "",
    followerCount: 0,
    followingCount: 0,
    isFollowing: false,
  });

  useEffect(() => {
    if (typeof uid === "string") {
      fetchUserProfile(uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const metadata = await getUserProfile(userId);
      if (metadata) {
        setTargetUserProfile(metadata);
      }
    } catch (error) {
      console.error("Error fetching target profile metadata:", error);
      // Might want to show an error message to the user here
    }
  };

  return (
    <ScrollView style={styles.container}>
      <BackButton />
      <View style={styles.profile}>
        {/* <ProfileIcon /> */}
        {targetUserProfile.photoURL ? (
          <Image
            source={targetUserProfile.photoURL}
            placeholder={blurhash}
            contentFit={"cover"}
            style={styles.avatar}
          />
        ) : (
          <Icon name={"user"} style={styles.avatar} />
        )}
        <Text style={styles.name}>{targetUserProfile?.name || "Guest"}</Text>
        <View style={styles.followInfo}>
          <TouchableOpacity
            style={styles.followData}
            onPress={() =>
              router.push({
                pathname: "/friends/[uid]",
                params: {
                  uid: uid,
                  name: targetUserProfile?.name,
                  type: "Followers",
                },
              })
            }
          >
            <Text style={{ fontSize: 24 }}>
              {targetUserProfile.followerCount}
            </Text>
            <Text style={{ fontSize: 24 }}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.followData}
            onPress={() =>
              router.push({
                pathname: "/friends/[uid]",
                params: {
                  uid: uid,
                  name: targetUserProfile?.name,
                  type: "Following",
                },
              })
            }
          >
            <Text style={{ fontSize: 24 }}>
              {targetUserProfile.followingCount}
            </Text>
            <Text style={{ fontSize: 24 }}>Following</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.buttons}>
          {targetUserProfile.isFollowing ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (typeof uid === "string") {
                  unfollowUser(uid);
                  setTargetUserProfile({
                    ...targetUserProfile,
                    followerCount: targetUserProfile.followerCount - 1,
                    isFollowing: false,
                  });
                } else {
                  console.log("No user ID provided");
                }
              }}
            >
              <Icon name="minus" size={24} color="#fff" />
              <Text style={styles.buttonText}>Unfollow</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (typeof uid === "string") {
                  followUser(uid);
                  setTargetUserProfile({
                    ...targetUserProfile,
                    followerCount: targetUserProfile.followerCount + 1,
                    isFollowing: true,
                  });
                } else {
                  console.log("No user ID provided");
                }
              }}
            >
              <Icon name="plus" size={24} color="#fff" />
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button}>
            <Icon name="share" size={24} color="#fff" />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.breakdown}>
        <Text style={{ fontSize: 28, textAlign: "center", marginBottom: 16 }}>
          {targetUserProfile.name.split(" ")[0]}'s net-zero journey
        </Text>
        <LineChartBreakdown userId={uid as string} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profile: {
    alignItems: "center",
    marginTop: 64,
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
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    backgroundColor: "#409858",
    borderRadius: 50,
    color: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
  },
  breakdown: {
    marginVertical: 20,
    marginHorizontal: "auto",
    backgroundColor: "#EEEEEE",
    borderRadius: 18,
    padding: 16,
  },
});

export default ProfileScreen;
