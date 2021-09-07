import React, { useState } from 'react'
import { TextInput } from 'react-native';

export const useForm = <T extends Object>( formulario: T ) => {

    const [state, setState] = useState( formulario );

    const onChangeText = (value: string | number | boolean, campo: keyof T) =>{
        setState({
            ...state,
            [campo]: value
        })
    }

    const updateCompleteForm = ( newObject: T) =>{
        setState(newObject);
    }

    const onChangeTextPlusRef = (value: string, campo: keyof T, inputRef: React.RefObject<TextInput>) =>{
        setState({
            ...state,
            [campo]: value
        })
        if(String(state[campo])=="") inputRef.current?.focus();
    }
    const onChange = ( value: string, field: keyof T ) => {
        setState({
            ...state,
            [field]: value
        });
    }

    return {
        ...state,
        formulario: state,
        onChangeText,
        onChangeTextPlusRef,
        onChange,
        updateCompleteForm
    }
}