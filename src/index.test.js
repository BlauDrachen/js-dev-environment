import {expect} from "chai";
import jsdom from "jsdom";
import fs from "fs";

describe("Our first test", () => {
    it("Should pass", () => {
        expect(true).to.equal(true);
    });
});

// describe("Our second test", () => {
//     it("Should fail", () => {
//         expect(true).to.equal(false);
//     });
// });

describe("index.html", () => {
    it("should say hello", (done) => {
        const index = fs.readFileSync('./src/index.html', "utf-8");
        jsdom.env(index, function(err, window) {
            const h1 = window.document.getElementsByTagName('h1')[0];
            expect(h1.innerHTML).to.equal("Hello World!");
            done();
            window.close();
        });
    });
});
