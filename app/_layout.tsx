// Importamos los proveedores de contexto para manejar la autenticación y los datos globales
import { DataContextProvider } from "@/context/dataContext/DataContext";
import { AuthProvider } from "@/context/dataContext/AuthContext";

// Importamos el componente Stack de expo-router para gestionar la navegación entre pantallas
import { Stack } from "expo-router";
import { RootStackParamList } from "@/app/types";

// Definimos el componente principal del layout de la aplicación
export default function RootLayout() {
  return (
    // Proveedor de autenticación para gestionar el estado del usuario en toda la app
    <AuthProvider>
      {/* Proveedor de datos globales para compartir información entre componentes */}
      <DataContextProvider>
        {/* Configuración del stack de navegación */}
        <Stack 
          screenOptions={{ headerShown: false }} // Oculta el encabezado en todas las pantallas
          initialRouteName="welcome" // Define la pantalla de inicio como "welcome"
        >
          {/* Definimos las pantallas disponibles en la aplicación */}
          <Stack.Screen name="Home" options={{ title: "Home" }} />
          <Stack.Screen name="capabilities" options={{ title: "Capabilities" }} />
          <Stack.Screen name="emptyConversation" options={{ title: "Empty Conversation" }} />
          <Stack.Screen name="examples" options={{ title: "Examples" }} />
          <Stack.Screen name="index" options={{ title: "Index" }} />
          <Stack.Screen name="limitations" options={{ title: "Limitations" }} />
          <Stack.Screen name="authentication" options={{ title: "Authentication" }} />
          <Stack.Screen name="welcome" options={{ title: "Welcome" }} />
          <Stack.Screen 
            name="dashboard" 
            options={{ title: "Dashboard", headerShown: false }} // Específicamente oculta el header en esta pantalla
          />
          <Stack.Screen name="register" options={{ title: "Register" }} />
        </Stack>
      </DataContextProvider>
    </AuthProvider>
  );
}
