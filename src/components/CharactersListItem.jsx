import { Fragment, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FavoriteContext from "../store/favorite-context";

import classes from "./CharactersListItem.module.css";

const CharactersListItem = (props) => {
  const favoriteCtx = useContext(FavoriteContext);
  const [toggleLikeStatus, setToggleLikeStatus] = useState(true);

  const likeCharacterHandler = () => {
    if (toggleLikeStatus) {
      const character = {
        name: props.name,
        id: props.id,
      };
      favoriteCtx.addToFavorite(character);
    } else {
      favoriteCtx.removeFromFavorite(props.id);
    }
    setToggleLikeStatus(!toggleLikeStatus);
  };

	useEffect(() => {
		const itemExist = localStorage.getItem(props.id);
		if(itemExist) {
			setToggleLikeStatus(false);
			likeCharacterHandler()
		}  
		// eslint-disable-next-line
	}, [props.id])

  return (
    <Fragment>
      <li className={classes["characters-list__item"]}>
        <div>
          <p>
            Name: <Link to={`../character/${props.id}`}>{props.name}</Link>
          </p>
          <p>Status: {props.status}</p>
        </div>
        <button onClick={likeCharacterHandler} className={`${toggleLikeStatus ? '' : classes.dislike}`}>
          {toggleLikeStatus ? "Like" : "Dislike"}
        </button>
      </li>
    </Fragment>
  );
};

export default CharactersListItem;
