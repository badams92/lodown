'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(let i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (let key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * identity: returns the same value of whatever is passed to it
 * 
 * @param {Any type} value: any variable, object, or data type
 * @return {Any type} value: the same variable, obect, or data type
 */

function identity(value) {
    return value;
}
module.exports.identity = identity;

/**
 * typeOf: returns the type of the data passed to it
 * 
 * @param {any type} value: any variable, object, or data type
 * @return {String}: the string representation of the data type
 */
function typeOf(value) {
    if (value === null) {
        return "null";
    } else if (value instanceof Date) {
        return "date";
    } else if (Array.isArray(value)) {
        return "array";
    } else {
        return typeof value;
    }
}
module.exports.typeOf = typeOf;

/**
 * first: returns the first number of elements in an array.  If num is negative, it wil 
 * return a blank array.  If num is larger than the length of the array, it will return the whole array.
 * 
 * @param {Array} arr: An array
 * @param {Number} num: the amount of elements to return
 * 
 * @return {Array}: An array containing the first num elements of the array
 */
function first(arr, num) {
    if (!Array.isArray(arr)) return [];
    if (typeof num !== "number") return arr[0];
    if (num > arr.length) {
        return arr;
    } else if (num > 0) {
        return arr.slice(0, num);
    } 
    return [];
}
module.exports.first = first;

/**
 * last: returns the last number of elements in an array.  If num is negative, it will 
 * return a blank array.  If num is larger than the length of the array, it will return
 * the whole array.
 * 
 * @param {Array} arr: An array
 * @param {Number} num: the amount of elements to return
 * 
 * @return {Array}: An array containing the last num elements of the array
 */
function last(arr, num) {
    if (!Array.isArray(arr)) return [];
    if (typeof num !== "number") return arr[arr.length - 1];
    if (num > arr.length) {
        return arr;
    } else if (num > 0) {
        return arr.slice(-num);
    } 
    return [];
}
module.exports.last = last;

/**
 * indexOf: searches an array for the first instance of the given value
 * 
 * @param {Array} arr: the given array
 * @param {Any type} value: any data type, the value you are searching for
 * @return {Number}: the index of the first occurrence of the target value. Will return 
 * -1 if not found.
 */
function indexOf(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) return i;
    }
    return -1;
}
module.exports.indexOf = indexOf;

/**
 * contains: searches an array to see if a specific value is contained within
 * 
 * @param {Array} arr: the given array to search through
 * @param {Any type} value: the value you are searching for
 * @return {Boolean}: true or false depending on if the target element exists within the 
 * array.
 */
function contains(arr, value) {
    return indexOf(arr, value) !== -1;
}
module.exports.contains = contains;

/**
 * filter: takes an array and a function and returns an array that only contains the 
 * elements that returned a true value when passed to the given function.
 * 
 * @param {Array} arr: the given array
 * @param {Function} func: the function to be applied to each member of the array
 * @return {Array}: an array that only contains the elements for which calling the 
 * function returned true.
 */
function filter(arr, func) {
    let result = [];
    each(arr, (e, i, a) => {
        if (func(e, i, a)) result.push(e);
    });
    return result;
}
module.exports.filter = filter;

/**
 * reject: takes an array and a function and returns an array that only contains the 
 * elements that returned a false value when passed to the given function.
 * 
 * @param {Array} arr: the given array
 * @param {Function} func: the function to be applied to each member of the array
 * @return {Array}: an array that only contains the elements for which calling the 
 * function returned false.
 */
function reject(arr, func) {
    let result = [];
    each(arr, (e, i, a) => {
        if (!func(e, i, a)) result.push(e);
    });
    return result;
}
module.exports.reject = reject;

/**
 * partition: takes an array and a function, and returns a two element array, with the 
 * first element being an array of truthy elements, and the second element being an 
 * array of falsy elements.
 * 
 * @param {Array} arr: the given array
 * @param {Function} func: the function that is applied to every element of the array
 * @return {Array}: an array of an array of truthy elements and an array of falsy 
 * elements
 */
function partition(arr, func) {
    return [filter(arr), reject(arr)];
}
module.exports.partition = partition;

/**
 * map: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 * @return {Array}: an Array containing the result of each function being applied to
 * each value.
 */
function map(collection, func) {
    let result = [];
    each(collection, (e, i, a) => {
        result.push(func(e, i, a));
    });
    return result;
}
module.exports.map = map;

/**
 * pluck: takes an array of objects and a property, returns an array of the value of 
 * that property from all of the objects in the array.
 * 
 * @param {Array} arr: an array of objects
 * @param {String} prop: the name of the desired property
 * @return {Array}: an array of the value of the property of each object.
 */
function pluck(arr, prop) {
    return map(arr, obj => obj[prop]);
}
module.exports.pluck = pluck;

/**
 * every: takes a collection and applies a function to each member or property and 
 * returns true only if every element or property returns true.
 * 
 * @param {Array or Object} collection: the given array or object
 * @param {Function} func: the function to test each element or property, with the 
 * default function to return if the value is true or false.
 * @return {Boolean}: returns true if every element or property passes the function, and 
 * false if otherwise.
 */
function every(collection, func = x => {return !!x}) {
    let myBool = true;
    each(collection, (e, i, a) => {
        myBool = func(e, i, a) && myBool;
    });
    return myBool;
}
module.exports.every = every;

/**
 * some: takes a collection and applies a function to each member or property and 
 * returns true if any element or property returns true.
 * 
 * @param {Array or Object} collection: the given array or object
 * @param {Function} func: the function to test each element or property, with the 
 * default function to return if the value is true or false.
 * @return {Boolean}: returns true if any element or property passes the function, and 
 * false if otherwise.
 */
function some(collection, func = x => {return !!x}) {
    let myBool = false;
    each(collection, (e, i, a) => {
        myBool = func(e, i, a) || myBool;
    });
    return myBool;
}
module.exports.some = some;

/**
 * reduce: calls a function on every element of the arry and passing back a value to an 
 * accumulator, before finally returning the final value after the last iteration 
 * through the array.
 * 
 * @param {Array} arr: the given array
 * @param {Function} func: the callback function that applies to every element in the 
 * array.
 * @param {Any type} seed: the initial value that the accumulator starts with. If no 
 * value is supplied, the first element of the array is used instead.
 * @return {Any type}: the final result after applying the given function to each 
 * element and taking into account all of the previous callback values.
 */
function reduce(arr, func, seed) {
    each(arr, (e, i, a) => {
        if (seed === undefined) {
            seed = a[0];
        } else {
            seed = func(seed, e, i);
        }
    });
    return seed;
}
module.exports.reduce = reduce;

/**
 * extend: Adds all of the properties from different objects onto one object.
 * 
 * @param {Object} obj1: the desired object to have all of the desired properties
 * @param {Array} theArgs: an array of all the possible objects that have different 
 * properties for the target obj1 to have.
 * @return {Objet}: returns obj1 with all of the additional properties
 */
function extend(obj1, ...theArgs) {
    each(theArgs, (e, i, a) => {
        each(e, (prop, key, obj) => {
           obj1[key] = prop; 
        });
    });
    return obj1;
}
module.exports.extend = extend;