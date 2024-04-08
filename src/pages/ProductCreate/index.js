import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "../../config/firebase.config";

const ProductCreate = ({ navigation }) => {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const handleSaveProduct = async () => {
    const product = await firebase.firestore().collection("products").add({
      code: productCode,
      name: productName,
      value: productValue,
      quantity: productQuantity,
    });

    alert(`Produto: ${productName} cadastrado`);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cadastre o produto</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Código do Produto"
          value={productCode}
          onChangeText={(text) => setProductCode(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={productName}
          onChangeText={(text) => setProductName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor do Produto"
          value={productValue}
          onChangeText={(text) => setProductValue(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade do Produto"
          value={productQuantity}
          onChangeText={(text) => setProductQuantity(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleSaveProduct}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 20,
  },
  form: {
    width: "100%"
  },
  titleContainer: {
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  input: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  addButton: {
    width: "100%",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductCreate;
