const { join } = require("../modules/plugins");

// function to convert multi dimentional array to single dimetional array even with non array values in between
const flattenArrayFn = (values) => values.reduce(
    (acc, item, index, array) => acc.concat(
        Array.isArray(item) ? flattenArrayFn(item) : item 
    ), []
);

// function to transform the json to desired array output
exports.transformJSON = (json='{}') => {
    let indexMap = {}; // use index of property instead
    let outputArray = []; // Store final output
 
    try {
        
        // parse the object and get rid of the number keys
        json = Object.values(JSON.parse(json));

        // convert it to a 2-D array as per the desired output which will also help in creating the index map of each item
        let flattenArray = flattenArrayFn(json);

        // Store the index of each element which later be used to quickly map children and parents
        indexMap = flattenArray.reduce((a, el, i) => {
            a[el.id] = i;
            return a;
        }, {});

        // Iterate through the flat array and and map children as per parent id
        for(let i=0; i<flattenArray.length; i++) {
            let parentId = flattenArray[i].parent_id;

            //root node
            if (parentId === null) {
                outputArray.push(flattenArray[i]);
            }
            const parent = flattenArray[indexMap[parentId]];
            if(parent) {
                parent.children = [...(parent.children || []), flattenArray[i]];
            }
        }
    } catch (error) {
        console.log('error : ', error);
    }
    return outputArray;
}