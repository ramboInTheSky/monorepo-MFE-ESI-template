import logger from ".";
describe("logger", function () {
    it("Should return a function", function () {
        expect(logger).toBeInstanceOf(Object);
    });
    it("Should have all methods implmented", function () {
        expect(logger.info).toBeInstanceOf(Function);
        expect(logger.error).toBeInstanceOf(Function);
        expect(logger.debug).toBeInstanceOf(Function);
        expect(logger.warn).toBeInstanceOf(Function);
        expect(logger.out).toBeInstanceOf(Function);
    });
});
//# sourceMappingURL=index.test.js.map