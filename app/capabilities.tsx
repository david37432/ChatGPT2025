// Importamos componentes de React Native
import { Button, TouchableOpacity } from "react-native";

// Importamos useRouter para la navegación con expo-router
import { useRouter } from "expo-router";

// Importamos componentes adicionales para imágenes y estilos
import { Image, StyleSheet, Text, View } from 'react-native';

// Importamos useEffect para manejar efectos secundarios
import { useEffect } from "react";

// Importamos useNavigation para modificar las opciones de navegación
import { useNavigation } from "expo-router";

// Definimos el componente funcional "capabilities"
export default function capabilities() {
  // Hook para manejar la navegación entre pantallas
  const router = useRouter();

  // Variable para el progreso de pasos (puede usarse en un flujo de introducción)
  const step: number = 2;

  // Hook de navegación para modificar las opciones del encabezado
  const navigation = useNavigation();

  // Ocultamos el encabezado al montar el componente
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Imagen del logotipo o icono */}
      <Image style={styles.image} source={require('../assets/images/Vector.png')} />

      {/* Título principal */}
      <Text style={styles.title}>Welcome to ChatGPT</Text>
      <Text style={styles.subtitle}>Ask anything, get your answer</Text>

      {/* Sección de capacidades */}
      <Text style={styles.subtitle}>Capabilities</Text>

      {/* Icono visual relacionado con capacidades */}
      <Image style={styles.image} source={require('../assets/images/rayo.png')} />
      
      {/* Lista de capacidades de la IA */}
      <View style={styles.border}>
        <Text style={styles.subtitle}>"Remembers what user said earlier in the conversation"</Text>
      </View>

      <View style={styles.border}>
        <Text style={styles.subtitle}>"Allows user to provide follow-up corrections"</Text>
      </View>

      <View style={styles.border}>
        <Text style={styles.subtitle}>"Trained to decline inappropriate requests"</Text>
      </View>

      {/* Indicador de progreso de pasos */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressLine, step === 1 && styles.active]} />
        <View style={[styles.progressLine, step === 2 && styles.active]} />
        <View style={[styles.progressLine, step === 3 && styles.active]} />
      </View>

      {/* Botón para navegar a la siguiente pantalla */}
      <TouchableOpacity style={styles.button} onPress={() => router.navigate("/limitations")}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#343541', // Fondo oscuro
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
  },
  subtitle: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingEnd: 10,
    paddingStart: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#10A37F', // Color verde del botón
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    paddingTop: 10,
  },
  border: {
    borderWidth: 1,
    borderColor: 'dimgray',
    borderRadius: 8,
    backgroundColor: 'dimgray',
    margin: 10,
    width: "90%",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  progressLine: {
    width: 30, 
    height: 5,
    backgroundColor: "gray",
    marginHorizontal: 5,
    borderRadius: 10,
  },
  active: {
    backgroundColor: "#10A37F", // Indica el paso activo en verde
  },
});

