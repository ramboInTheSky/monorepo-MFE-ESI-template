import { hasNumber } from "."

describe('Given a hasNumber util', () => {
  it('should return true if string has a number', () => {
    expect(hasNumber("123")).toBeTruthy()
  })
  it('should return true if it is a number', () => {
    expect(hasNumber(123)).toBeTruthy()
  })
  it('should return false if string contains no numbers', () => {
    expect(hasNumber("batman")).toBeFalsy()
  })
})