import { auth } from './firebase';
import React,{useState,useEffect} from 'react'

import { StatusBar } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native'
import {Button,Input,Image} from "react-native-elements"

const LoginScreen = ({navigation}) => {
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    useEffect(() => {
        const unSubcribe=auth.onAuthStateChanged((authUser)=>{
            if (authUser) {
                navigation.replace("Home")
            }
        })
        
        return unSubcribe;
        
    
    }, [])
    const  login = ()=>{
     if(email){
        auth.signInWithEmailAndPassword(email,password)
   
        .catch(err => alert(err.message))
    }else{
        alert("Email can't be empty")
    }}
    return (
        <KeyboardAvoidingView style={styles.Container} type="padding">
            <StatusBar style="light"/>
            <Image source={{
                uri:"https://www.politico.com/news-tips/logo-signal.png"}} style={{width:200,height:200}} />
                <View style={styles.inputContainer}>
                <Input placeholder="Email" type="email" value={email} onChangeText={text=>setEmail(text)} 
                 autoFocus />
                <Input placeholder="password" type="password" secureTextEntry value={password} onChangeText={text=>setPassword(text)} />
                </View>
                <Button  containerStyle={styles.Button} title="Login" onPress={login}/>
                <Button onPress={()=>navigation.navigate("SignUp")} containerStyle={styles.Button} title="Sign Up" type="outline"/>
                <View style={{height:100,}}/>
                </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    Container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,

    },
    inputContainer:{
width:300
    },
    Button:{
    marginTop:10,
    width:200
    }
})
