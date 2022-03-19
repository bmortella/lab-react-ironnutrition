import { useState } from 'react';

function FoodBox(props) {
  const [quantity, setQuantity] = useState(0);

  function handleChange(event) {
    setQuantity(Number(event.target.value));
  }

  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={props.food.image} alt={props.food.name} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{props.food.name}</strong> <br />
              <small>{props.food.calories} cal</small>
            </p>
          </div>
        </div>
        <div className="media-right">
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="number"
                min={0}
                onChange={handleChange}
                value={quantity}
              />
            </div>
            <div className="control">
              <button
                className="button is-info"
                onClick={() =>
                  props.onFoodAdd({
                    name: props.food.name,
                    calories: props.food.calories,
                    quantity: quantity,
                  })
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default FoodBox;
