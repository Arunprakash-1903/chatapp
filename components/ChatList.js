import { auth, db } from '../screens/firebase'
import React, {  useEffect,  useState } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

const ChatList = ({id,chatName,enterChat}) => {
    const [chatMessages,setchatMessage]=useState([]);
    useEffect(() => {
        const unsubcribe=db.collection("chats").doc(id).collection("messages").orderBy("timeStamp","desc").onSnapshot((snapshot)=>setchatMessage(snapshot.docs.map((doc)=>doc.data())))
        return unsubcribe
    },[]);
    return (
        <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
            <Avatar rounded source={{
                
                uri: chatMessages?.[0]?.photoURL||"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
            }}/>
            <ListItem.Content> 
                <ListItem.Title style={styles.Title}>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                          {chatMessages?.[0]?.diplayName}:{chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
           
        </ListItem>
    )
}

export default ChatList

const styles = StyleSheet.create({
    Title:{
        fontWeight:"bold"
    }
})
