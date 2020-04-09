import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

class Signup extends React.Component {
// Kaydol ekranına ulaşmak için başlık oluşturma
  static navigationOptions = {
    title: 'KAYDOL',
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
//email,şifre ve hata için ilk durum atamalarının yapılması
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }
//email ve şifrenin durumunu sabitte tutar ve şifrenin 6 karakterden az olup olmadığını kontrol eder azsa uyarı verir
  handleSignUp = () => {
    const { email, password } = this.state;
    if (password.length < 6) {
      console.log('Your text is less than what is required.');
      this.setState({
        error: 'Şifreniz en az 6 karakter içermeli.',
      });
    }
//firebase veritabnımızda oturum oluşturma işlemini gerçekleştirip Login ekranına gider. Hataları ve öncesinde kaydın mevcutluk durumunu bildirir.   
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password) 
      .then(() => this.props.navigation.navigate('Login'))
       .catch(error => { 
        var errorMessage = error.message;
        this.setState({
          errorMessage,
          loading: false,
          error: errorMessage,
        });
      })
      .catch(error => console.log('Kullanıcı hesabınız zaten mevcut :)'));
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
          <TextInput
            style={styles.input} 
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholder="Emailiniz:"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder="Şifreniz:"
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.girisButton}
            onPress={this.handleSignUp}>
            <Text> <Ionicons name="md-thumbs-up" size={14} color="Purple" /> Kaydol  </Text>
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
});

export default Signup;
