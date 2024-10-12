'use strict;'
// Linked List Find Sum
/*
>>>>
>>>>
>>>>
>>>>
*/
var findSumOfOddElements = function (head) {
    if (head === null) {
        return 0;
    }
    let current = head;
    let sum = 0;
    while (current != null) {
        if (current.val % 2 == 1) {
            sum += current.val;
        }
        current = current.next;
    }
    return sum;
};

function ListNode(val, next) {
    return {
        val: val,
        next: next == undefined ? null : next,
    };
}
