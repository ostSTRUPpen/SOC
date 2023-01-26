import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";

const Login = () => {
	useTitle("LT IS: Přihlášení");
	const userRef: any = useRef(null);
	const errRef: any = useRef();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [persist, setPersist] = usePersist();

	const [passwordType, setPasswordType] = useState("password");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg("");
	}, [username, password]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const { accessToken } = await login({
				username,
				password,
			}).unwrap();
			dispatch(setCredentials({ accessToken }));
			setUsername("");
			setPassword("");
			navigate("/sec");
		} catch (err: any) {
			if (!err.status) {
				setErrMsg("No Server Response");
			} else if (err.status === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.status === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg(err.data?.message);
			}
			errRef.current.focus();
		}
	};

	const handleUserInput = (e: any) => setUsername(e.target.value);
	const handlePwdInput = (e: any) => setPassword(e.target.value);

	const togglePassword = () =>
		passwordType === "password"
			? setPasswordType("text")
			: setPasswordType("password");

	const handleToggle = () => setPersist((prev: any) => !prev);

	const errClass = errMsg ? "errmsg" : "offscreen";

	if (isLoading) return <div className="loading"></div>;

	const content = (
		<section className="public-login">
			<header>
				<h1>Přihlášení do informačního systému</h1>
			</header>
			<main className="login">
				<p ref={errRef} className={errClass} aria-live="assertive">
					{errMsg}
				</p>

				<form className="form" onSubmit={handleSubmit}>
					<label htmlFor="username">Uživatelské jméno:</label>
					<br />
					<input
						className="form__input login_form--username"
						type="text"
						id="username"
						ref={userRef}
						value={username}
						onChange={handleUserInput}
						autoComplete="off"
						required
					/>
					<br />
					<label htmlFor="password">Heslo:</label>
					<br />
					<input
						className="form__input"
						type={passwordType}
						id="password"
						onChange={handlePwdInput}
						value={password}
						required
					/>
					<input
						className="font__input--change-password-visibility login_form--password_visibility"
						title="Zobrazit heslo"
						type="button"
						onClick={togglePassword}
						value={
							passwordType === "password" ? "Zobrazit" : "Skrýt"
						}
					/>

					<br />
					<label htmlFor="persist" className="form__persist">
						<input
							type="checkbox"
							className="form__checkbox"
							id="persist"
							onChange={handleToggle}
							checked={JSON.parse(persist)}
						/>
						Zapamatovat zařízení
					</label>
					<br />
					<input
						className="form__submit-button login_form--submit_button"
						title="Přihlásit se"
						type="submit"
						value="Přihlásit se"
					/>
				</form>
			</main>
			<footer>
				<Link to="/">Zpět na domovskou obrazovku</Link>
			</footer>
		</section>
	);

	return content;
};
export default Login;
