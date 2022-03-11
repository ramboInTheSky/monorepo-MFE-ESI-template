import {nameof, nameofFactory} from "."

class TestClass {
    MyPropName!: string
}

describe("Given a nameof util", () => {
    it("should give me the string value of a class property", () => {
        expect(nameof<TestClass>("MyPropName")).toEqual("MyPropName")
    })
})
describe("Given a nameofFactory util", () => {
    it("should give me the string value of a class property", () => {
        const nameofTestClass = nameofFactory<TestClass>()
        expect(nameofTestClass("MyPropName")).toEqual("MyPropName")
    })
})
