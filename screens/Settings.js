import React,{useEffect,useState} from "react";
import { Text, View } from "react-native";
import { Avatar,Title,Subheading,Button } from "react-native-paper";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function Settings(){
    
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");

    useEffect(() =>{
        auth.onAuthStateChanged(user =>{
            setName(user?.displayName ?? "" );
            setEmail(user?.email ?? "" );
        })
    },[]);
    const auth = firebase.auth();
    return(
        <View 
            style={{
                alignItems:"center",
                marginTop:15
            }}>
            <Avatar.Text label={name.split(" ").reduce((prev, current) => prev + current[0], "" )}/>
            <Title> {name} </Title>
            <Subheading> {email} </Subheading>
            <Button onPress={()=> auth.signOut()}> Sign Out</Button>

        </View>
    )

}