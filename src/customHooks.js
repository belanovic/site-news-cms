import React, {useState} from 'react'

export function useToggle(initial = false) {
    const [state, setState] = useState(initial);
    const toggle = () => {
        setState(!state)
    }
    return [state, toggle]
}