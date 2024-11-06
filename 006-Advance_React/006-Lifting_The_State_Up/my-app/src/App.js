import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

function App() {
  const expenses = [
    { id: 1, title: "Insurance", date: new Date(2023, 7, 15), amount: 100 },
    { id: 2, title: "Book", date: new Date(2023, 8, 25), amount: 10 },
    { id: 3, title: "Pen", date: new Date(2023, 2, 10), amount: 1 },
    { id: 4, title: "Laptop", date: new Date(2023, 9, 17), amount: 200 },
  ];



  function addExpenseDataHandler(enteredExpenseData) {
    console.log(enteredExpenseData);
  }
  return (
    <div>
      <NewExpense onAddExpense={addExpenseDataHandler} />
      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
