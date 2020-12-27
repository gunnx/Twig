# Twig

## Summary
Write function `groupArrayElements` that follows these requirements:
```
Given an array of length >= 0, and a positive integer N, return the contents of the array divided into N
equally sized arrays.

Where the size of the original array cannot be divided equally by N, the final part should have a length equal
to the remainder.
```

## Setup
```js
npm install
```

## Tests
```js
npm test
```

## Assumptions / Notes

Spec mentions array can be length >= 0 and N will be a positive integer.
As it doesn't make sense to do anything if array empty, function doesn't error but instead just returns the same array back regardless of the N provided.

Added error condition where N larger than array length because each group must have at least one item.

A shorter version of this function could be written where we use `floor` by default and then the last group will potentially have the largest amount of items.
The version I have written instead tries to be greedy first by using `ceil`  and if that is too greedy falls back to `floor`

