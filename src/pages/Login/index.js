import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("1234");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      setUsername("");
      setPassword("");
      navigation.navigate("ProductList");
    } else {
      alert("Nome de usuário ou senha inválidos.");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../../assets/gestão-de-estoque.png")} />
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={(text) => setUsername(text.trim())}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text.trim())}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 100,
  },
  input: {
    width: "80%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    width: "80%",
    backgroundColor: "#007AFF",
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center"
  }
});

export default Login;
