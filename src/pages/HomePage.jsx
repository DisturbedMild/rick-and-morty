import CharactersList from "../components/CharactersList";

import classes from './HomePage.module.css';
const HomePage = () => {
	return (
		<section className={classes.list}>
			<CharactersList/>
		</section>
	)
}

export default HomePage;