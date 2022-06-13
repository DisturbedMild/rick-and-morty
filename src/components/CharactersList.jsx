import { useState, useEffect, Fragment } from "react";

import CharactersSearch from './CharactersSearch'
import CharactersListItem from "./CharactersListItem";

import classes from './CharactersList.module.css';
const CharactersList = () => {
  const [charactersList, setCharactersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
useEffect(() => {
	const sendRequest = async (url) => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Failded request");
			}

			const data = await response.json();

			if (data.length === 0) {
				throw new Error("Empty response");
			}
			return data;
		} catch (e) {
			throw new Error(e.message);
		}
	};
	const concatCharacters = async () => {
		const response = await sendRequest(
			"https://rickandmortyapi.com/api/character"
		);
      const arr = [];
		for (let i = 1; i < response.info.pages; i++) {
			const data = await sendRequest(
				`https://rickandmortyapi.com/api/character?page=${i}`
			);
			 arr.push(...data.results);
		}
    setCharactersList(arr);
    setIsLoading(false);
	};
  concatCharacters()
}, [charactersList]);


  return (
    <Fragment>
      <h2>Characters List</h2>
      <CharactersSearch characters={charactersList} />
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
         <ul className={classes['characters-list']}>
        {charactersList.map((el) => (
          <CharactersListItem key={el.id} id={el.id} name={el.name} status={el.status} />
        ))}
      </ul>
      )}
     
     
    </Fragment>
  );
};

export default CharactersList;

/* <div>
<button onClick={showPrevPageHandler}>Prev page</button>
<button onClick={showNextPageHandler}>Next page</button>
</div> */

// const [page, setPage] = useState(1);
// const [prevPageDisabled, setPrevPageDisabled] = useState(false);
// const [nextPageDisabled, setNextPageDisabled] = useState(false);

// const showPrevPageHandler = (e) => {
//   if (prevPageDisabled) {
//     e.target.setAttribute("disabled", "disabled");
//   }
//   if (page !== 1) {
//     e.target.nextElementSibling.removeAttribute("disabled");
//     setPage((prev) => (prev -= 1));
//   } else {
//     setPage(page)
//     return;
//   }
// };

// const showNextPageHandler = (e) => {
//   if (nextPageDisabled) {
//     e.target.setAttribute("disabled", "disabled");
//   } else {
//     e.target.previousElementSibling.removeAttribute("disabled");
//     setPage((prev) => (prev += 1));
//   }
// };


// useEffect(() => {
//   const transformCharacters = (data) => {
//     const transformedCharacters = [];
//     data.results.forEach((el) => transformedCharacters.push(el));
//     setCharactersList(transformedCharacters);
//   };
//   const sendRequest = async () => {
//     try {
//       const response = await fetch(
//         `https://rickandmortyapi.com/api/character?page=${page}`
//       );

//       if (!response.ok) {
//         throw new Error("Failded request");
//       }

//       const data = await response.json();
//       if (page === data.info.pages) {
//         setNextPageDisabled(true);
//         console.log("Sorry, that was last page");
//       }
//       if (page === 1) {
//         setPrevPageDisabled(true);
//         console.log("Sorry, that was first page");
//       }

//       if (data.length === 0) {
//         throw new Error("Empty response");
//       }
//       transformCharacters(data);
//     } catch (e) {
//       throw new Error(e.message);
//     }
//   };
//   sendRequest();
// }, [page]);
