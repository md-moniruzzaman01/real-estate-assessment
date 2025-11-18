import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function ProjectCard({ project, onPress }: any) {
  return (
    <Animated.View
      entering={FadeInUp.duration(400)}
      style={{
        backgroundColor: "#1e1e1e",
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
          source={{ uri: project.thumbnail || "https://images.unsplash.com/photo-1560185127-6e2fc99f1a4f?auto=format&fit=crop&w=800&q=80" }}
          style={{ width: "100%", height: 150, borderRadius: 12, marginBottom: 12 }}
        />

        {/* Project Name */}
        <Text style={{ color: "white", fontSize: 18, fontWeight: "700", marginBottom: 4 }}>
          {project.name}
        </Text>

        {/* Description */}
        <Text style={{ color: "#b3b3b3", fontSize: 14, marginBottom: 8 }}>
          {project.description || "No description available"}
        </Text>

        {/* Price & Location */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
          <Text style={{ color: "#b3b3b3", fontSize: 14 }}>
            ৳ {project.price || "N/A"}
          </Text>
          <Text style={{ color: "#b3b3b3", fontSize: 14 }}>
            {project.location || "Unknown"}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
