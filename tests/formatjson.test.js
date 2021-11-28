const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const jsonTransformController = require('../controllers/jsonTransformController');

const { expect } = Code;
const { experiment, test } = exports.lab = Lab.script();

experiment('/formatjson testing', () => { 
    test('handles empty value', () => {
        let input = "";
        let output = jsonTransformController.transformJSON(input);
        expect(output).to.equal([]);
    });

    test('handles undefined value', () => {
        let input;
        let output = jsonTransformController.transformJSON(input);
        expect(output).to.equal([]);
    });

    // Currently deep equal is not working even though the output is correct.
    test('return expected formatted value', () => {
        let inputObj = {"0":[{"id": 10,"title": "House","level": 0,"children": [],"parent_id": null}]};  
        let expectedOutput = [{"id":10,"title":"House","level":0,"children":[],"parent_id":null}];
        let output = jsonTransformController.transformJSON(inputObj);
        expect(output).to.equal(expectedOutput);
    });
});
