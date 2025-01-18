const BASE_URL = (email) => {
    const sanitisedEmail = email.replace(/[@.]/g, "");
    return `https://react-http-2549b-default-rtdb.asia-southeast1.firebasedatabase.app/expensetracker/${sanitisedEmail}`;
};

const FirebaseExpenseServices = {
    addExpense: async (email, expense) => {
        console.log(BASE_URL(email));
        const url = `${BASE_URL(email)}.json`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(expense),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to add expense.");
        }

        const data = await response.json();
        return { id: data.name, ...expense };
    },

    updateExpense: async (email, id, updatedExpense) => {
        const url = `${BASE_URL(email)}/${id}.json`;
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(updatedExpense),
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to update expense.");
        }
    },

    removeExpense: async (email, id) => {
        const url = `${BASE_URL(email)}/${id}.json`;
        const response = await fetch(url, { method: "DELETE" });

        if (!response.ok) {
            throw new Error("Failed to remove expense.");
        }
    },

    fetchExpenses: async (email) => {
        const url = `${BASE_URL(email)}.json`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch expenses.");
        }

        const data = await response.json();
        const expenses = [];
        for (const key in data) {
            expenses.push({ id: key, ...data[key] });
        }
        return expenses;
    },
};

export default FirebaseExpenseServices;
