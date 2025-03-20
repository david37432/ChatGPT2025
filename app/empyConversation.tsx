import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Text as RNText,
    KeyboardAvoidingView,
    Platform,
    Image
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useDataContext } from "@/context/dataContext/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/FirebaseConfig";

const EmptyConversation = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { messages, isLoading, fetchMessages, sendMessage } = useDataContext();
    const [message, setMessage] = useState("");

    // Cargar mensajes de la conversación cuando el ID esté disponible
    useEffect(() => {
        if (id) fetchMessages(id as string);
    }, [id]);

    // Maneja el envío de un mensaje
    const handleSend = async () => {
        if (!message.trim() || !id) return; // No envía mensajes vacíos
        await sendMessage(message, id as string);
        setMessage(""); // Limpia el campo de entrada
    };

    // Maneja la navegación de regreso al dashboard y elimina la conversación si está vacía
    const handleBackToDashboard = async () => {
        if (messages.length === 0 && id) {
            await deleteDoc(doc(db, "conversations", id as string)); // Eliminar la conversación si está vacía
        }
        router.navigate("/dashboard");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                {/* Encabezado de la conversación con botón de retroceso y logo */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackToDashboard}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Image
                        source={require("../assets/images/Vector.png")}
                        style={styles.logo}
                    />
                    <View style={{ width: 24 }} />
                </View>

                {/* Lista de mensajes */}
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => (
                        <View
                            style={[styles.messageBubble, item.sender === "user" ? styles.userBubble : styles.botBubble]}
                        >
                            <RNText style={styles.messageText}>{item.text}</RNText>
                        </View>
                    )}
                    contentContainerStyle={{ padding: 10 }}
                    ListEmptyComponent={
                        <RNText style={styles.loadingText}>
                            {isLoading ? "Cargando..." : "No hay mensajes aún."}
                        </RNText>
                    }
                />

                {/* Entrada de texto y botón de envío */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Escribe un mensaje..."
                        placeholderTextColor="#888"
                        value={message}
                        onChangeText={setMessage}
                        onSubmitEditing={handleSend}
                    />
                    <TouchableOpacity onPress={handleSend} disabled={isLoading} style={styles.sendButton}>
                        <Ionicons name="send" size={24} color={isLoading ? "#888" : "#4CAF50"} />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

// Estilos de la interfaz
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#343541", paddingTop: 40, paddingBottom: 25 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    logo: { width: 30, height: 30, tintColor: "#FFFFFF" },
    messageBubble: {
        maxWidth: "80%",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    userBubble: { alignSelf: "flex-end", backgroundColor: "#4CAF50" },
    botBubble: { alignSelf: "flex-start", backgroundColor: "#333" },
    messageText: { color: "#FFF", fontSize: 16 },
    loadingText: { textAlign: "center", color: "#FFF", marginVertical: 10 },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        paddingBottom: 30,
        borderTopWidth: 1,
        borderTopColor: "#333",
    },
    input: {
        flex: 1,
        backgroundColor: "#2E2E2E",
        color: "#FFFFFF",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 25,
        fontSize: 16,
    },
    sendButton: { marginLeft: 10 },
});

export default EmptyConversation;