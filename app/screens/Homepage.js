
import React, { useState } from 'react'
import { Text, Button, Item, Input, Container } from 'native-base'
import { Image, View } from 'react-native'
import { createAnimatableComponent } from 'react-native-animatable'
import logo from '../assets/sudoku.png'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/actions/user'

const AnimatableButton = createAnimatableComponent(Button)

export default ({navigation}) => {

    const [difficulty, setDifficulty] = useState('')
    const [nickname, setNickname] = useState('')
    const dispatch = useDispatch()

    const play = () => {
        const user = {
            name: nickname,
            score: 0
        }

        dispatch(addUser(user))
        setNickname('')
        setDifficulty('')
        navigation.navigate('Gameplay', {
            difficulty, nickname
        })
    }

    return (

        <Container>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={ logo } style={{ marginTop: 20 }}></Image>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Item regular style={{ width: '75%', borderRadius: 12 }}>
                            <Input value={nickname} onChangeText={(text) => setNickname(text)} placeholder='nickname'  />
                        </Item>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'center'}}>
                        <AnimatableButton 
                            animation={difficulty !== 'easy' ? 'bounce' : ''} easing="ease" iterationCount="infinite" 
                            duration={2500}
                            small info disabled={ difficulty == 'easy' } 
                            onPress={ () => setDifficulty('easy') }
                        >
                            <Text>Easy</Text>
                        </AnimatableButton>
                        <AnimatableButton 
                            animation={difficulty !== 'medium' ? 'bounce' : ''} easing="ease" iterationCount="infinite" 
                            duration={2500} delay={200}
                            small warning disabled={ difficulty == 'medium' } 
                            onPress={ () => setDifficulty('medium') }
                        >
                            <Text>Medium</Text>
                        </AnimatableButton>
                        <AnimatableButton 
                            animation={difficulty !== 'hard' ? 'bounce' : ''} easing="ease" iterationCount="infinite" 
                            duration={2500} delay={350}
                            small danger disabled={ difficulty == 'hard' } 
                            onPress={ () => setDifficulty('hard') }
                        >
                            <Text>Hard</Text>
                        </AnimatableButton>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <AnimatableButton 
                            animation={difficulty !== '' && nickname !== '' ? 'rubberBand' : ''} duration={2000} easing="ease" iterationCount="infinite"
                            onPress={play} 
                            disabled= { difficulty == '' || nickname == '' } 
                            style={{ 
                                justifyContent: "center", 
                                width: '25%'
                            }}
                        >
                            <Text>Play!</Text>
                        </AnimatableButton>
                    </View>
                </View>
            </View>
        </Container>
    )

}