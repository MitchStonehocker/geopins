// src/Reducer.js

export default function reducer (state, { type, payload }) {
  console.log('>>>-reducer-type->', type)
  console.log('>>>-reducer-payload->', payload)
  console.log('>>>-reducer-state->', state)
  switch (type) {
    case 'SIGN_IN_USER':
      return {
        ...state,
        currentUser: payload
      }
    case 'IS_SIGNED_IN':
      return {
        ...state,
        isAuth: payload
      }
    case 'SIGN_OUT_USER':
      return {
        ...state,
        isAuth: false,
        currentUser: null
      }
    case 'CREATE_DRAFT':
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0
        }
      }
    case 'UPDATE_DRAFT_LOCATION':
      return {
        ...state,
        draft: payload
      }
    case 'DELETE_DRAFT':
      return {
        ...state,
        draft: null
      }
    case 'GET_PINS':
      return {
        ...state,
        pins: payload
      }
    case 'CREATE_PIN':
      const newPin = payload
      const prevPins = state.pins.filter(pin => pin._id !== newPin._id)
      return {
        ...state,
        pins: [...prevPins, newPin]
      }
    default:
      return state
  }
}
