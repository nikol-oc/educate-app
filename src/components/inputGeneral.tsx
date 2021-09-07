import React, { useEffect, useRef, useState } from 'react'
import { View, TextInput, StyleSheet, Animated, KeyboardType, useWindowDimensions } from 'react-native';

interface Props{
    label: string;
    value: string;
    campo: string;
    onChange?: any;
    type?:
        | 'none'
        | 'URL'
        | 'addressCity'
        | 'addressCityAndState'
        | 'addressState'
        | 'countryName'
        | 'creditCardNumber'
        | 'emailAddress'
        | 'familyName'
        | 'fullStreetAddress'
        | 'givenName'
        | 'jobTitle'
        | 'location'
        | 'middleName'
        | 'name'
        | 'namePrefix'
        | 'nameSuffix'
        | 'nickname'
        | 'organizationName'
        | 'postalCode'
        | 'streetAddressLine1'
        | 'streetAddressLine2'
        | 'sublocality'
        | 'telephoneNumber'
        | 'username'
        | 'password'
        | 'newPassword'
        | 'oneTimeCode' | undefined;
    secretText?: true | false;
    editable?: true | false;
    marginTop?: number;
    marginBottom?: number;
    keyboardType?: KeyboardType;
    textAlign?: 'center'|'left'|'right';
    maxLength?: number;
    opacity?: true | false;
    autoCapitalize?: 'characters' | 'words' | 'sentences' | 'none';
    autoCorrect?: true | false;
    onFocusInput?: () => void;
    onBlurInput?: () => void;
    multiline?: true | false;
    numberOfLines?: number;
    specialCheking?: () => void;
}

export const InputG = (props: Props) => {

    const {label, value, onChange, campo, type='none', secretText=false, editable=true, marginTop=10, marginBottom=0, textAlign="left", keyboardType="default", maxLength=200, opacity=false, autoCapitalize='none', autoCorrect=false, onFocusInput = () =>{}, onBlurInput = () => {}, multiline=false, numberOfLines=1, specialCheking = () => {}} = props;

    const [isFocused, setIsFocused] = useState(false);

    const animatedIsFocused = useRef(new Animated.Value(value === "" ? 0 : 1)).current;

    useEffect(()=>{
        Animated.timing(animatedIsFocused, {
            toValue: isFocused || value !== "" ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start();
        if ( value.length < 2 ) specialCheking();
    },[isFocused, value])

    //Responsive
    const { width } = useWindowDimensions();
    let widthCalculated = width;

    const getResponsiveValue = (value: number) => {
        let responsiveValue = (widthCalculated - (widthCalculated * calculatePercentage(value)));
        return responsiveValue;
    }

    const calculatePercentage = (value: number): number => {
        let percentage = Number(((100 - ((value * 100) / 411.4286)) / 100).toFixed(4))
        return percentage;
    }

    const top = animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [getResponsiveValue(40), getResponsiveValue(18)]
    })

    const fontSize = animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [getResponsiveValue(17), getResponsiveValue(15)]
    })

    const color = animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000']
    })

    const onFocused = ()=> {
        setIsFocused(true)
    }
    const onBlured = ()=> {
        setIsFocused(false)
    }

    const CustomInput = () => {
        return (
            <View style={{paddingTop: getResponsiveValue(18)}}>
                <Animated.Text 
                    style={[
                        styles.label,
                        {
                            top: top,
                            fontSize: fontSize,
                            color: color,
                            left: getResponsiveValue(14),
                            paddingHorizontal: getResponsiveValue(6),
                        },
                        ( isFocused || value !== "" ) ? styles.labelFWBold : styles.labelFWNormal
                    ]}
                >
                    { label }
                </Animated.Text>
                <TextInput
                    textContentType = { type }
                    secureTextEntry = { secretText }
                    defaultValue = { value }
                    onChangeText = { text => onChange(text.trim(), campo) }
                    style = { [styles.input,
                        {
                            marginTop: getResponsiveValue(marginTop), 
                            marginBottom: getResponsiveValue(marginBottom), 
                            opacity: (opacity) ? 0.65 : 1,
                            fontSize: getResponsiveValue(16),
                            padding: getResponsiveValue(10),
                            paddingHorizontal: getResponsiveValue(20),
                            borderRadius: getResponsiveValue(8),
                            borderWidth: getResponsiveValue(2), 
                        } ] }
                    onFocus = { () => { onFocused(); onFocusInput(); } }
                    onBlur = { () => { onBlured(); onBlurInput(); } }
                    editable = { editable }
                    keyboardType = { keyboardType }
                    maxLength = { maxLength }
                    textAlign = { textAlign }
                    autoCapitalize = { autoCapitalize }
                    autoCorrect = { autoCorrect }
                    multiline = { multiline } 
                    numberOfLines = { numberOfLines }
                />
            </View>
        )
    }
    
    return CustomInput();
}

const styles = StyleSheet.create({
    label:{
        position: 'absolute',
        backgroundColor: 'white',
        fontFamily: 'Gotham-Medium'
    },
    labelFWNormal:{
        zIndex: 0,
        elevation: 0
    },
    labelFWBold:{
        zIndex: 10,
        elevation: 0.01
    },
    input:{
        color:'#000',
        borderColor:'#323c37',
    }
});