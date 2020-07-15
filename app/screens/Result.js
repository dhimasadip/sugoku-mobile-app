import React, { useEffect } from 'react';
import { Text, Container, H1, Button, Toast } from 'native-base'
import { View, StyleSheet, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { clearBoard } from '../store/actions/getBoard';
import { createAnimatableComponent } from 'react-native-animatable'

const AnimatableButton = createAnimatableComponent(Button)

export default ({ navigation, route }) => {
    const users = useSelector(state => state.usersReducer.users)
    const dispatch = useDispatch()

    users.sort((a,b) => b.score - a.score)
    
    useEffect(() => {
        Toast.show({
            text: route.params.status,
            buttonText: 'Okay',
            type: 'success',
            position: 'top',
            duration: 3000,
        })
    }, [])

    const newGame = () => {
        dispatch(clearBoard())
        navigation.navigate('Homepage')
    }

    return (

        <Container>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <H1>Leaderboards</H1>
                </View>
                <View style={{ flex: 1, flexDirection: 'column'}}>
                    {
                        users.map((el, i) => {
                            return (
                                <View key={i} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <View style={{ flex: 1, alignItems: 'center'}}>
                                        <Text>{el.name}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center'}}>
                                        <Text>{el.score}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                <View style={{ flex:1, alignItems: 'center' }}>
                    <AnimatableButton 
                        animation="rubberBand" duration={2000} easing="ease" iterationCount="infinite"
                        onPress={newGame}
                        style={{ 
                            justifyContent: "center", 
                            width: '40%'
                        }}
                    >
                        <Text>New Game</Text>
                    </AnimatableButton>
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });