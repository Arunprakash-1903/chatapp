import { AntDesign, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { auth } from './firebase'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView ,TouchableWithoutFeedback} from 'react-native'
import { Platform } from 'react-native'
import { Keyboard } from 'react-native'
import { TextInput } from 'react-native'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { db } from './firebase'
import * as firebase from "firebase"


const ChatScreen = ({navigation,route}) => {
    const [input,setInput]=useState("");
    const [messages,setMessages]=useState([]);
    const sendMessage=async()=>{
Keyboard.dismiss();
 await db.collection("chats").doc(route.params.id).collection("messages").add({
    timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
    displayName:auth.currentUser.displayName,
    email:auth.currentUser.email,
    image:auth.currentUser.photoURL,
    message:input
})
setInput("")
    }
useLayoutEffect(()=>{
    const unSubcribe=db.collection("chats").doc(route.params.id).collection("messages").orderBy("timeStamp").onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
        
            }))
            ));
          return unSubcribe;

},[route])





    useLayoutEffect(() => {
        navigation.setOptions({
            title:"chat",
            headerTitleAlign:"left",
            headerTitle:()=>(
                <View style={{
                    flexDirection:"row",
                    alignItems:"center"
                }}>
                    <Avatar rounded source={{
                         uri:"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}} />
                        <Text style={{
                            marginLeft:10,
                            color:"white",
                            fontWeight:"bold"
                        }}>{route.params.chatName}</Text>
                </View>
        ),
        headerRight:()=>(<View style={{ 
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            marginRight:20,
            width:80
                 }}>
                 
               
                 
                 
                 
                   <TouchableOpacity activeOpacity={0.5}>
                     <FontAwesome size={24} name="video-camera"  color="white"/>
                     
                     </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.5} >
                      <FontAwesome size={24} name="phone" color="white"/>
                      
                      </TouchableOpacity></View>
                     )
        })


    }, [navigation])
    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor:"white"
            
            }} >
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"} keyboardVerticalOffset={90 } style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
<ScrollView>
{messages.map(({id,data})=>data.email===auth.currentUser.email?(
<View key={id} style={styles.sender}>
    <Avatar containerStyle={{position:"absolute" , right:-5, bottom:-15}}  rounded position="absolute" size={30}  right={-5} bottom={-15} source={{uri:auth.currentUser.photoURL}} />
<Text>{data.message}</Text>

</View>)


:(<View key={id} style={styles.receiver}>
  <Avatar containerStyle={{position:"absolute" , left:-5, bottom:-15}}  rounded position="absolute" size={30}  left={-5} bottom={-15} source={{uri:auth.currentUser.photoURL}} />
<Text style={styles.senderText}>{data.message}</Text>
<Text style={styles.senderName}>{data.displayName}</Text>


</View>))}


</ScrollView>

    <View style={styles.footer}>
        <TextInput placeholder="Type a message" value={input} onChangeText={(text)=>setInput(text)}  style={styles.textInput}/>
        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
        <Ionicons size={24} color="#2B68E6" name="send"/>
        </TouchableOpacity>
    </View>
   
                 </>
                 </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
flex:1,
    },
footer:{
    flexDirection:"row",
    alignItems:"center",
    width:"100%",
    padding:15
},

    textInput:{
        bottom:0,
        height:40,
    marginRight:15,
flex:1,
padding:10,
borderColor:"transparent",
backgroundColor:"#ECECEC",
borderRadius:30,

color:"grey"
    },

    receiver :{
        padding:15,
        backgroundColor:"#2B68E6",
        alignSelf:"flex-start",
        maxWidth:"80%",
        borderRadius:20,
        marginLeft:15,
        marginBottom:20,
        position:"relative"
    },
    sender:{
padding:15,
backgroundColor:"#ECECEC",
alignSelf:"flex-end",
maxWidth:"80%",
borderRadius:20,
marginRight:15,
marginBottom:20,
position:"relative"

    },
    senderName:{
        left:30,
        paddingRight:10,
        fontSize:10,
        color:"white"
    },
    senderText:{
        color:"white",
        fontWeight:"500",
        marginRight:10,
        marginBottom:15


    }
})
