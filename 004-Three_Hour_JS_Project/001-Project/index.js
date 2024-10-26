'use strict;'
// Project
/*
>>>>
>>>>
>>>>
>>>>
*/
const baseUrl = "https://crudcrud.com/api/42b17bfc9fed4272ac30e6f2f0e67a7a";

const voterName = document.getElementById('voter-name');
const monitor = document.getElementById('monitor');
const totalVoteCount = document.getElementById('total-vote-count');

let totalVote = 0;

function submitForm(event) {
    event.preventDefault();

    const monitorName = monitor.value;
    const studentName = voterName.value;

    axios.post(`${baseUrl}/votes`, {
        monitor: monitorName,
        voter: studentName
    }).then((res) => {
        incrementVoteCount(monitorName, studentName, res["_id"]);
    }).catch((err) => {
        console.log(err);
    });

}

document.addEventListener('DOMContentLoaded', function () {
    axios.get(`${baseUrl}/votes`).then((res) => {
        if (res.data) {
            res.data.forEach((votes) => {
                incrementVoteCount(votes.monitor, votes.voter, votes["_id"]);
            });
        }
    }).catch((err) => {
        console.log(err);
    });
});

async function deleteEntry(monitorName, liElement) {
    const studentName = liElement.getAttribute('student');
    const id = liElement.getAttribute('_id');

    try {
        await axios.delete(`${baseUrl}/votes/${id}`);
    } catch (error) {
        console.log(error);
    }

    liElement.remove();
    incrementContestantVoteCount(monitorName, -1);
}
function updateTotalVoteCount(increment) {
    totalVote += increment;
    totalVoteCount.textContent = totalVote;
}
function incrementContestantVoteCount(monitorName, increment) {
    const voteCount = document.getElementById(`${monitorName}-vote-count`);
    voteCount.textContent = Number(voteCount.textContent) + increment;
    updateTotalVoteCount(increment);
}
function incrementVoteCount(monitorName, studentName, id) {
    console.log(studentName);
    const votersUl = document.getElementById(`${monitorName}-list`);

    const newLi = document.createElement('li');
    newLi.textContent = studentName;
    newLi.setAttribute('student', studentName);
    newLi.setAttribute('_id', id);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', deleteEntry.bind(null, monitorName, newLi));

    newLi.appendChild(delBtn);
    votersUl.appendChild(newLi);

    incrementContestantVoteCount(monitorName, 1);
}