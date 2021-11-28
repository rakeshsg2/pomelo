const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const jsonTransformController = require('../controllers/jsonTransformController');

const { expect } = Code;
const { experiment, test } = exports.lab = Lab.script();

experiment('/formatjson testing', () => {

    test('handles undefined value', () => {
        let input;
        let output = jsonTransformController.transformJSON(input);
        expect(output).to.equal([]);
    });

    test('return expected formatted value 1', () => {
        let inputObj = {"0":[{"id": 10,"title": "House","level": 0,"children": [],"parent_id": null}]};  
        let expectedOutput = [{"id":10,"title":"House","level":0,"children":[],"parent_id":null}];
        let output = jsonTransformController.transformJSON(inputObj);
        expect(output).to.equal(expectedOutput, { prototype: false });
    });

    test('return expected formatted value 2', () => {
        let inputObj = {"0":
        [{"id": 10,
          "title": "House",
          "level": 0,
          "children": [],
          "parent_id": null}],
       "1":
        [{"id": 12,
          "title": "Red Roof",
          "level": 1,
          "children": [],
          "parent_id": 10},
         {"id": 18,
          "title": "Blue Roof",
          "level": 1,
          "children": [],
          "parent_id": 10},
         {"id": 13,
          "title": "Wall",
          "level": 1,
          "children": [],
          "parent_id": 10}],
       "2":
        [{"id": 17,
          "title": "Blue Window",
          "level": 2,
          "children": [],
          "parent_id": 12},
         {"id": 16,
          "title": "Door",
          "level": 2,
          "children": [],
          "parent_id": 13},
         {"id": 15,
          "title": "Red Window",
          "level": 2,
          "children": [],
          "parent_id": 12}]}
        
        let expectedOutput = [{"id":10,"title":"House","level":0,"children":[{"id":12,"title":"Red Roof","level":1,"children":[{"id":17,"title":"Blue Window","level":2,"children":[],"parent_id":12},{"id":15,"title":"Red Window","level":2,"children":[],"parent_id":12}],"parent_id":10},{"id":18,"title":"Blue Roof","level":1,"children":[],"parent_id":10},{"id":13,"title":"Wall","level":1,"children":[{"id":16,"title":"Door","level":2,"children":[],"parent_id":13}],"parent_id":10}],"parent_id":null}];

        let output = jsonTransformController.transformJSON(inputObj);
        expect(output).to.equal(expectedOutput, { prototype: false });
    });
});
