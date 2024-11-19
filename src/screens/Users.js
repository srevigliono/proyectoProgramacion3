import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput, FlatList } from 'react-native';
import { db } from '../firebase/config';


export default class Users extends Component {
 constructor(props) {
   super(props);
   this.state = {
     usuarios: [],
     filtrado: [],
     searchValue: '',
   };
 }


 componentDidMount() {
   db.collection('users').onSnapshot((docs) => {
     let users = [];
     docs.forEach((doc) => {
       users.push({
         data: doc.data(),
       });
     });
     this.setState({
       usuarios: users,
       filtrado: users,
     });
   });
 }


 handleSearch = (text) => {
   this.setState({
     searchValue: text,
     filtrado: this.state.usuarios.filter((user) =>
       user.data.user?.toLowerCase().includes(text.toLowerCase())
     ),
   });
 };


 render() {
   return (
      
     <SafeAreaView style={styles.container}>
       <Text style={styles.titulo}>Usuarios de la plataforma</Text>
       <TextInput
         style={styles.searchInput}
         placeholder="Buscar por nombre de usuario"
         value={this.state.searchValue}
         onChangeText={this.handleSearch}
       />


       {this.state.filtrado.length === 0 ? (
         <Text style={styles.sinresultados}>No se encontraron usuarios</Text>
       ) : (
         <FlatList
           data={this.state.filtrado}
          
           renderItem={({ item }) => (
             <View style={styles.usuario}>
               <Text style={styles.username}>{item.data.user}</Text>
               <Text style={styles.mail}>{item.data.mail}</Text>
             </View>
           )}
           contentContainerStyle={styles.lista}
         />
       )}
     </SafeAreaView>
   );
 }
}


const styles = {
 container: {
   flex: 1,
   padding: 20,
   backgroundColor: '#fff',
 },
 titulo: {
   fontSize: 28,
   fontWeight: 'bold',
   textAlign: 'center',
   marginBottom: 20,
   color: '#333',
 },
 searchInput: {
   height: 50,
   borderColor: '#ddd',
   borderWidth: 1,
   borderRadius: 10,
   paddingHorizontal: 15,
   fontSize: 16,
   marginBottom: 20,
   alignSelf: 'center',
   width: '80%',
 },
 sinresultados: {
   textAlign: 'center',
   fontSize: 18,
   color: '#999',
   marginTop: 20,
 },
 usuario: {
   padding: 15,
   borderBottomWidth: 1,
   borderBottomColor: '#ddd',
 },
 username: {
   fontSize: 18,
   fontWeight: 'bold',
 },
 mail: {
   fontSize: 16,
   color: '#555',
 },
 lista: {
   paddingBottom: 20,
 },
};

