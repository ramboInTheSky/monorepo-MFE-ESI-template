/* eslint-disable no-unused-expressions */
/* eslint-disable jest/expect-expect */
/* eslint-disable import/no-extraneous-dependencies */
import "mocha"
import chai from "chai"
import chaiHttp from "chai-http"
import app from "../server"

chai.use(chaiHttp)

describe("API Request with valid header", () => {
    it("should return 200 response on call", () => {
        return chai
            .request(app)
            .get("/")
            .set("x-monorepo-realm", "Amido")
            .set("x-monorepo-territory", "GB")
            .set("x-monorepo-language", "en")
            .then(res => {
                chai.expect(res.text).to.be.not.empty
                chai.expect(res.status).to.eql(200)
            })
    })
})

describe("API Request with incorrect header", () => {
    it("should return 400 response on call", () => {
        return chai
            .request(app)
            .get("/")
            .set("x-monorepo-realm", "Amido")
            .set("x-monorepo-territory", "GB")
            .set("x-monorepo-language", "fr")
            .then(res => {
                chai.expect(res.text).to.be.empty
                chai.expect(res.status).to.eql(400)
            })
    })
})

describe("API Request with missing header", () => {
    it("should return 400 response on call", () => {
        return chai
            .request(app)
            .get("/")
            .set("x-monorepo-realm", "Amido")
            .set("x-monorepo-territory", "GB")
            .then(res => {
                chai.expect(res.text).to.be.empty
                chai.expect(res.status).to.eql(400)
            })
    })
})

describe("API Request including Persona header given Channel Settings are configured", () => {
    describe("Accessing with France headers", () => {
        describe("With Existing CustomerA Persona with text direction configuration set to rtl and enableMainMenu as false", () => {
            const req = chai
                .request(app)
                .get("/")
                .set("x-monorepo-realm", "Amido")
                .set("x-monorepo-territory", "FR")
                .set("x-monorepo-language", "fr")
                .set("x-monorepo-persona", "CustomerA")
            it("should return 200 response on call", () => {
                return req.then(res => {
                    chai.expect(res.status).to.eql(200)
                })
            })
            it("should return direction configuration as rtl", () => {
                return req.then(res => {
                    chai.expect(GetValue(res.text, "footer.api.direction")).to.equal("rtl")
                })
            })
            it("should return enableMainMenu as false", () => {
                return req.then(res => {
                    chai.expect(GetValue(res.text, "footer.enableMainMenu")).to.equal("false")
                })
            })
        })
    })
    describe("Accessing with Great Britain headers", () => {
        describe("With existing CustomerA Persona with text direction configuration set to rtl and enableMainMenu as false", () => {
            const req = chai
                .request(app)
                .get("/")
                .set("x-monorepo-realm", "Amido")
                .set("x-monorepo-territory", "GB")
                .set("x-monorepo-language", "en")
                .set("x-monorepo-persona", "CustomerA")
            it("should return 200 response on call", () => {
                return req.then(res => {
                    chai.expect(res.status).to.eql(200)
                })
            })
            it("should return direction configuration as rtl overriding the GB ltr direction configuration", () => {
                return req.then(res => {
                    chai.expect(GetValue(res.text, "footer.api.direction")).to.equal("rtl")
                })
            })
            it("should return enableMainMenu as false", () => {
                return req.then(res => {
                    chai.expect(GetValue(res.text, "footer.enableMainMenu")).to.equal("false")
                })
            })
        })
        describe("Non existing CustomerB Persona part of the header", () => {
            const req = chai
                .request(app)
                .get("/")
                .set("x-monorepo-realm", "Amido")
                .set("x-monorepo-territory", "GB")
                .set("x-monorepo-language", "en")
                .set("x-monorepo-persona", "CustomerB")
            it("should return 200 response on call", () => {
                return req.then(res => {
                    chai.expect(res.status).to.eql(200)
                })
            })
            it("should return direction configuration as ltr", () => {
                return req.then(res => {
                    chai.expect(GetValue(res.text, "footer.api.direction")).to.equal("ltr")
                })
            })
        })
    })
})

function GetValue(response: string, key: string): string {
    return JSON.parse(response)[key].Value
}
