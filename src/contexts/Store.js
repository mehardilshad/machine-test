import React, { createContext, useReducer } from 'react'
import Reducer from './Reducer'

const initialState = {
  user_details: {
    is_verified: false,
    role: '',
    access: '',
    email: '',
  },
}

console.log(initialState, 'user_details in store')
const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export const Context = createContext(initialState)

export default Store
