import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      email: "",
      posts: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({ email: auth.currentUser.email });

    db.collection("users")
      .where("mail", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let userArr = [];
        docs.forEach((doc) => {
          userArr.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        
        this.setState({
          user: userArr[0].data.user,
        });
      });
    

    db.collection("posts")
      .where("user", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let postArray = [];
        docs.forEach((doc) => {
          postArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        postArray.sort((a, b) => b.data.createdAt - a.data.createdAt); 
        this.setState({
          posts: postArray,
          isLoading: false,
        });
      });
  }

  handleLogout(){
    auth.signOut()
    .then(() => {
      this.props.navigation.navigate("Login");
    })
    .catch((error) => console.error("Error al cerrar sesión: ", error));
  }

  handleDeletePost = (postId) => {
  db.collection("posts")
    .doc(postId)
    .delete()
    .then(() => {
      console.log("Post eliminado con éxito.");
    })
    .catch((error) => {
      console.log("Error al eliminar post: ", error);
    });
};


render() {
  const { user, email, posts, isLoading } = this.state;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.info}>Usuario: {user}</Text>
      <Text style={styles.info}>Email: {email}</Text>
      <Text style={styles.info}>Posteos publicados: {posts.length}</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCaja}>
            <Post item={item} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => this.handleDeletePost(item.id)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={() => this.handleLogout()}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 20,
  backgroundColor: "white",
  alignItems: "center",
},
title: {
  fontSize: 28,
  fontWeight: "bold",
  marginBottom: 20,
  color: "rgb(90, 90, 90)",
  textAlign: "center",
},
info: {
  fontSize: 18,
  marginBottom: 10,
  color: "rgb(90, 90, 90)",
  textAlign: "center",
},
postCaja: {
  width: "100%",
  padding: 15,
  marginBottom: 15,
  borderColor: "black",
  borderRadius: 8,
  backgroundColor: "#f9f9f9",
},
deleteButton: {
  padding: 10,
  backgroundColor: "rgb(255, 77, 77)",
  borderRadius: 5,
  marginTop: 10,
},
deleteButtonText: {
  color: "white",
  textAlign: "center",
},
logoutButton: {
  marginTop: 20,
  padding: 15,
  backgroundColor: "gray",
  borderRadius: 8,
  width: "100%",
},
logoutButtonText: {
  color: "white",
  textAlign: "center",
  fontSize: 16,
},
loading: {
  fontSize: 18,
  textAlign: "center",
  color: "black",
},
});