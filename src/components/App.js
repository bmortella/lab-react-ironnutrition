import { useState, useEffect } from 'react';

import 'bulma/css/bulma.css';
import foodsJson from '../foods.json';

import FoodBox from './FoodBox';
import Search from './Search';
import TodayFoods from './TodayFoods';
import AddFoodForm from './AddFoodForm';

function App() {
  const [foods, setFoods] = useState([...foodsJson]);
  const [searchTerm, setSearchTerm] = useState('');
  const [todayFoods, setTodayFoods] = useState([]);
  const [toggleAddFood, setToggleAddFood] = useState(false);

  // Faz o filtro da lista de comidas somente quando o termo de busca terminou de atualizar
  useEffect(() => {
    filterFoods(searchTerm);
  }, [searchTerm]);

  function filterFoods(term) {
    const clone = [...foods];

    // Extraindo somente as comidas que o nome inclui o termo de busca
    const filtered = clone.filter((currentFoodObj) => {
      return currentFoodObj.name.toLowerCase().includes(term.toLowerCase());
    });

    setFoods(filtered);

    // Se o termo de busca estiver vazio, voltamos o state pra lista original que vem do JSON
    if (!term) {
      setFoods([...foodsJson]);
    }
  }

  function onFoodAdd(foodObj) {
    const clone = [...todayFoods];

    let exists = false;
    for (let i = 0; i < clone.length; i++) {
      if (clone[i].name === foodObj.name) {
        exists = true;
        clone[i].quantity += foodObj.quantity;
      }
    }
    if (exists === false) {
      clone.push(foodObj);
    }

    setTodayFoods(clone);
  }

  function handleSubmitNewFood(data) {
    const cloneFoods = [...foods];
    cloneFoods.unshift({
      calories: Number(data.calories),
      image: data.image,
      name: data.name,
      quantity: 0,
    });
    setFoods(cloneFoods);
    setToggleAddFood(false);
  }

  function removeTodayFood(index) {
    const cloneTodayFoods = [...todayFoods];
    cloneTodayFoods.splice(index, 1);
    setTodayFoods(cloneTodayFoods);
  }

  return (
    <div className="container">
      <h1 className="title">IronNutrition</h1>
      <button
        className="button"
        onClick={() => setToggleAddFood(!toggleAddFood)}
      >
        Add Food
      </button>
      {toggleAddFood && <AddFoodForm onSubmitNewFood={handleSubmitNewFood} />}
      <Search
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="columns">
        <div className="column">
          {/* Renderiza uma Foodbox pra cada objeto de comida na array */}
          {foods.map((currentFoodObj) => (
            <FoodBox
              key={currentFoodObj.name}
              food={currentFoodObj}
              onFoodAdd={onFoodAdd}
            />
          ))}
        </div>
        <TodayFoods todayFoods={todayFoods} removeTodayFood={removeTodayFood} />
      </div>
      <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
          <p>Test</p>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
      </div>
    </div>
  );
}

export default App;
