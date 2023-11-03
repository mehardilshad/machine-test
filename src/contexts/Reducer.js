const Reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      const user_details = {
        ...state.user_details,
        ...action.user_details,
      }
      localStorage.setItem('user_details', JSON.stringify(user_details))
      return {
        ...state,
        user_details: user_details,
      }
    case 'FOLLOWUP_ACTIVE':
      return {
        ...state,
        isFollowUpActive: action.isFollowUpActive,
      }
    case 'PROFILE_OPTION':
      return {
        ...state,
        activeOption: action.activeOption,
      }
    case 'RESCHEDULE_CONFIRM':
      return {
        ...state,
        isConfirmReschedule: action.isConfirmReschedule,
      }
    case 'DATE_TIME_SLOT':
      return {
        ...state,
        time_slot: action.time_slot,
      }
    case 'UPDATE_SLOT':
      return {
        ...state,
        status: action.status,
      }
    default:
      return state
  }
}

export default Reducer
