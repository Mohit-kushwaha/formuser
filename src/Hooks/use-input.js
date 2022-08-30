import React, { useReducer, useState } from 'react'

const initialInputState = {
    value: '',
    isTouched: false
}

const InitialStateReducer = (state, action) =>
{
    if (action.type === 'INPUT')
    {
        return { value: action.value, isTouched: state.isTouched }
    }
    if (action.type === 'BLUR')
    {
        return { isTouched: true, value: state.value }
    }
    if (action.type === 'RESET')
    {
        return { isTouched: false, value: '' }
    }
    return InitialStateReducer
}



const useInput = (validateValue) =>
{

    const [inputState, dispatch] = useReducer(InitialStateReducer, initialInputState)
    // const [enterValue, setEnterValue] = useState('')
    // const [isTouched, setIsTouched] = useState(false)



    // const valueValid = validateValue(enterValue)
    const valueValid = validateValue(inputState.value)
    // const hasError = !valueValid && isTouched
    const hasError = !valueValid && inputState.isTouched
    const valueChangeHandler = event =>
    {
        dispatch({
            type: 'INPUT', value: event.target.value
        })
        // setEnterValue(event.target.value)

    }
    const inputBlurHandler = () =>
    {
        dispatch({
            type: 'BLUR'
        })
        // setIsTouched(true)
    }
    const reset = () =>
    {
        dispatch({
            type: 'RESET'
        })
        // setEnterValue('')
        // setIsTouched(false)
    }
    return {
        // value: enterValue,
        value: inputState.value,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        isVaild: valueValid,
        reset
    };
}

export default useInput