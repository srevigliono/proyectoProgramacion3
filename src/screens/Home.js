import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';

export default class HomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    db.collection('posts')
      .orderBy('createdAt')
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            data: doc.data(),
          });
        });
        this.setState({
          posts: posts,
          loading: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Posts</Text>

        {!this.state.loading && (
          <FlatList
            data={this.state.posts}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <Text style={styles.postText}>{item.data.text}</Text>
                <Text style={styles.postUser}>{item.data.user}</Text>
                <Text style={styles.postDate}>
                {new Date(item.data.createdAt).toLocaleString()}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    );
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
});