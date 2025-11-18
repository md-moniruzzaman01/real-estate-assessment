import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/typo";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const welcome = () => {
    const router = useRouter();

  const handleGetStarted = () => {
    // Navigate to the login page
    router.push("/projects");
  };
  return (
    <ScreenWrapper showPattern={true}>
      <View style={styles.container}>
        <View style={{ alignContent: "center" }}>
          <Typo color={colors.white} size={43} fontWeight={"900"}>
            Real Estate
          </Typo>
        </View>

        <Animated.Image
          entering={FadeIn.duration(700).springify()}
          source={require("../../assets/images/welcome.png")}
          style={styles.welcomeImage}
          resizeMode={"contain"}
        />

        <View>
          <Typo color={colors.white} size={33} fontWeight={"800"}>
            Stay Connected
          </Typo>
          <Typo color={colors.white} size={33} fontWeight={"800"}>
            with you friends
          </Typo>
          <Typo color={colors.white} size={33} fontWeight={"800"}>
            and family
          </Typo>
        </View>
        <Button style={{ backgroundColor: colors.white }} onPress={handleGetStarted}>
          <Typo size={23} fontWeight={"bold"}>
            Get Started
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  Background: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
  welcomeImage: {
    height: 300,
    aspectRatio: 1,
    alignSelf: "center",
  },
});
