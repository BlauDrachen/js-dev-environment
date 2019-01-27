import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

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

describe('index.html', () => {
    it("should have h1 that says User", () => {
        const index = fs.readFileSync("./src/index.html", "utf-8");
        const { JSDOM } = jsdom;
        const dom = new JSDOM(index);
        const h1 = dom.window.document.getElementsByTagName("h1")[0];
        expect(h1.innerHTML).to.equal("Users");
        dom.window.close();
    });
});
