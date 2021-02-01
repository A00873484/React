import React from 'react'
import Slider from '@react-native-community/slider'
import { View, Text } from 'react-native'

export default function UdaciSlider ({max, unit, step, value, onChange}) {
    return (
        <View>
            <Text>UdaciSlider</Text>
            <Slider
                minimumValue={0}
                maximumValue={max}
                step={step}
                value={value}
                onValueChange={onChange}
            />
            <Text>{value}</Text>
            <Text>{unit}</Text>
        </View>
    )
}