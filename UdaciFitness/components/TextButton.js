import React from 'react'
import {Text, TouchableOpacity} from 'react-native'

export default function TextButton({children, onPress}){
    <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
    </TouchableOpacity>
}