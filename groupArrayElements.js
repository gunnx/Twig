const ERROR_MESSAGES = {
  arrayToGroup: 'Non Array type passed as first argument, must be Array with length >= 0',
  groupSizeType: 'Non Integer passed as second argument, must be a numeric positive integer',
  groupSizeValue: 'Cannot split into groups larger than length of the array'
}

function groupArrayElements(arrayToGroup, groupSize) {
  if (!Array.isArray(arrayToGroup)) {
    throw new Error(ERROR_MESSAGES.arrayToGroup)
  }

  if (arrayToGroup.length === 0) {
    return arrayToGroup
  }

  if (!Number.isInteger(groupSize) || Math.sign(groupSize) < 1) {
    throw new Error(ERROR_MESSAGES.groupSizeType)
  }

  if (groupSize > arrayToGroup.length) {
    throw new Error(ERROR_MESSAGES.groupSizeValue)
  }

  if (groupSize === 1) {
    return arrayToGroup
  }


  let elementsPerGroup = Math.ceil(arrayToGroup.length / groupSize)
  const numOfGroupsGenerated = Math.ceil(arrayToGroup.length / elementsPerGroup)

  if (numOfGroupsGenerated < groupSize) {
    elementsPerGroup = Math.floor(arrayToGroup.length / groupSize)
  }

  const groupedArray = []
  const arrayCopy = [...arrayToGroup]

  for (let i=0; i < groupSize; i++) {
    groupedArray.push(arrayCopy.splice(0, elementsPerGroup))
  }

  if (arrayCopy.length) {
    const merge = groupedArray.pop().concat(arrayCopy)
    groupedArray.push(merge)
  }

  return groupedArray
}



module.exports = {
  groupArrayElements,
  ERROR_MESSAGES
}