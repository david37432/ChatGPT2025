import { Button, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from 'react-native';
import { useEffect } from "react";

// Componente de pantalla de capacidades y limitaciones
export default function Capabilities() {
  const router = useRouter();
  const step: number = 3;
  const navigation = useNavigation();
  
  useEffect(() => {
    // Oculta la cabecera de navegación
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Imagen decorativa en la parte superior */}
      <Image style={styles.image} source={require('../assets/images/Vector.png')} />
      
      {/* Título y subtítulo */}
      <Text style={styles.title}>Welcome to ChatGPT</Text>
      <Text style={styles.subtitle}>Ask anything, get your answer</Text>
      
      {/* Sección de limitaciones */}
      <Text style={styles.subtitle}>Limitations</Text>
      <Image style={styles.image} source={require('../assets/images/Frame.png')} />
      
      {/* Lista de limitaciones */}
      <View style={styles.border}>
        <Text style={styles.subtitle}>
          "May occasionally generate incorrect information"
        </Text>
      </View>

      <View style={styles.border}>
        <Text style={styles.subtitle}>
          "May occasionally produce harmful instructions or biased content"
        </Text>
      </View>

      <View style={styles.border}>
        <Text style={styles.subtitle}>
          "Limited knowledge of world and events after 2021"
        </Text>
      </View>

      {/* Indicador de progreso */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressLine, step === 1 && styles.active]} />
        <View style={[styles.progressLine, step === 2 && styles.active]} />
        <View style={[styles.progressLine, step === 3 && styles.active]} />
      </View>
      
      {/* Botón de autenticación */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.navigate("/autentication")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para la pantalla de capacidades
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#343541',
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
    backgroundColor: '#10A37F',
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
    backgroundColor: "#10A37F", // Verde en la página activa
  },
});
