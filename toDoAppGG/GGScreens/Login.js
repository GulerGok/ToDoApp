import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native';
import * as firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import ToDo from './ToDo';
import SignUp from './SignUp';
import { Ionicons } from '@expo/vector-icons';

class Login extends Component {
 // Giriş ekranına ulaşmak için başlık oluşturma
  static navigationOptions = {
    title: 'GİRİŞ',
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
//error,loggedIn ve loading için ilk durum atamalarının yapılması
    this.state = {
      //email: '',password: '',
      error: '',
      loggedIn: null,
      loading: false,
    };
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
 //giriş başarılı ise onLoginsuccess fonsiyonunu çalıştırılmas 
  renderContent = () => {
    if (this.state.loggedIn == true) {
      this.onLoginsucces;
    }
  };

  //Giriş Yapmak için oluşturulan fonsiyon. Başarılıysa onLoginsuccessi çalıştırır değise hatayı bildirir
  onBottomPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginsucces)
      .catch(error => { 
        var errorMessage = error.message;
        this.setState({
          errorMessage,
          loading: false,
          error: errorMessage,
        });
      });
  };
  //Girişin başarılı olduğu durumlarda çalışan fonksiyondur ve kullanıcıyı ToDo(Yapılacaklar) Ekranına yönlendirir.
  onLoginsucces = () => {
    this.setState({
      error: '',
      loading: true,
      durum: 'Giriş başarılı',
    });
    return this.props.navigation.navigate('ToDo');
  };

  //Yenı Kullanıcı Oluşturmak için kullanıcıyı SignUp(Kaydol) ekranına yönlendirir.
  onSignUpPressed = () => {
    return this.props.navigation.navigate('SignUp');
  };

  render() {
    return (
      <ImageBackground
        source={{
          uri:
            'https://cdn.pixabay.com/photo/2018/06/20/07/44/planner-3485992_960_720.jpg',
        }}
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <View>{this.renderContent()}</View>
  
          <TextInput
            placeholder="Email Hesabınız:"
            style={styles.input}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <TextInput
            placeholder="Şifreniz:"
            style={styles.input}
            value={this.state.password}
            KeyboardType="default"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />

          <TouchableOpacity
            style={styles.girisButton}
            onPress={this.onBottomPress}>
            <Text> <Ionicons name="md-log-in" size={14} color="Purple" /> Giriş Yap  </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.girisButton}
            onPress={this.onSignUpPressed}>
            <Text>
              <Ionicons name="md-person-add" size={14} color="Purple" /> Yeni
              Kullanıcı Oluştur
            </Text>
          </TouchableOpacity>

          <Text style={styles.errortext}>{this.state.error}</Text>
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
  input: {
    height: 40,
    width: 250,
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: '#E36477',
    borderColor: '#5A4649',
    borderWidth: 2,
    padding: 5,
    margin: 15,
    alignItems: 'center',
  },
  errortext: {
    fontSize: 14,
    color: 'black',
    alignSelf: 'center',
    padding: 5,
    margin: 15,
    height: 40,
    width: 250,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
  },
  girisButton: {
    borderColor: '#5A4649',
    padding: 5,
    margin: 15,
    fontSize: 14,
    height: 40,
    width: 250,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ECD9DD',
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    borderWidth: 2,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
export default Login;
