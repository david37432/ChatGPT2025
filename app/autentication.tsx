// Importamos useRouter de expo-router para manejar la navegación
import { useRouter } from 'expo-router';

// Importamos el tipo RootStackParamList para la navegación tipada (aunque aquí no se usa directamente)
import { RootStackParamList } from "@/app/types";

// Importamos el hook useAuth para manejar la autenticación
import { useAuth } from "@/context/dataContext/AuthContext";

import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";

// Componente de autenticación para inicio de sesión
const Authentication = () => {
  // Obtenemos la función signIn del contexto de autenticación
  const { signIn } = useAuth();
  
  // Hook para la navegación entre pantallas
  const router = useRouter();

  // Estados para almacenar email y contraseña ingresados por el usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para manejar errores en la autenticación
  const [error, setError] = useState<string | null>(null);

  // Función para manejar el inicio de sesión
  const handleSignIn = async () => {
    setError(null); // Limpiamos errores previos

    try {
      // Intentamos iniciar sesión con el email y contraseña ingresados
      const success = await signIn(email, password);
      
      // Si la autenticación falla, mostramos un mensaje de error
      if (!success) {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.log("Error en login:", error);
      setError("Ocurrió un error al iniciar sesión");
    }
  };

  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Welcome to the App</Text>

      {/* Campo de entrada para el email */}
      <TextInput
        style={styles.border}
        placeholder="Email"
        placeholderTextColor="white"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo de entrada para la contraseña */}
      <TextInput
        style={styles.border}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      {/* Muestra un mensaje de error si ocurre un problema al iniciar sesión */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Botón para iniciar sesión */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Botón para ir a la pantalla de registro si el usuario no tiene cuenta */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/Register')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos para los elementos del componente
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "#343541",
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#10A37F",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  border: {
    borderWidth: 1,
    borderColor: "dimgray",
    borderRadius: 8,
    backgroundColor: "dimgray",
    margin: 10,
    width: "90%",
    padding: 10,
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
});

export default Authentication;
