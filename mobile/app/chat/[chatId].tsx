import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { api } from "../../utils/api";

export default function ChatPage() {
  const { chatId } = useLocalSearchParams() as { chatId: string };
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages?chatId=${chatId}`);
      setMessages(res.data);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await api.post("/messages", { chatId:Number(chatId), content: newMessage }); // Replace with actual logged-in user
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.warn(err);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.messageCard, item.senderId === 1 ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.sender}>{item.senderName || `User ${item.senderId}`}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {loading ? (
          <Text style={{ padding: 16 }}>Loading messages...</Text>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(i) => String(i.id)}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16 }}
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8" },
  messageCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: "70%",
  },
  myMessage: { backgroundColor: "#DCF8C5", alignSelf: "flex-end" },
  otherMessage: { backgroundColor: "#fff", alignSelf: "flex-start" },
  sender: { fontWeight: "700", marginBottom: 4 },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
  },
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 8, marginRight: 8 },
  sendBtn: { backgroundColor: "#007AFF", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  sendText: { color: "#fff", fontWeight: "700" },
});
