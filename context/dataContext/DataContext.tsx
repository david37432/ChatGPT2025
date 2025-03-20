import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/utils/FirebaseConfig";
import { APIResponse } from "@/interfaces/Responses";
import { Message } from "@/interfaces/AppInterfaces";

// Interfaz que extiende Message y agrega una clave única
interface MessageWithKey extends Message {
    key: string;
}

// Interfaz del contexto de datos con los estados y funciones disponibles
interface DataContextType {
    messages: MessageWithKey[]; // Lista de mensajes
    isLoading: boolean; // Estado de carga
    fetchMessages: (id: string) => Promise<void>; // Función para obtener mensajes
    sendMessage: (text: string, id: string) => Promise<void>; // Función para enviar mensajes
}

// Creación del contexto con valores predeterminados
const DataContext = createContext<DataContextType>({
    messages: [],
    isLoading: false,
    fetchMessages: async () => {},
    sendMessage: async () => {},
});

// Proveedor del contexto que maneja los mensajes
export const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<MessageWithKey[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Función para obtener mensajes desde Firebase
    const fetchMessages = async (id: string) => {
        if (!id) return;
        const docRef = doc(db, "conversations", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Se formatean los mensajes agregando una clave única
            const formattedMessages = data.messages.map((msg: Message, index: number) => ({
                ...msg,
                key: index.toString()
            }));
            setMessages(formattedMessages);
        }
    };

    // Función para enviar un mensaje y almacenar la respuesta de la IA
    const sendMessage = async (text: string, id: string) => {
        if (!text.trim()) return;
    
        // Se crea un nuevo mensaje de usuario
        const newMessage: MessageWithKey = {
            idts: Date.now().toString(),
            text,
            sender: "user",
            fecha: new Date().toISOString(),
            emisor: "Usuario",
            message: text,
            key: Date.now().toString(),
        };
    
        setIsLoading(true);
        setMessages((prev) => [...prev, newMessage]);
    
        try {
            // Se envía la solicitud a la API de IA
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=API_KEY", {
                method: "POST",
                body: JSON.stringify({ contents: [{ parts: [{ text }] }] }),
            });
    
            const data: APIResponse = await response.json();
            // Se genera un mensaje de la IA con la respuesta obtenida
            const aiMessage: MessageWithKey = {
                idts: Date.now().toString(),
                text: data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
                sender: "bot",
                fecha: new Date().toISOString(),
                emisor: "AI",
                message: data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
                key: Date.now().toString(),
            };
    
            setMessages((prev) => [...prev, aiMessage]);
    
            // Se actualiza Firebase con los mensajes
            const docRef = doc(db, "conversations", id);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const data = docSnap.data();
                const isFirstMessage = data.messages.length === 0;
    
                await updateDoc(docRef, {
                    messages: arrayUnion(newMessage, aiMessage),
                    ...(isFirstMessage && { title: text }), // Si es el primer mensaje, se usa como título
                });
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DataContext.Provider value={{ messages, isLoading, fetchMessages, sendMessage }}>
            {children}
        </DataContext.Provider>
    );
};

// Hook personalizado para acceder al contexto
export const useDataContext = () => useContext(DataContext);
