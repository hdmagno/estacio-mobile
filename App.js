import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Login from "./src/pages/Login";
import ProductCreate from "./src/pages/ProductCreate";
import ProductList from "./src/pages/ProductList";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={({ navigation }) => ({
            title: "",
            headerRight: () => (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("ProductCreate")}
              >
                <Text style={styles.addButtonText}>Novo Produto</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProductCreate"
          component={ProductCreate}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButtonText: {
    color: "#fff",
  },
});
