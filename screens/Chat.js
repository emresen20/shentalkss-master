import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { GiftedChat } from 'react-native-gifted-chat'

export default function Chat() {
  const route = useRoute();
  //const { chatId } = route.params;

  const [messages, setMessages] = useState([]);
  const a = firebase.firestore(); // "a" is a use for firebase for this version
  const auth = firebase.auth();
  const [uid, setUID] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setUID(user?.uid);
      setName(user?.displayName);
    })
  })

  useEffect(() => {

    a
      .doc('chats/' + route.params.chatId)
      .onSnapshot(snapshot => {
        setMessages(snapshot.data()?.messages ?? []);
      })

  }, [route.params.chatId]);


  const onSend = (m = []) => {
    a
      .doc("chats/" + route.params.chatId)
      .set({

        messages: GiftedChat.append(messages, m)
      }, { merge: true })

  };
  return (
    <View 
      style={{
        flex:1,
        backgroundColor:"white"
      }}> 
      <GiftedChat
        messages={messages.map(x => ({ ...x, createdAt: x.createdAt?.toDate() }))}
        onSend={messages => onSend(messages)}
        user={{
          _id: uid,
          name: name
        }}
      />
    </View>

  )

}