import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import ProjectCard from "../../components/ProjectCard";
import { api } from "../../utils/api";

export default function ProjectsScreen() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .get("/projects")
      .then((res) => {
        if (!mounted) return;
        setProjects(res.data || []);
      })
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("projects")}</Text>
      <FlatList
        data={projects}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <Link href={`/projects/${item.id}`} asChild>
            <ProjectCard project={item} />
          </Link>
        )}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 20, fontWeight: "600", padding: 16 },
});
