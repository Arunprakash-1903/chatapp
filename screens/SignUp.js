import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'

import { StatusBar } from 'react-native'
import { StyleSheet,  View} from 'react-native'
import {Text ,Button,Input} from 'react-native-elements'
import { auth } from './firebase'

const SignUp = ({navigation}) => {
    const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [imageUrl,setImageUrl]=useState("");
const signup=() =>{
    auth.createUserWithEmailAndPassword(email,password)
    .then(authUser =>{
authUser.user.updateProfile({
    displayName:name,
    photoURL:imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
})
    }).then(()=>{navigation.navigate("Login")}).catch((err)=>
    alert(err.message)
)
}


    return (
        <KeyboardAvoidingView style={styles.Container} type="padding">
             <StatusBar style="light"/>
           
            <View style={styles.inputContainer}>
            <View style={styles.Text}> 
            <Text h3 >Create  Account</Text>
            </View>
          
            <Input placeholder="Name" type="text" autoFocus value={name} onChangeText={text=>setName(text)}/>
            <Input placeholder="Email" type="email" value={email} onChangeText={text=>setEmail(text)} />
            <Input placeholder="Password" type="password"  secureTextEntry value={password} onChangeText={text=>setPassword(text)}/>
        <Input placeholder="Image URL (optional)" type="text" value={imageUrl} onChangeText={text=>setImageUrl(text)} onSubmitEditing={signup}/>
            </View>
            <Button containerStyle={styles.Button} raised title="Sign Up" onPress={signup}/>
     </KeyboardAvoidingView>
    )
}

export default SignUp

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
