import React from 'react';
import { View, Text, Button, StyleSheet, ListView, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

export default class ToDo extends React.Component {
  // Yapılacaklar ekranına ulaşmak için başlık oluşturma
  static navigationOptions = {
    title: 'YAPILACAKLAR',
 headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#ECD9DD',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: { fontSize: 18 },
  };

  // propslara erişmek için kurucu metot oluşturma
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
      inputValue: '',
      dataSource: ds.cloneWithRows([]),
    };
    //bind işlemleri
    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);
  }

//render işleminden sonra çalışacak olay, içerisinde veritabanı bilgilerini tutup oluşturuyor
  componentDidMount() {
    //Firebase ayarlama (config) bilgilerinin tanımlanması
    var firebaseConfig = {
      apiKey: 'AIzaSyA9RkkH9VBst_7FpIsk5bxPDhGBKDe33rQ',
      authDomain: 'app1-38a33.firebaseapp.com',
      databaseURL: 'https://app1-38a33.firebaseio.com',
      projectId: 'app1-38a33',
      storageBucket: 'app1-38a33.appspot.com',
      messagingSenderId: '644588057976',
      appId: '1:644588057976:web:63d75aa2767d461795448d',
      measurementId: 'G-7R79PK9VC7',
    };

    // Firebase'nin oluşturulması
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  
  _handleTextChange = (value) => {
    const inputValue = value;
    this.setState(() => ({
      inputValue,
    }));
  }
//Bir veri girişi yapıldıysa veriyi eklemek için olayın çalıştırılması
  _handleSendButtonPress = () => {
    if (!this.state.inputValue) {
      return;
    }
//Veri bloglarının içerisine girilen verilerin eklenmesi ve yeni giriş değeri için alanın temizlenmesi
    const textArray = this.state.dataSource._dataBlob.s1;
    textArray.push(this.state.inputValue);
    this.setState(() => ({
      dataSource: this.state.dataSource.cloneWithRows(textArray),
      inputValue: '',
    }));
  };
//Eklenen verinin id'sine göre silme işleminin gerçekleştirilmesi
  _handleDeleteButtonPress = (id) => {
    this.setState((a) => {
      const newItem = a.dataSource._dataBlob.s1.filter((item, i) => (parseInt(id) !== i));
      return {
        dataSource: this.state.dataSource.cloneWithRows(newItem), 
      }
    });
  };

//Giriş ekranına yönlendiren fonksiyon
  onSignOutPressed = () => {
        return  this.props.navigation.navigate('Login');
                       }
  
  render() {
    return (
       <ImageBackground
         source={{uri: 'https://cdn.pixabay.com/photo/2018/06/20/07/44/planner-3485992_960_720.jpg'}}
         style={styles.backgroundImage}
         >
 <View style={styles.container}>
        <View style={styles.formView}>
          <TextInput
            style={styles.inputForm}
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            placeholder="Yeni bir görev giriniz :)"
          />
          <Button
            style={styles.cikisButton}
            title="Ekle"
            onPress={this._handleSendButtonPress} >
          </Button>
        </View>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => {
            const handleDelete = () => {
              return this._handleDeleteButtonPress(rowID);
            }
            return (
              <View style={styles.todoItem}>
                <Text style={styles.todoText}>{rowData}</Text>
                <Button
                  title="Sil"
                  onPress={handleDelete}
                  style={styles.deleteButton}
                />
              </View>
              );
            }
          }
        />
         <TouchableOpacity
                style={styles.cikisButton}
                onPress={this.onSignOutPressed}>
                <Text>  <Ionicons name="md-home" size={14} color="Purple" /> Giriş Sayfasına             Git</Text>
                </TouchableOpacity>
        <Text>GG</Text>
      </View>
</ImageBackground>
    );
  }
}

 const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cikisButton:{
    borderColor:'#5A4649',
    padding:5,
    margin:15,
    fontSize:14,
    height:40,
    width:250,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ECD9DD',
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    borderWidth:2,
},
  formView: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
  },
  inputForm: {
    backgroundColor: '#fff',
    width: 320,
    height: 40,
    padding: 8,
    marginBottom: 8,
  },
  todoItem: {
    alignItems: 'center',
    padding: 8,
    width: 320,
    borderBottomWidth: 1.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    border: '1 solid #333',
    flex: 1,
    flexDirection: 'row',
  },
  todoText: {
    flex: 1,
  },
 backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
     backgroundColor: 'transparent'
}
});