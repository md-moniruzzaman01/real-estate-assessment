import { Slot } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../i18n"; // initialize i18n
import i18n from "../i18n";


export default function Layout() {
const [lang, setLang] = useState(i18n.language || "en");
function toggleLang() {
const next = lang === "en" ? "fr" : "en";
i18n.changeLanguage(next);
setLang(next);
}
return (
<SafeAreaProvider>
<SafeAreaView style={styles.container} edges={["top"]}>
<View style={styles.header}>
<Button title={lang.toUpperCase()} onPress={toggleLang} />
</View>
<Slot />
</SafeAreaView>
</SafeAreaProvider>
);
}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: "#fff" },
header: { padding: 8, alignItems: "flex-end" },
});