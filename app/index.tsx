import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// Componente de pantalla de presentación (Splash Screen)
export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Configura un temporizador para redirigir a la pantalla de ejemplos después de 8 segundos
    const timer = setTimeout(() => {
      router.push("/examples"); // Cambia la ruta según sea necesario
    }, 8000);
    
    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Imagen del logo en el centro de la pantalla */}
      <Image source={require("../assets/images/Frame 1.png")} style={styles.logo} />
    </View>
  );
}

// Estilos para la pantalla de presentación
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#343541', // Color de fondo oscuro
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain", // Ajusta la imagen manteniendo la relación de aspecto
  },
});