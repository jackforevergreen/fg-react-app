import { Share } from "react-native";
import * as Linking from "expo-linking";

export const shareProfileLink = async (userId: string) => {
  try {
    const link = Linking.createURL("/profile/[uid]", {
      queryParams: { uid: userId },
    });
    const message = `Check out this profile: ${link}`;

    const result = await Share.share({
      message: message,
      url: link, // This is to ensure compatibility with some apps that might prefer a URL field
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log("Shared with activity type:", result.activityType);
      } else {
        console.log("Shared successfully");
      }
    } else if (result.action === Share.dismissedAction) {
      console.log("Share dismissed");
    }
  } catch (error) {
    console.error("Error sharing profile link:", error);
  }
};
