/**
 * on this algorithim we will test the fibonacci sequence 
 * 
 * if the input is 3, the output should follow 
 * the sequence of: 0, 1, 1
 * 
 * if the input is 5, the output should follow 
 * the sequence of: 0, 1, 1, 2, 3
 * 
 * so we can understand that the next number is 
 * the sum of the previous two numbers
 */
const { createSandbox } = require('sinon')
const Fibonacci = require('./fibonacci')
const assert = require('node:assert')
const sinon = createSandbox()

;(async() => {
    {
        // Arrange
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        const expextedCallCount = 6

        // Act
        for (const seq of fibonacci.execute(5)) { }

        // Assert
        assert.deepStrictEqual(spy.callCount, expextedCallCount, `callCount is not equal ${expextedCallCount}`)
    }

    {
        // Arrange
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        const expextedParams = [3,1,2]

        // Act
        for (const seq of fibonacci.execute(5)) { }
        const {args} = spy.getCall(2)

        // Assert
        assert.deepStrictEqual(args, expextedParams, "arrays are not equal")
    }

    {
        // Arrange
        const fibonacci = new Fibonacci()
        const expectedResutls = [0,1,1]

        // Act
        const results = [...fibonacci.execute(3)]

        // Assert
        assert.deepStrictEqual(results, expectedResutls, "results are not equal")
    }    
})()