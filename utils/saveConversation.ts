import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./FirebaseConfig"; // Asegúrate de que la ruta sea correcta

// Definimos la estructura de una conversación en la base de datos
interface Conversation {
  title: string;  // Título de la conversación
  messages: string[];  // Lista de mensajes en la conversación
  create_at: Timestamp;  // Marca de tiempo de creación
}

/**
 * Guarda una nueva conversación en Firestore.
 * @param messages - Lista de mensajes de la conversación.
 * @returns Una promesa con la referencia del documento creado o un error si falla.
 */
const saveConversation = async (messages: string[]): Promise<any> => {
  try {
    // Usamos el primer mensaje como título de la conversación o un título por defecto
    const title = messages.length > 0 ? messages[0] : "Nueva Conversación"; 
    
    // Creamos un objeto con la estructura de la conversación
    const newConversation: Conversation = {
      title,
      messages,
      create_at: Timestamp.now(), // Marca de tiempo actual
    };

    // Agregamos la conversación a la colección "conversations" en Firestore
    const docRef = await addDoc(collection(db, "conversations"), newConversation);
    
    return docRef; // Devolvemos la referencia del documento creado
  } catch (error) {
    console.error("Error saving conversation:", error); // Manejamos posibles errores
  }
};

export { saveConversation };
