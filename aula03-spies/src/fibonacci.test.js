const Fibonacci = require('./fibonacci')
const sinon = require('sinon')
const assert = require('assert')

// Fibonacci: the n ext value is always the sum of the two previous values
// if it is 3
// 0,1,1
// if it is 5
// 0,1,1,2,3
;
(async () =>{
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        
        // generators returns iterators (.next)
        // there is 3 ways to call it:
        // 1) calling the function .next
        // 2) calling the functions for await
        // 3) calling the functions rest/spread
        for await(const i of fibonacci.execute(3)){}

        const expectedCallCount = 4
        assert.deepEqual(spy.callCount, expectedCallCount)
    }
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        
        // using rest/spread
        const [...results] = fibonacci.execute(5)
        // [0] input = 5, current = 0, next = 1
        // [1] input = 4, current = 1, next = 1
        // [2] input = 3, current = 1, next = 2
        // [3] input = 2, current = 2, next = 3
        // [4] input = 1, current = 3, next = 5
        // [5] input = 0 -> STOP

        const {args} = spy.getCall(2)
        const expectedResult = [0,1,1,2,3]
        const expectedParams = Object.values({
            input: 3,
            current: 1,
            next: 2
        })

        assert.deepEqual(args, expectedParams)
        assert.deepEqual(results, expectedResult)
    }
})()