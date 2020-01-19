import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; /// apertar tab nas chaves para ver todas as bibliotecas

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        
        async function loadInitialPosition() {

            const { granted } = await requestPermissionsAsync();

            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                
                const { latitude, longitude } = coords;
                console.log(latitude)
                console.log(longitude)
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }

            
        }

        loadInitialPosition();
    }, [])

    if(!currentRegion) {
        return null;
    }

    return (
        <>
            <MapView style={styles.map} initialRegion={currentRegion}>
                <Marker coordinate={{ latitude: -25.3630901, longitude: -49.2197033 }}>
                    <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/26572451?s=460&v=4' }}/>
                    <Callout onPress={ () => {
                        // navegação
                        navigation.navigate('Profile', { github_username: 'julianosilva23' })
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>Juliano Silva</Text>
                            <Text style={styles.devBio}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quibusdam officiis tempore architecto maiores</Text>
                            <Text style={styles.devTechs}></Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.seachForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs.."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                ></TextInput>
                <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF"/>
                    
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderColor: '#fff'
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchForm: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }

})

export default Main;