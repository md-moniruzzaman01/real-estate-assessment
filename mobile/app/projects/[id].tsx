import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { api } from "../../utils/api";

export default function ProjectDetails() {
  const { id } = useLocalSearchParams() as { id: string };
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    let mounted = true;
    api
      .get(`/transactions?projectId=${id}`)
      .then((res) => {
        if (!mounted) return;
        setTransactions(res.data || []);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  // const openChat = () => {
  //   router.push(`/chat/${id}`); // id is the project id
  // };

  const openChat = (userId: number) => {
  router.push({
    pathname: "/chat/[chatId]",
    params: {
      chatId: id,     // project id used as chatId
      userId: userId, // 1 or 2
    },
  });
};

  if (loading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{t("transactions")}</Text>

      {transactions.length === 0 ? (
        <Text style={styles.noDataText}>{t("no_transactions")}</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(i) => String(i.id)}
          renderItem={({ item }) => (
            <View style={styles.txCard}>
              <View style={styles.txRow}>
                <Text style={styles.txLabel}>{t("amount")}:</Text>
                <Text style={styles.txValue}>${item.amount}</Text>
              </View>
              <View style={styles.txRow}>
                <Text style={styles.txLabel}>{t("buyer")}:</Text>
                <Text style={styles.txValue}>
                  {item.buyer?.name ?? item.buyerId}
                </Text>
              </View>
              <View style={styles.txRow}>
                <Text style={styles.txLabel}>{t("seller")}:</Text>
                <Text style={styles.txValue}>
                  {item.seller?.name ?? item.sellerId}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        />
      )}

      {/* Chat Link */}
   <View style={styles.chatButtonsContainer}>
  <View
    style={[styles.chatButton, styles.userOne]}
    onTouchEnd={() => openChat(1)}
  >
    <Text style={styles.chatButtonText}>Chat as User 1</Text>
  </View>

  <View
    style={[styles.chatButton, styles.userTwo]}
    onTouchEnd={() => openChat(2)}
  >
    <Text style={styles.chatButtonText}>Chat as User 2</Text>
  </View>
</View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    padding: 16,
  },
  noDataText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontSize: 16,
  },
  txCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  txRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  txLabel: { fontWeight: "600", color: "#555" },
  txValue: { color: "#111", fontWeight: "500" },
  chatButton: {
    margin: 16,
    padding: 14,
    backgroundColor: "#0066cc",
    borderRadius: 10,
    alignItems: "center",
  },
  chatButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  chatButtonsContainer: {
  flexDirection: "row",
  gap: 12,
  margin: 16,
},

userOne: {
  backgroundColor: "#0066cc",
  flex: 1,
},

userTwo: {
  backgroundColor: "#00a86b",
  flex: 1,
},

});
