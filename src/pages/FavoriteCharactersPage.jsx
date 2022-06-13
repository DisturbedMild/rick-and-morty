import { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import FavoriteContext from '../store/favorite-context';

import classes from './FavoriteCharactersPage.module.css';

const FavoriteCharactersPage = () => {
	const favoriteCtx = useContext(FavoriteContext);

	return (
		<Fragment>
			<h2 className={classes.header}>Favorite Characters</h2>
			<ul className={classes.list}>
				{favoriteCtx.favoriteCharactersList.length === 0 && <p className={classes.empty}>No favorite characters yet.</p>}
				{favoriteCtx.favoriteCharactersList.map(el => 
				<li>
					<p>Name: <Link to={`../character/${el.id}`}>{el.name}</Link></p>
				</li>)}
			</ul>
		</Fragment>
	)
}

export default FavoriteCharactersPage;