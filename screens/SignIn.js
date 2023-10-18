import React, {useState}from "react";
import { Text, View } from "react-native";
import { Button, TextInput ,Subheading} from "react-native-paper";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigation } from "@react-navigation/native";


export default function SignIn(){
   
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");

    const [isloading,setIsloading] =useState(false);
    const [error,setError] =useState("");

    const navigation = useNavigation();
    const auth = firebase.auth();

    const signIn = async ()=>{
        setIsloading(true)
        try{
        await   auth.signInWithEmailAndPassword(email,password);
            navigation.popToTop();
        } catch(e){
            setIsloading(false);
            setError(e.message);
        }
   
    }
    return(
        <View 
            style={{
                margin: 16,

            }}>
            { !!error && (<Subheading style={{
                color:"red",
                textAlign:"center",
                marginTop:16
            }}> 

            {error} 

            </Subheading>)}
            
            <TextInput 
                value={email} 
                onChangeText={(text) => setEmail(text)}
                style={{
                    marginTop:12,
                }}
                label="Email"
                keyboardType="email-address"/>
            <TextInput 
                secureTextEntry
                value={password} onChangeText={(text) => setPassword(text)}
                style={{
                    marginTop:11
                }}
                label="Password"/>
                <View 
                    style={{
                        flexDirection:"row",
                        marginTop:16,
                        justifyContent:"space-between"
                    }}>
                    <Button 
                    onPress={()=> navigation.navigate("SignUp")}
                    compact={true}>Sign Up</Button>
                    <Button 
                    mode="contained" 
                    onPress={ () => signIn()
                     }
                     loading={isloading}> 
                    Sign In</Button>
                </View>

        </View>
    )

}