/**
 * this class is responsible for generating the fibonacci sequence
 * it uses the execute method to generate the sequence.
 * 
 * A quick example of how the sequence works if the input is 5, for example:
 * 
 * [0] input = 5, current = 0, next = 1, result = 0
 * 
 * [1] input = 4, current = 1, next = 1, result = 1
 * 
 * [2] input = 3, current = 1, next = 2, result = 1
 * 
 * [3] input = 2, current = 2, next = 3, result = 2
 * 
 * [4] input = 1, current = 3, next = 5, result = 3
 * 
 * [5] input = 0 -> stop
 * 
 * based on the matrix above, we can see that the next number is the sum of the previous two numbers
 * and when the input reaches 0, the sequence stops
 */
class Fibonacci {
    * execute(input, current = 0, next = 1) {
        /**
         * if the input reaches 0, the loop must stop
         */
        if (input === 0) {
            return
        }

        /**
         * by using yield, the caller will receive the value of current
         * which means whenever the caller calls the next() method, 
         * it will receive the value of current
         */
        yield current

        /**
         * this is recursion call that deleagates the function, 
         * but do not return values. And also uses the yield keyword
         */
        yield *this.execute(input - 1, next, current + next)
    }
}

module.exports = Fibonacci