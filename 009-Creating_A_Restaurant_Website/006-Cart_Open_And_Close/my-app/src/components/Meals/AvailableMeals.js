import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const dummyMeals = [
    {
        id: 'm1',
        name: 'Sushi',
        description: "Finest fish and veggies",
        price: 22.09
    },
    {
        id: 'm2',
        name: 'Schitzel',
        description: "A german specialty!",
        price: 16.50
    },
    {
        id: 'm3',
        name: 'Barbecue burger',
        description: "American, raw meaty",
        price: 12.99
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: "Healthy...and...green...",
        price: 20.09
    },
];

function AvailableMeals() {
    const mealsList = dummyMeals.map((meal) =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price} />
    );

    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;