import React, { useState } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { Icon, Input,Button } from 'react-native-elements'
import { db } from './firebase';

const AddChat = ({navigation}) => {
    const [input, setinput] = useState("");
    const createChat= ()=>{
 db.collection("chats").add({
    chatName:input,
}).then(()=>{navigation.goBack()}).catch(e=>alert(e))
    }
    return (
        <View style={styles.container}>
            <Input
             placeholder="Enter a Chat Name" 
             leftIcon={<Icon name="wechat" size={24} color="black" type="antdesign"></Icon>}
             value={input}
             onChangeText={(text)=>setinput(text)}
             onSubmitEditing={createChat}
             ></Input>
             <Button  title="Add New Chat"  onPress={createChat}/>
        </View> 
    )
}

export default AddChat

const styles = StyleSheet.create({
container:{
    padding:30,
    backgroundColor:"white",
    height:"100%"

}


})
