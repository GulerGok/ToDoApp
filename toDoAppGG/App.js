import React from 'react';
import { createStackNavigator } from 'react-navigation'; // package.json ->    "react-navigation": "2.0.0-beta.6" olarak kullanımı günceldir :)
import * as firebase from 'firebase'; //firebase kullanımı için gerekli kütüphane tanımı
// Ekranların import edilmesi
import ToDo from './GGScreens/ToDo';
import Login from './GGScreens/Login';
import SignUp from './GGScreens/SignUp';

//Sayfalar arası yönlendirme işleminin gerçekleşebilmesi için gerekli ekran tanımlarını içeren StackNavigator'ün oluşturulması
export default createStackNavigator({
  Login: {
    screen: Login, //Giriş ekranına yönlendirir
  },
  ToDo: {
    screen: ToDo, //Yapılacaklar ekranına yönlendirir
  },
  SignUp: {
    screen:SignUp, //Kaydol ekranına yönlendirir
  },
});
