import React from 'react'
import { TextInput, View, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fillBoard } from '../store/actions/fillBoard'


export default (props) => {
    const dispatch = useDispatch()
    const update = useSelector(state => state.filledBoardReducer.board)

    const inputNumber = (input, idx) => {
        const data = {
            input,
            rowIndex: props.index,
            colIndex: idx
        }

        dispatch(fillBoard(data))
        props.getInput(data)
    }

    const { width } = Dimensions.get('screen')

    return (
        <View style={{ flexDirection: 'row'}}>
            {
                props.col.map((el,i) => {
                    const editableColumn = el == 0
                    const sekatSamping = ((i + 1) % 3 == 0) && i != props.col.length-1
                    const sekatBawah = ((Number(props.index) + 1) % 3 == 0) && !props.lastCol

                    return (
                        <TextInput
                            key={i}
                            multiline={false}
                            maxLength={1}
                            style={{ 
                                borderWidth: 0.5,
                                borderRightWidth: Number(`${sekatSamping ? 2 : 0.5}`),
                                borderBottomWidth: Number(`${sekatBawah ? 2 : 0.5}`),
                                height: (width-40) / 9, 
                                width: (width-40) / 9,
                                textAlign: 'center',
                                color: `${ editableColumn ? '#000' : '#c0392b' }`,
                            }}
                            defaultValue={ editableColumn ? '' : `${el}`}
                            editable={ editableColumn }
                            keyboardType={'numeric'}
                            onChangeText={(input) => inputNumber(input, i)}
                        />
                    )
                     
                })
            }
        </View>
    )
}