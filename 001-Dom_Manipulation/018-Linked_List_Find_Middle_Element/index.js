'use strict;'
// Linked List Find Middle Element
/*
>>>>
>>>>
>>>>
>>>>
*/

var findMiddleElement = function (head) {
    let slow = head;
    let fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
};

function ListNode(val, next) {
    return {
        val: val,
        next: next == undefined ? null : next,
    };
}
