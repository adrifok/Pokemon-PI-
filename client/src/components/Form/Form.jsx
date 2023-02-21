import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../actions/";
import style from "./form.module.css";

export const Form = () => {
  const dispatch = useDispatch();
  const options = useSelector((store) => store.types);

  const validate = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "name is mandatory";
    }
    return errors;
  };

  const [data, setData] = useState({
    name: "",
    life: 0,
    force: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    if (e.target.name != "name") {
      setData({
        ...data,
        [e.target.name]: Number(e.target, value) <= 0 ? 0 : e.target.value,
      });
    } else {
      setErrors(
        validate({
          ...data,
          [e.target.name]: e.target.value,
        })
      );
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const checkbox = (e) => {
    if (data.types.includes(e.target.value)) {
      data.types = data.types.filter((id) => id !== e.target.value);
      setData({
        ...data,
        types: data.types,
      });
    } else {
      setData({
        ...data,
        types: [...data.types, e.target.value],
      });
    }
  };

  const submit = async (e) => {
    e.preventDefault(); //this method cancels the event if it is cancelable
    const creation = await fetch("http://localhost:3001/pokemon", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    dispatch(getPokemons());
    const answer = await creation.json();
    console.log(answer);
    setData({
      name: "",
      life: 0,
      force: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
  };

  return (
    <div className={style.containerCreate}>
      <form action="POST" className={style.form} onSubmit={submit}>
        <div className={style.separado}>
          <h1>Create your own Pokemon</h1>
          <p className={errors.name ? style.danger : style.question}>
            <label>Pokemon Name</label>
            <input
              type="text"
              placeholder="Ditto"
              name="name"
              value={data.name}
              onChange={handleInputChange} //// console.log(event.name)
              required
            />
          </p>
          {errors.name ? <p className="danger">{errors.username}</p> : null}
          <p className={style.question}>
            <label>LIFE</label>
            <input
              type="number"
              name="life"
              value={data.life}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>FORCE</label>
            <input
              type="number"
              name="force"
              value={data.forcr}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>DEFENSE</label>
            <input
              type="number"
              name="defense"
              value={data.defense}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>SPEED</label>
            <input
              type="number"
              name="speed"
              value={data.speed}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>HEIGHT</label>
            <input
              type="number"
              name="height"
              value={data.height}
              onChange={handleInputChange}
            />
          </p>
          <p className={style.question}>
            <label>WEIGHT</label>
            <input
              type="number"
              name="weight"
              value={data.weight}
              onChange={handleInputChange}
            />
          </p>
        </div>

        <div className={style.hiddenCB}>
          <h1>TYPES</h1>
          <div className={style.types}>
            {options?.map((t) => (
              <div key={t.slot}>
                <input
                  type="checkbox"
                  name={t.name}
                  value={t.slot}
                  id={t.slot}
                  onChange={checkbox}
                />
                <label htmlFor={t.slot}>{t.name}</label>
                {t.slot % 4 === 0 ? <br /> : null}
              </div>
            ))}
            <input type="submit" value="Create" className={style.submit} />
          </div>
        </div>
      </form>
    </div>
  );
};
