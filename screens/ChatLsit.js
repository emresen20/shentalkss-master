import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { List, Avatar, Divider, FAB, Portal, Dialog, Button, TextInput } from 'react-native-paper';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigation } from "@react-navigation/native";

export default function ChatLsit() {

    const [isDialogVisiable, setIsDialogVisiable] = useState(false);
    const auth = firebase.auth();
    const a = firebase.firestore();
    const [email, setEmail] = useState("");
    const [sendEmail, setSendEmail] = useState("");
    const [isloading, setIsloading] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setEmail(user?.email ?? "");
        })


    }, [])

    const navigation = useNavigation();

    const createChat = async () => {
        if (!email || !sendEmail) return;
        setIsloading(true);
        const response = await firebase
            .firestore()
            .collection("chats")
            .add({
                user: [email, sendEmail]
            });
        setIsloading(false);
        setIsDialogVisiable(false);
        navigation.navigate("Chat", { chatId: response.id })

    }

    const [chats, setChats] = useState([]);
    useEffect(() => {
        return a
            .collection("chats")
            .where("user", "array-contains", email)
            .onSnapshot((querySnapshot) => {
                setChats(querySnapshot.docs)
            });
    }, [email]);

    return (
        <View style={{ flex: 1 }}>

            {chats.map((chat) => (
                <React.Fragment key={chat.id}>
                    <List.Item
                        title={chat.data().user.find((x) => x !== email)}
                        description={chat.data().messages && chat.data().messages.length > 0 ? chat.data().messages[0].text : ''}
                        left={() =>
                            <Avatar.Text
                                label={chat.data().user.find((x) => x !== email)
                                    .split(" ")
                                    .reduce((prev, current) => prev + current[0], "")}
                                size={58}

                            />
                        }
                        onPress={() => navigation.navigate("Chat", { chatId: chat.id })}
                    />
                    <Divider />
                </React.Fragment>
            ))}


            <Portal>
                <Dialog visible={isDialogVisiable} onDismiss={() => setIsDialogVisiable(false)}>
                    <Dialog.Title>New Chat</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Enter user email"
                            keyboardType="email-address"
                            value={sendEmail}
                            onChangeText={text => setSendEmail(text)} />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            buttonColor="green"
                            textColor="white"
                            onPress={() => createChat()}
                            loading={isloading}>
                            SAVE
                        </Button>
                        <Button onPress={() => setIsDialogVisiable(false)}>CANCEL</Button>
                    </Dialog.Actions>

                </Dialog>
            </Portal>
            <FAB style={{
                position: "absolute",
                bottom: 16,
                right: 16,
            }}
                icon="plus"
                onPress={() => setIsDialogVisiable(true)} />
        </View>
    )

}