import React, {useState}from "react";
import { Text, View } from "react-native";
import { Button, TextInput ,Subheading} from "react-native-paper";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigation } from "@react-navigation/native";


export default function SignUp(){
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");

    const [isloading,setIsloading] =useState(false);
    const [error,setError] =useState("");

    const navigation = useNavigation();
    const auth = firebase.auth();

    const createAccount = async ()=>{
        setIsloading(true)
        try{
            const response = await 
            auth
            .createUserWithEmailAndPassword(email,password);
             
          await  response.user.updateProfile({displayName:name});
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
            <TextInput label="Name" value={name} onChangeText={(text) => setName(text)}/>
            <TextInput 
                keyboardType="email-address"
                value={email} onChangeText={(text) => setEmail(text)}
                style={{
                    marginTop:12,
                }}
                label="Email"/>
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
                    onPress={()=> navigation.navigate("SignIn")}
                    compact={true}>Sign In</Button>
                    <Button 
                    mode="contained" 
                    onPress={ () => createAccount()
                     }
                     loading={isloading}> 
                    Sign Up</Button>
                </View>

        </View>
    )

}