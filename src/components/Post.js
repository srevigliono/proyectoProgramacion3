import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';


export default class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userLiked: false,
            cantidad: this.props.item.data.likes.length
        }
    }

    componentDidMount() {
        if (this.props.item.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                userLiked: true
            })
        }
    }


    handleLike(postId) {
        db.collection('posts').doc(postId).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
        })
        .then(()=> this.setState({
            userLiked: true,
            cantidad: this.props.item.data.likes.length
        }))
        .catch((error) => console.error("Error adding like: ", error));
    }

    handleUnlike(postId) {
        db.collection('posts').doc(postId).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
        })
        .then(()=> this.setState({
            userLiked: false,
            cantidad: this.props.item.data.likes.length
        }))
        .catch((error) => console.error("Error removing like: ", error));
    }

    render() {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.postText}>{this.props.item.data.text}</Text>
                <Text style={styles.postUser}>Publicado por: {this.props.item.data.user}</Text>
                <Text style={styles.postDate}>
                    {new Date(this.props.item.data.createdAt).toLocaleString()}
                </Text>
                <View style={styles.likesContainer}>
                    <Text style={styles.likesCount}>Likes: {this.props.item.data.likes.length}</Text>
                    {this.state.userLiked ? (
                        <TouchableOpacity
                            style={styles.likeButton}
                            onPress={() => this.handleUnlike(this.props.item.id)}
                        >
                            <Text style={styles.likeButtonText}>Ya no me gusta</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.likeButton}
                            onPress={() => this.handleLike(this.props.item.id)}
                        >
                            <Text style={styles.likeButtonText}>Me gusta</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#333',
    },
    postContainer: {
      marginBottom: 20,
      padding: 15,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      backgroundColor: '#f9f9f9',
    },
    postText: {
      fontSize: 18,
      marginBottom: 10,
      color: '#333',
    },
    postUser: {
      fontSize: 16,
      fontStyle: 'italic',
      color: '#555',
    },
    postDate: {
      fontSize: 14,
      color: '#888',
    },
    likesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    likesCount: {
      fontSize: 16,
      marginRight: 15,
      color: '#333',
    },
    likeButton: {
      padding: 5,
      backgroundColor: '#0066cc',
      borderRadius: 5,
    },
    likeButtonText: {
      color: '#fff',
      fontSize: 14,
    },
  });
  
