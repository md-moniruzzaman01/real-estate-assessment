import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function ProjectCard({ project, onPress }: any) {
  return (
    <Animated.View
      entering={FadeInUp.duration(400)}
      style={{
        backgroundColor: "#b6b3b3ff",
        borderRadius: 16,
        padding: 16,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
      }}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        {/* Real Estate Image */}
        <Image
          source={{ uri: project.thumbnail || "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
          style={{ width: "100%", height: 150, borderRadius: 12, marginBottom: 12 }}
        />

        {/* Project Name */}
        <Text style={{ color: "white", fontSize: 18, fontWeight: "700", marginBottom: 4 }}>
          {project.name}
        </Text>

        {/* Description */}
        <Text style={{ color: "white", fontSize: 14, marginBottom: 8 }}>
          {project.description || "No description available"}
        </Text>

        {/* Price & Location */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
          <Text style={{ color: "white", fontSize: 14 }}>
            ৳ {project.id || "N/A"}
          </Text>
          <Text style={{ color: "white", fontSize: 14 }}>
            {project.location ||"Banani, Dhaka"}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
