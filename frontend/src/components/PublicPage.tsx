import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const PublicPage = () => {
	useTitle("Learning Triangle");
	const content = (
		<section className="public">
			<header>
				<h1>TODO</h1>
			</header>
			<main className="public__main">
				<p>TODO</p>
				<address className="public__addr">
					TODO
					<br />
					TODO
					<br />
					TODO
					<br />
					<a href="TODO">TODO</a>
				</address>
				<br />
				<p>TODO</p>
			</main>
			<footer>
				<Link to="/login">Přihlášení do informačního systému</Link>
			</footer>
		</section>
	);
	return content;
};
export default PublicPage;
