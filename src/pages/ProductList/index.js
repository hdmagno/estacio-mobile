import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import firebase from "../../config/firebase.config";

const ProductList = ({ navigation }) => {
  // const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  let [editState, setEditState] = useState("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {    
    fetchProducts();    
  }, []);

  const fetchProducts = () => {
    firebase
      .firestore()
      .collection("products")
      .onSnapshot((snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(list);
        setLoading(false);
      });
  }

  const renderProducts = ({ item }) => (
    <View style={styles.items}>
      <View style={styles.label}>
        <Text>Cód: {item.code}</Text>
        <Text style={styles.labelName}>{item.name}</Text>
        <Text>Valor: {item.value}</Text>
        <Text>Quantidade: {item.quantity}</Text>
      </View>
      <View style={styles.action}>
        <TouchableOpacity onPress={() => showEdit(item)} style={styles.button}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteProduct(item.id)}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleEditProduct = async (id, data) => {
    await firebase.firestore().collection("products").doc(id).update(data);
    alert("Produto atualizado com sucesso.");
    fetchProducts();
    closeEdit();    
  };

  const showEdit = (product) => {
    setProductId(product.id);
    setProductCode(product.code);
    setProductName(product.name);
    setProductValue(product.value);
    setProductQuantity(product.quantity);
    setEditState("flex");
  };

  const closeEdit = () => {
    setProductId("");
    setProductCode("");
    setProductName("");
    setProductValue("");
    setProductQuantity("");
    setEditState("none");
  };

  const editBox = () => {
    return (
      <View style={[styles.editContainer, { display: editState }]}>
        <View style={styles.editBox}>
          <View style={styles.editTitle}>
            <Text style={styles.titletext}>Editar produto</Text>
          </View>
          <View style={styles.editform}>
            <TextInput
              style={styles.input}
              placeholder="Código do Produto"
              value={productCode}
              onChangeText={(text) => setProductCode(text)}
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
          </View>
          <View style={styles.editButtons}>
            <TouchableOpacity style={styles.editButton} onPress={closeEdit}>
              <Text style={styles.editButtonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                handleEditProduct(productId, {
                  code: productCode,
                  name: productName,
                  value: productValue,
                  quantity: productQuantity,
                })
              }
            >
              <Text style={styles.editButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const handleDeleteProduct = (productId) => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir esse produto?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel",
      },
      { text: "Excluir", onPress: () => deleteProduct(productId) },
    ]);
  };

  const deleteProduct = async (id) => {
    await firebase.firestore().collection("products").doc(id).delete();

    alert("Produto excluído com sucesso.");

    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <View style={styles.container}>
      {editBox()}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lista de produtos</Text>
      </View>
      <FlatList
        ListEmptyComponent={
          loading 
            ? <ActivityIndicator size="large" color="#0000ff" /> 
            : <Text>Sem registros</Text>
          }
        data={products}
        renderItem={renderProducts}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  titleContainer: {
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 5
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  items: {
    flex: 1,
    backgroundColor: "#f8c963",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 8,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    width: "100%"
  },
  label: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "60%",
  },
  action: {
    flexDirection: "row",
    gap: 5,
  },
  labelName: {
    fontSize: 16,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#e4605e",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  editContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  editBox: {
    backgroundColor: "#fff",
    width: 300,
    padding: 20,
    borderRadius: 5,
  },
  buttons: {
    width: "65%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    width: "35%",
    paddingVertical: 5
    // aspectRatio: 2.1,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  titletext: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  input: {
    paddingHorizontal: 12,
    width: "100%",
    height: 30,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  editform: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default ProductList;
