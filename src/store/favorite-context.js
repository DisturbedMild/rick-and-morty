import { createContext } from 'react';

const FavoriteContext = createContext({
	favoriteCharactersList: [],
	addToFavorite: (character) => {},
	removeFromFavorite: (id) => {}
})

export const FavoriteContextProvider = (props) => {
	const favoriteCharacters = [];

	const addToFavorite = (character) => {
		const characterExist = favoriteCharacters.find(item => item.id === character.id);
		if(characterExist) {
			console.log('Character exist');
			return
		} else {
			favoriteCharacters.push(character);
			localStorage.setItem(character.id, character.name);
		}
	}

	const removeFromFavorite = (id) => {
		const characterItem = favoriteCharacters.find(character => character.id === id);
		const characterItemIndex = favoriteCharacters.findIndex(characterItem => characterItem.id === id);
		if(characterItem) {
			favoriteCharacters.splice(characterItemIndex, 1);
			localStorage.removeItem(id);
			console.log(favoriteCharacters)
		}
	}

	const contextValue = {
		favoriteCharactersList: favoriteCharacters,
		addToFavorite: addToFavorite,
		removeFromFavorite: removeFromFavorite
	}
	return (
		<FavoriteContext.Provider value={contextValue}>
				{props.children}
		</FavoriteContext.Provider>
	)
}


export default FavoriteContext;