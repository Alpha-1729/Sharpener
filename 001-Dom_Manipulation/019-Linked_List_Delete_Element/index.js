'use strict;'
// Linked List Delete Element
/*
>>>>
>>>>
>>>>
>>>>
*/

var remove3rdlastElem = function (head) {
    let dummy = new ListNode(0, head); // Link dummy node to head
    let fast = dummy;
    let slow = dummy;

    for (let i = 0; i < 3; i++) {
        if (fast.next === null) {
            printLinkList(head);
        }
        fast = fast.next;
    }

    while (fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;
    printLinkList(head)
};

function printLinkList(head) {
    var current = head;
    var linkListString = ''
    while (current.next) {
        linkListString = linkListString + current.val + '->'
        current = current.next
    }
    linkListString = linkListString + current.val
    console.log(linkListString)
}

function ListNode(val, next) {
    return {
        val: val,
        next: next == undefined ? null : next,
    };
}
