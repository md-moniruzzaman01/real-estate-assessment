import { ButtonProps } from "@/constaints/types";
import { colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Loading from "./Loading";

const Button = ({ style, onPress, children, loading = false }: ButtonProps) => {
  if (loading) {
   return <View style={[styles.botton, style, { backgroundColor: "transparent" }]}>
      <Loading />
    </View>;
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.botton, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  botton: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    borderCurve: "continuous",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
});
