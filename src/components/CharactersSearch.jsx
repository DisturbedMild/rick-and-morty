import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./CharactersSearch.module.css";

const CharactersSearch = (props) => {
  const [filteredCharacters, setFilteredCharacters] = useState([]);
	const [toggleList, setToggleList] = useState(false);
  const [error, setError] = useState("");

  const list = props.characters;
  const autoCompleteCharacters = async (name) => {
		setError('');

    const filteredArray = await list.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );

    if (filteredArray.length === 0) {
      setError("Character doesn't find");
    }

    setFilteredCharacters(filteredArray);
		if(name.length === 0) {
			setToggleList(false);
		} else {	
			setToggleList(true);
		}
  };

  const debounce = (func, wait, immediate) => {
    let timeout;

    return function executedFunction() {
      const context = this;
      const args = arguments;

      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);
    };
  };

  const onChangeHandler = (e) => {
    const name = e.target.value;
    const autoComplete = debounce(autoCompleteCharacters, 1000);
    autoComplete(name);
  };
  return (
    <Fragment>
      <form className={classes.form}>
        <input
          type="text"
          placeholder="Search character"
          onChange={onChangeHandler}
        />
      </form>
      <ul className={`${classes["searched-list"]} ${toggleList ? classes.show : classes.hide}`} >
        {error ? (
          <p className={classes.error}>{error}</p>
        ) : (
          filteredCharacters.map((el) => (
            <li key={el.id} id={el.id}>
              <p>
                <Link to={`../character/${el.id}`}>{el.name}</Link>
              </p>
            </li>
          ))
        )}
      </ul>
    </Fragment>
  );
};

export default CharactersSearch;
