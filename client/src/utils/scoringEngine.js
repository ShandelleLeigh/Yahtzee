//scoring 1-6's
export const singles = (value, dice) => {
  return dice.filter( d => d === value).reduce( (total, val) => {
    return total + val
  }, 0)
}

//scoring whatever of a kind
export const addAllDice = (type, dice) => {
  let totals = [];
  const empty = [0];

  switch (type) {
    case 'Three Of A Kind':
      totals = validateThreeOfAKind(dice) ? dice : empty
      break
    case 'Four Of A Kind':
      totals = validateFourOfAKind(dice) ? dice : empty
      break
    default:
      totals = dice
  }

  return totals.reduce( (total, val) => {
    return total + val
  },0)
}

// all else
//needs type, to see which type of scoring,
export const staticScore = (type, dice) => {
  switch (type) {
    case 'Full House':
      return validateFullHouse(dice) ? 25 : 0
    case 'Low Straight':
      return validateLowStraight(dice) ? 30 : 0
    case 'High Straight':
      return validateHighStraight(dice) ? 40 : 0
    case 'Yahtzee':
      return validateYahtzee(dice) ? 50 : 0
    default:
      return 0
  }
}


//validators

const validateFullHouse = (dice) => {
  let hasTwo = false
  let hasThree = false
  let split = splitArray(dice)
  for (let arr of split.newArray) {
    if (arr.length === 3)
      hasThree = true
    if (arr.length === 2)
      hasTwo = true
  }

  return hasThree && hasTwo
}

const validateLowStraight = (dice) => {
  let count = findSeq(dice.sort())
  return count >= 4
}

const validateHighStraight = (dice) => {
  let count = findSeq(dice.sort())
  return count === 5
  //if dice are: [1...5]
}

const validateYahtzee = (dice) => {
  // if dice:[all five match], return that 5 match
  let matches = 0
  let val = dice[0]
  matches = dice.filter( i => i === val ).length
  return matches === 5
}

const validateThreeOfAKind = (dice) => {
  let hasScore = false;
  let split = splitArray(dice);
  for (let arr of split.newArray) {
    if (arr.length >= 3)
      hasScore = true;
  }

  return hasScore;
}

const validateFourOfAKind = (dice) => {
  let hasScore = false;
  let split = splitArray(dice);
  for (let arr of split.newArray) {
    if (arr.length >= 4)
      hasScore = true;
  }

  return hasScore;
}

//helper for helpers
// arr is array, acc is accumulated value,
//val is value,
const splitArray = (dice) => {
  let split = dice.sort().reduce( (acc, val) => {
    let inner;
    if (acc.previous !== val) {
      inner = [];
    } else {
      inner = acc.newArray.pop();
    }

    inner.push(val);
    acc.previous = val;
    acc.newArray.push(inner);
    return acc;
  }, {
    previous: null,
    newArray: []
  });

  return split;

}

const findSeq = (dice) => {
  let count = 1
  for (let i in dice) {
    if (dice[i + 1] - 1 === dice[i])
    //checks if dice are:  1, 2, 3, ...
    // if dice of (current +1 ) index -1 value  === current dice index , then its 1,2 or 3,4, etc,
     ++count

  }

  return count;

}
