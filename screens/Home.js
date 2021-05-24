import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import ChatList from '../components/ChatList'
import { auth, db } from './firebase'
import { AntDesign,SimpleLineIcons } from '@expo/vector-icons'; 

const Home = ({navigation}) => {
    const [chats,setChats]=useState([])
    const signout=()=>{
        auth.signOut().then(()=>{
            navigation.replace("Login");
        })
    }
    useLayoutEffect(() => {
        navigation.setOptions({
title:'signal',
headerStyle:{
    backgroundColor:"white",
   
  
},
headerTitleStyle:{
    color:"black",
    textAlign:"center",
    marginRight:40
},
headerLeft: ()=>(<View style={{marginLeft:10}}>
    <TouchableOpacity onPress={signout} activeOpacity={0.5}><Avatar rounded source={{uri: auth?.currentUser?.photoURL}} /></TouchableOpacity>
    
</View>),
headerRight:()=>(<View style={{ 
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginRight:20,
    width:80
         }}>
         
       
         
         
         
           <TouchableOpacity activeOpacity={0.5}>
             <AntDesign size={24} name="camerao" />
             
             </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigation.navigate("AddChat")}}>
              <SimpleLineIcons size={24} name="pencil" />
              
              </TouchableOpacity></View>
             )
        })
     
    }, [navigation])

useEffect(() => {
    const unSubcribe=db.collection("chats").onSnapshot(snapshot=>setChats(snapshot.docs.map(doc=>({
id:doc.id,
data:doc.data()

    }))
    ));
  return unSubcribe;
    
    
        
}, [])
const enterChat= (id,chatName)=>{
navigation.navigate("ChatScreen",{
    id,
    chatName,
})
}

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}> 
            {chats.map(({id,data:{chatName}})=>(<ChatList enterChat={enterChat} chatName={chatName} key={id} id={id}/>))}
            </ScrollView>
      
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        height:"100%"
    }
    
})
