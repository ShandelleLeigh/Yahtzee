export const rollDice = () => {
  return (dispatch, getState) => {
    let { keep, dice } = getState().currentGame;

//d is for ...  i is for index,
    let newDice = dice.map( (someValue, indexValue) => {
      //gets state:
      if (keep.includes(indexValue))
        return someValue
      return Math.floor(Math.random() * 6) + 1
    });

    dispatch({ type: 'ROLL_DICE', dice: newDice })
  }
}

export const toggleKept = (indexValue) => {
  return (dispatch, getState) => {
     let { keep } = getState().currentGame;
     let updatedKeep;

      if (keep.includes(indexValue))
        updatedKeep = keep.filter( k => k !== indexValue )
      else
        updatedKeep = [...keep, indexValue]

      dispatch({ type: 'TOGGLE_KEPT', keep: updatedKeep })
  }
}
