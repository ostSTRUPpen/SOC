import { useState, useEffect } from "react";
import { useAddNewLektorMutation } from "./lektorsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faEyeSlash,
	faSave,
	faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import LektorSettings from "../../Settings/LektorSettings";
import { ROLES } from "../../../config/roles";
import useAuth from "../../../hooks/useAuth";

const USERNAME_REGEX = /^[A-z]{3,20}$/;
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const GMAIL_REGEX = /^(\W|^)[\w.+-]*@gmail\.com(\W|$)$/;
const EMAIL_REGEX = /^([A-z]|[1-9]|\.)*@([A-z]|[1-9]){2,10}\.[A-z]{1,5}$/;
const BANK_ACCOUNT_REGEX = /^[0-9]{9,18}\/[0-9]{4}$/;
const PHONE_NUM_REGEX = /^(\+\d{3})?\s?\d{3}\s?\d{3}\s?\d{3}$/;

const NewLektorForm = ({ mentors }: any) => {
	const navigate = useNavigate();

	const [addNewLektor, { isLoading, isSuccess, isError, error }] =
		useAddNewLektorMutation();

	const [mentor, setMentor] = useState("");
	const [username, setUsername] = useState("");
	const [validUsername, setValidUsername] = useState(false);
	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [gmail, setGmail] = useState("");
	const [validGmail, setValidGmail] = useState(false);
	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [validPhoneNumber, setValidPhoneNumber] = useState(false);
	const [bankAccount, setBankAccount] = useState("");
	const [validBankAccount, setValidBankAccount] = useState(false);
	const [dateOfBirth, setDateOfBirth] = useState("");

	const [passwordType, setPasswordType] = useState("password");

	const { id, role } = useAuth();

	useEffect(() => {
		if (isSuccess) {
			setMentor("");
			setUsername("");
			setPassword("");
			setName("");
			setSurname("");
			setGmail("");
			setEmail("");
			setPhoneNumber("");
			setBankAccount("");
			setDateOfBirth("");
			if (role === ROLES.Mentor) {
				navigate(`/sec/lektors/show/${id}`);
			} else {
				navigate(`/sec/lektors`);
			}
		}
	}, [isSuccess, navigate, id, role]);

	useEffect(() => {
		setValidUsername(USERNAME_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
	}, [password]);

	useEffect(() => {
		gmail ? setValidGmail(GMAIL_REGEX.test(gmail)) : setValidGmail(true);
	}, [gmail]);
	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);
	useEffect(() => {
		setValidBankAccount(BANK_ACCOUNT_REGEX.test(bankAccount));
	}, [bankAccount]);
	useEffect(() => {
		setValidPhoneNumber(PHONE_NUM_REGEX.test(phoneNumber));
	}, [phoneNumber]);

	let canSave: boolean =
		[
			mentor,
			validUsername,
			validPassword,
			name,
			surname,
			validGmail,
			validEmail,
			validBankAccount,
			validPhoneNumber,
			dateOfBirth,
			mentor !== "0",
		].every(Boolean) && !isLoading;

	const onSaveLektorClicked = async (e: any) => {
		e.preventDefault();
		await addNewLektor({
			mentor: mentor,
			username,
			password,
			name,
			surname,
			gmail,
			email,
			phone_num: phoneNumber,
			bank_account: bankAccount,
			date_of_birth: dateOfBirth,
		});
	};

	const onStopEditingClicked = (e: any) => {
		e.preventDefault();
		setMentor("");
		setUsername("");
		setPassword("");
		setName("");
		setSurname("");
		setGmail("");
		setEmail("");
		setPhoneNumber("");
		setBankAccount("");
		setDateOfBirth("");
		if (role === ROLES.Mentor) {
			navigate(`/sec/lektors/show/${id}`);
		} else {
			navigate(`/sec/lektors`);
		}
	};

	const onUsernameChanged = (e: any) => setUsername(e.target.value);
	const onPasswordChanged = (e: any) => setPassword(e.target.value);
	const onNameChanged = (e: any) => setName(e.target.value);
	const onSurnameChanged = (e: any) => setSurname(e.target.value);
	const onGmailChanged = (e: any) => setGmail(e.target.value);
	const onEmailChanged = (e: any) => setEmail(e.target.value);
	const onPhoneNumberChanged = (e: any) => setPhoneNumber(e.target.value);
	const onDateOfBirthChanged = (e: any) => setDateOfBirth(e.target.value);
	const onBankAccountChanged = (e: any) => setBankAccount(e.target.value);
	const onMentorIdChanged = (e: any) => setMentor(e.target.value);

	const togglePassword = () =>
		passwordType === "password"
			? setPasswordType("text")
			: setPasswordType("password");

	const errorClass = isError ? "errorMessage" : "hide";
	const validUsernameClass = !validUsername ? "form__input--incomplete" : "";
	const validPasswordClass = !validPassword ? "form__input--incomplete" : "";
	const validMentorClass =
		!mentor || mentor === "0" ? "form__input--incomplete" : "";
	const validNameClass = !name ? "form__input--incomplete" : "";
	const validSurnameClass = !surname ? "form__input--incomplete" : "";
	const validGmailClass = !validGmail
		? "form__input--not_required_incomplete"
		: "";
	const validEmailClass = !validEmail ? "form__input--incomplete" : "";
	const validPhoneNumberClass = !validPhoneNumber
		? "form__input--incomplete"
		: "";
	const validBankAccountClass = !validBankAccount
		? "form__input--incomplete"
		: "";
	const validDateOfBirthClass = !dateOfBirth ? "form__input--incomplete" : "";

	const validAccountDetailsClass =
		validMentorClass + validUsernameClass + validPasswordClass !== ""
			? "details_incomplete"
			: "";

	const validContactDetailsClass =
		validEmailClass + validGmailClass + validPhoneNumberClass !== ""
			? "details_incomplete"
			: "";
	const validDetailsClass =
		validNameClass +
			validSurnameClass +
			validContactDetailsClass +
			validBankAccountClass +
			validDateOfBirthClass !==
		""
			? "details_incomplete"
			: "";

	let errorContent;
	if (error) {
		if ("status" in error) {
			const errMsg =
				"error" in error ? error.error : JSON.stringify(error.data);

			errorContent = errMsg;
		} else {
			errorContent = error.message;
		}
	}

	let options: Array<JSX.Element> = [
		<option key={0} value={0}>
			Vybrat mentora
		</option>,
	];
	mentors.forEach((mentor: any) =>
		mentor.id === id || role === ROLES.Admin
			? options.push(
					<option
						key={mentor.id}
						value={
							mentor.id
						}>{`${mentor.name} ${mentor.surname}`}</option>
			  )
			: ""
	);

	const content = (
		<div>
			<p className={errorClass}>{errorContent}</p>

			<form className="form" onSubmit={(e) => e.preventDefault()}>
				<div className="form__lektor-number">
					<h2>Tvorba nového lektora</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Uložit změny"
							onClick={onSaveLektorClicked}
							disabled={!canSave}>
							<FontAwesomeIcon icon={faSave} />
						</button>
						<button
							className="icon-button form--cancel-button"
							title="Zahodit změny"
							onClick={onStopEditingClicked}>
							<FontAwesomeIcon icon={faTimesCircle} />
						</button>
					</div>
				</div>
				<details open className={validAccountDetailsClass}>
					<summary>Účet</summary>
					<label className="form__label" htmlFor="mentors">
						Příslušný mentor:
					</label>
					<select
						id="mentors"
						name="mentor_select"
						className={`form__select ${validMentorClass}`}
						multiple={false}
						size={1}
						value={mentor}
						onChange={onMentorIdChanged}
						title="Příslušný lektor">
						{options}
					</select>
					<br />
					<label className="form__label" htmlFor="lektor-username">
						Uživatelské jméno (Pouze písmena, délka 3-20 znaků.):
					</label>
					<input
						className={`form__input ${validUsernameClass}`}
						id="lektor-username"
						name="username"
						type="text"
						maxLength={20}
						autoComplete="off"
						value={username}
						onChange={onUsernameChanged}
					/>
					<br />
					<label className="form__label" htmlFor="lektor-password">
						Heslo (Písmena, čísla a znaky !@#$. Délka 4-12.):
					</label>
					<input
						className={`form__input ${validPasswordClass}`}
						id="lektor-password"
						name="password"
						type={passwordType}
						autoComplete="new-password"
						value={password}
						onChange={onPasswordChanged}
					/>
					<button
						className="font__input--change-password-visibility"
						onClick={togglePassword}>
						{passwordType === "password" ? (
							<i>
								<FontAwesomeIcon icon={faEyeSlash} />
							</i>
						) : (
							<i>
								<FontAwesomeIcon icon={faEye} />
							</i>
						)}
					</button>
					<LektorSettings />
				</details>
				<br />
				<details open className={validDetailsClass}>
					<summary>Údaje</summary>
					<label className="form__label" htmlFor="lektor-name">
						Jméno:
					</label>
					<input
						className={`form__input ${validNameClass}`}
						id="lektor-name"
						name="lektor-name"
						maxLength={50}
						type="text"
						autoComplete="off"
						value={name}
						onChange={onNameChanged}
					/>
					<br />
					<label className="form__label" htmlFor="lektor-surname">
						Příjmení:
					</label>
					<input
						className={`form__input--info ${validSurnameClass}`}
						id="lektor-surname"
						name="poznámky"
						type="text"
						maxLength={50}
						autoComplete="off"
						value={surname}
						onChange={onSurnameChanged}
					/>
					<br />
					<label
						className="form__label"
						htmlFor="lektor-date_of_birth">
						Datum narození:
					</label>
					<input
						className={`form__input--info ${validDateOfBirthClass}`}
						id="lektor-date_of_birth"
						name="date_of_birtht"
						type="date"
						autoComplete="off"
						value={dateOfBirth}
						onChange={onDateOfBirthChanged}
					/>
					<br />
					<details open className={validContactDetailsClass}>
						<summary>Kontakt</summary>
						<label className="form__label" htmlFor="lektor-gmail">
							G-mail:
						</label>
						<input
							className={`form__input--info ${validGmailClass}`}
							id="lektor-gmail"
							name="gmail"
							type="text"
							maxLength={50}
							autoComplete="off"
							value={gmail}
							onChange={onGmailChanged}
						/>
						<br />
						<label className="form__label" htmlFor="lektor-email">
							E-mail:
						</label>
						<input
							className={`form__input--info ${validEmailClass}`}
							id="lektor-email"
							name="email"
							type="text"
							maxLength={50}
							autoComplete="off"
							value={email}
							onChange={onEmailChanged}
						/>
						<br />
						<label
							className="form__label"
							htmlFor="lektor-phone_number">
							Telefoní číslo:
						</label>
						<input
							className={`form__input--info ${validPhoneNumberClass}`}
							id="lektor-phone_number"
							name="phone_number"
							type="tel"
							autoComplete="off"
							value={phoneNumber}
							onChange={onPhoneNumberChanged}
						/>
						<br />
						<label
							className="form__label"
							htmlFor="lektor-bank_account">
							Číslo účtu:
						</label>
						<input
							className={`form__input--info ${validBankAccountClass}`}
							id="lektor-bank_account"
							name="bank_account"
							type="text"
							maxLength={25}
							autoComplete="off"
							value={bankAccount}
							onChange={onBankAccountChanged}
						/>
						<br />
					</details>
				</details>
			</form>
		</div>
	);

	return content;
};

export default NewLektorForm;
