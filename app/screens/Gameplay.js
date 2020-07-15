
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, YellowBox } from 'react-native';
import { Header, Title, Button, Text, Container, Content, Toast } from 'native-base'
import Board from '../components/Board';
import { useSelector, useDispatch } from 'react-redux';
import { getBoard, clearBoard } from '../store/actions/getBoard'
import { addUser } from '../store/actions/user'
import { validateBoard, solveBoard } from '../store/actions/validateBoard'

// if not node_modules\native-base\dist\src\basic\ToastConatiner.js ===> Animated.timing ===> useNativeDriver: true
YellowBox.ignoreWarnings([
    'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
])

export default function App({ route, navigation }) {
    const newBoard = useSelector(state => state.boardReducer.board)
    const solvedBoard = useSelector(state => state.boardReducer.solvedBoard)
    const status = useSelector(state => state.boardReducer.status)
    const filled = useSelector(state => state.filledBoardReducer.board)
    const dispatch = useDispatch()
    const { difficulty, nickname } = route.params
    const [board, setBoard] = useState([])
    const [score, setScore] = useState(0)
    const [lastFilled, setLastFilled] = useState([])
    const [giveUp, setGiveUp] = useState(false)

    useEffect(() => {
        dispatch(clearBoard())
        dispatch(getBoard(difficulty))
        dispatch(validateBoard(filled))
    }, [])
    
    useEffect(() => {
        setBoard(JSON.parse(JSON.stringify(newBoard)))
        setLastFilled(JSON.parse(JSON.stringify(newBoard)))
        dispatch(solveBoard(newBoard))
    }, [newBoard])

    const validate = () => {

        if (giveUp) {
            navigation.navigate('Result', { status: 'Never Give Up! Try again!', nickname, score })
        } else {
            const user = {
                name: nickname,
                score
            }
    
            dispatch(addUser(user))
            dispatch(validateBoard(filled))
            
            if (status.match(/Congratulations/gi)) {
                navigation.navigate('Result', { status, nickname })
            } else {
                Toast.show({
                    text: status,
                    buttonText: 'Okay',
                    type: `${ !status.match(/Congratulations/gi) ? 'danger' : 'success' }`,
                    position: 'top',
                    duration: 3000,
                })
            }
        }

    }

    const solve = () => {
        const user = {
            name: nickname,
            score
        }

        dispatch(addUser(user))
        setBoard(solvedBoard)
        setGiveUp(true)
    }

    const restart = () => {
        navigation.navigate('Homepage')
        dispatch(clearBoard())
    }

    const getInput = (data) => {
        const { rowIndex, colIndex, input } = data
        console.log(solvedBoard[rowIndex][colIndex], input)
        if (input == 0 && lastFilled[rowIndex][colIndex] == solvedBoard[rowIndex][colIndex]) {
            setScore(score-10)
        } else if (solvedBoard[rowIndex][colIndex] == input) {
            setScore(score+10)
        } else {
        }
        
        const newFilled = JSON.parse(JSON.stringify(lastFilled))
        newFilled[rowIndex][colIndex] = input
        setLastFilled(newFilled)
    }

    return (
        <Container style={styles.container}>
            <Content>
                <Header>
                    <Title>Goodluck, { nickname }!</Title>
                </Header>
                {
                    board.length > 0 && board.map((el, i) => (
                    <Board getInput={getInput} key={i} lastCol={board.length-1 == i} col={el} index={i} />
                    ))
                }
                {
                    board.length == 0 &&
                    <ActivityIndicator size="large" />
                }
                <StatusBar style="auto" />
                <Button block style={{ marginTop: 15}} onPress={validate}>
                    <Text>Validate</Text>
                </Button>
                <Button block style={{ marginTop: 15}} onPress={solve}>
                    <Text>Solve</Text>
                </Button>
                <Button block style={{ marginTop: 15}} onPress={restart}>
                    <Text>Restart</Text>
                </Button>
            </Content> 
        </Container>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
