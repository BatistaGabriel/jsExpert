const {deepStrictEqual} = require('assert')

//diferences between value and reference
let counter = 0;
let counter2 = counter;
counter2++;
/**
 * what is the value of counter?
 * the answer is 0
 */

/**
 * what is the value of counter2?
 * the answer is 1, this happens because counter2 is 
 * a copy of counter and not a reference, so what happens
 * in the counter2 does not affect the counter
 */

//----------------------------------------------------------------

const item = {counter: 0};
const item2 = item;


/**
 * what is the value of item?
 * the answer is {counter: 1}
 */

/**
 * what is the value of item2?
 * the answer is {counter: 1}, this happens because 
 * primitive types are passed by value and stored in the memory heap.
 * In the end we were just changing the address of the memory heap 
 * but still pointing to the same value
 */

//----------------------------------------------------------------

// primitive types create a copy in memory
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

// reference types copies the memory address, pointing to the same value
item2.counter++;
deepStrictEqual(item, {counter: 1})
item.counter++;
deepStrictEqual(item2, {counter: 2})