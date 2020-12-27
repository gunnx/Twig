const { groupArrayElements, ERROR_MESSAGES}  = require('./groupArrayElements')

const Errors = {
  arrayToGroup: new Error(ERROR_MESSAGES.arrayToGroup),
  groupSizeType: new Error(ERROR_MESSAGES.groupSizeType),
  groupSizeValue: new Error(ERROR_MESSAGES.groupSizeValue)
}

describe("groupArrayElements", () => {

  describe("invalid parameters", () => {
    it.each`
      arrayToGroup    | groupSize   | expected
      ${"foo"}        | ${1}        | ${Errors.arrayToGroup} // reject string
      ${123}}         | ${1}        | ${Errors.arrayToGroup} // reject number
      ${{ a: 1 }}     | ${1}        | ${Errors.arrayToGroup} // reject object
      ${[1,2,3]}      | ${""}       | ${Errors.groupSizeType} // reject empty string
      ${[1,2,3]}      | ${[]}       | ${Errors.groupSizeType} // reject array
      ${[1,2,3]}      | ${"3"}      | ${Errors.groupSizeType} // reject string number
      ${[1,2,3]}      | ${-1}       | ${Errors.groupSizeType} // reject negative number
      ${[1,2,3]}      | ${0}        | ${Errors.groupSizeType} // reject zero
      ${[1,2,3]}      | ${{}}       | ${Errors.groupSizeType} // reject object
      ${[1,2,3]}      | ${4}        | ${Errors.groupSizeValue} // reject groupSize too large
      
    `("should throw exception when calling groupElements($arrayToGroup,$groupSize)", ({ arrayToGroup, groupSize, expected }) => {
      expect(() => {
        groupArrayElements(arrayToGroup, groupSize)}).toThrow(expected)
    })
  })

  describe("valid parameters", () => {
    it.each`
    arrayToGroup              | groupSize   | expected
    ${[1,2]}                  | ${2}        | ${[[1],[2]]}
    ${[1,2,3,4,5]}            | ${2}        | ${[[1,2,3],[4,5]]}
    ${[1,2,3,4,5]}            | ${3}        | ${[[1,2],[3,4],[5]]}
    ${[1,2,3,4,5,6]}          | ${2}        | ${[[1,2,3],[4,5,6]]}
    ${[1,2,3,4,5,6]}          | ${5}        | ${[[1],[2],[3],[4],[5,6]]}
    ${[1,2,3,4,5,6,7]}        | ${3}        | ${[[1,2,3],[4,5,6],[7]]}
    ${[1,2,3,4,5,6,7,8,9,10]} | ${2}        | ${[[1,2,3,4,5],[6,7,8,9,10]]}
    ${[1,2,3,4,5,6,7,8,9,10]} | ${5}        | ${[[1,2],[3,4],[5,6],[7,8],[9,10]]}
    ${[1,2,3,4,5,6,7,8,9,10]} | ${6}        | ${[[1],[2],[3],[4],[5],[6,7,8,9,10]]}
    ${[1,2,3,4,5,6,7,8,9,10]} | ${10}       | ${[[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]]}
  `('returns array of $expected.length items when calling groupArrayElements($arrayToGroup,$groupSize)', ({arrayToGroup, groupSize, expected}) => {
      expect(groupArrayElements(arrayToGroup, groupSize)).toEqual(expected)
    });
  })

  it("should return same instance if `arrayToGroup` is empty", () => {
    const arrayToGroup = []
    expect(groupArrayElements(arrayToGroup, 1)).toBe(arrayToGroup)
  })

  it("should return same instance of `arrayToGroup` if 'groupSize' is 1", () => {
    const arrayToGroup = [1,2,3]
    expect(groupArrayElements(arrayToGroup, 1)).toBe(arrayToGroup)
  })
})