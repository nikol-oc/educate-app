import { StackScreenProps } from '@react-navigation/stack'
import axios from 'axios';
import React from 'react'
import { Alert } from 'react-native';
import { View, Text, Image, ScrollView, StyleSheet, Button } from 'react-native';
import restApi from '../api/ApisConfig';
import { InputG } from '../components/inputGeneral'
import { useForm } from '../hooks/useForm'

interface Props extends StackScreenProps<any, any> { };

export const LoginScreen = ({ navigation }: Props) => {

    //formulario de login
    const { formulario, onChangeText, updateCompleteForm } = useForm({
        email: "",
        password: ""
    })

    const login = async ()=>{
         //Call API through POST
         let body = {
            email: formulario.email,
            password: formulario.password
         }
         console.log(body)
 
         try {
            axios.post(`http://192.168.0.102:3977/api/login`, body )
            .then(
                response => {
                  
                    let user = response.data.user;
                    console.log(user)
                    //Check results
                    if ( user.length !== 0 ){
                        Alert.alert("Login", " Bienvenido "+ user.name)
                    }else{
                        Alert.alert("Error en login");
                    }
                }
            )
        } catch (e) {
            console.log(e)
            Alert.alert("Ha ocurrido un error");
        }
    }
    return (
        <ScrollView>
            <View style={[styles.container]}>
                <View style={styles.logoContainer}>
                    <Image style={[styles.logo]} source={require('../assets/logoEducate.png')} />
                </View>
                <View style={[styles.bodyContainer]}>
                    <Text style={[styles.note]}>Bienvenido a
                        <Text style={{ color: '#ff5773' }}> EDUCATE
                        </Text>
                    </Text>
                    <Text style={{ fontSize: 18, marginTop: 10, color: '#ABADBC', textAlign: 'center' }}> Inicia Sesión y empieza a Aprender
                    </Text>

                    <InputG
                        label="Correo Electrónico"
                        value={formulario.email}
                        campo="email"
                        type="emailAddress"
                        onChange={onChangeText}
                        marginBottom={10}
                    />
                    <InputG
                        label="Contraseña"
                        value={formulario.password}
                        campo="password"
                        secretText={true}
                        type="password"
                        onChange={onChangeText}
                    />
                    {/* Para ver qué información actualmente está en el formulario 
                    <Text>
                        {JSON.stringify(formulario,null, 2)}
                    </Text> */}
                    <View style={{marginVertical:20, marginBottom:250}}>
                        <Button
                            onPress={login}
                            title="Iniciar Sesión"
                            color="#17A2B8"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>


                </View>
            </View>
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20
    },
    logoContainer: {
        width: '100%',
        padding: 2
    },
    logo: {
        alignSelf: 'center'
    },
    bodyContainer: {
        justifyContent: 'center',
        width: '82%',
        alignSelf: 'center',
        backgroundColor: 'white'
    },
    note: {
        marginTop: 80,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    txtForgotPassword: {

    },
    row: {

        color: '#323c37',
    },
    entryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerHuella: {
        left: 0,
        position: 'absolute',
    },
    fingerprintLogo: {
        width: '100%',
        height: '100%'
    },
    txtNewUser: {
        marginTop: 0,

    },
    txtSignUp: {

        color: '#07ABA5'
    },
    register: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});