import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const PublicPage = () => {
	useTitle("Learning Triangle");
	const content = (
		<section className="public">
			<header>
				<img
					src={process.env.PUBLIC_URL + "lt_logo.png"}
					alt="Learning Triangle logo"
				/>
			</header>
			<main className="public__main">
				<p className="public_page--can_do--paragraph">
					Informační systém zvládne:
				</p>
				<ul className="public_page--can_do--list">
					<li className="public_page--can_do--list_item">
						Všechny požadavky vedené na předchozí google tabulky
					</li>
					<li className="public_page--can_do--list_item">
						Předvyplnění dnešního data u zápisu lekce, faktury,
						výplaty dle nastavení
					</li>
					<li className="public_page--can_do--list_item">
						Předvyplnění délky lekce, dle nastavení
					</li>
					<li className="public_page--can_do--list_item">
						Předvyplnění částky u výplaty a faktury, dle nastavení
					</li>
				</ul>
				<br />
				<address className="public_page--adress">
					<a href="https://www.learningtriangle.cz/">
						Learning Triangle
					</a>
					<br />
					Havlíčkův Brod
					<br />
					<a href="tel:+420722207321">(+420) 722 207 321</a>
					<br />
					<a href="mailto:info@learningtriangle.cz">
						info@learningtriangle.cz
					</a>
					<br />
					<a href="https://www.facebook.com/learningtriangle.cz">
						Facebook
					</a>
				</address>
				<br />
				<p className="public_page--report_bugs--paragraph">
					Nalezené chyby nebo bugy hlaste prosím na:{" "}
					<a
						className="public_page--report_bugs--email_link"
						href="mailto:vojvol@post.cz">
						vojvol@post.cz
					</a>{" "}
					s předmětem "Bug LT IS".
				</p>
			</main>
			<footer>
				<Link to="/login" className="public-login-link">
					Přihlášení do informačního systému
				</Link>
			</footer>
		</section>
	);
	return content;
};
export default PublicPage;
