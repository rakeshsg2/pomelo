const moment = require('moment');

// Helper function to be used in views template 
const helperFn = () => {
    return {
        eq: (v1, v2) => v1 === v2,
        ne: (v1, v2) => v1 !== v2,
        lt: (v1, v2) => v1 < v2,
        gt: (v1, v2) => v1 > v2,
        lte: (v1, v2) => v1 <= v2,
        gte: (v1, v2) => v1 >= v2,
        and: function() { return reduceOp(arguments, (a,b) => a && b); },
        or : function() { return reduceOp(arguments, (a,b) => a || b); },
        formatDate : function(date) { return moment(date).format('DD MMMM YYYY') },
        formatNumber : function(num) { return num.toLocaleString() }
    }
}

module.exports = helperFn;
