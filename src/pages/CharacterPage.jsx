import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";

import classes from './CharacterPage.module.css';

const CharacterPage = () => {
  const [characterItem, setCharacterItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getItem = (data) => {
      const item = { ...data };
      setCharacterItem(item);
    };
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        if (data === null) {
          throw new Error("Something went wrong");
        }
        getItem(data);
				setIsLoading(false);
      } catch (error) {
        console.log(error.message || "Something went wrong");
      }
    };
    sendRequest();
  }, [id]);

  return (
    <div className={classes.character}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <Fragment>
          <p><span>Name:</span> {characterItem.name}</p>
          <p><span>Species:</span> {characterItem.species}</p>
          <p><span>Gender:</span> {characterItem.gender}</p>
          <p><span>Location:</span> {characterItem.location.name}</p>
          <div>
            <span>Episodes:</span>
            <ul>
              {characterItem.episode.map((el) => (
                <Fragment>
                  <li>
										<a href={el} key={characterItem.id}>{el}</a>
										</li>
                </Fragment>
              ))}
            </ul>
          </div>
          <p><span>Status:</span> {characterItem.status}</p>
          <p><span>Created:</span> {characterItem.created}</p>
        </Fragment>
      )}
    </div>
  );
};

export default CharacterPage;
