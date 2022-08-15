import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert } from "react-native";

export default function Menu(){

    const [showModal, setShowModal] = useState(true);

    return(
        <View style={styles.menu}>
            <MaterialIcons style={styles.icon} size={32} color="#333" name="replay"/>
                <Button title="Start" color="#d81b60"/>        
            <MaterialIcons style={styles.icon} size={32} color="#333" name="settings"/>
        </View>
    )
}