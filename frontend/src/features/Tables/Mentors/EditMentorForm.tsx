import { useState, useEffect } from "react";
import {
	useUpdateMentorMutation,
	useDeleteMentorMutation,
} from "./mentorsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faEyeSlash,
	faSave,
	faTimesCircle,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import MentorSetings from "../../Settings/MentorSettings";
import { ROLES } from "../../../config/roles";
import useAuth from "../../../hooks/useAuth";

const USERNAME_REGEX = /^[A-z]{3,20}$/;
const PASSWORDOLD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const GMAIL_REGEX = /^(\W|^)[\w.+-]*@gmail\.com(\W|$)$/;
const EMAIL_REGEX = /^([A-z]|[1-9]|\.)*@([A-z]|[1-9]){2,10}\.[A-z]{1,5}$/;
const BANK_ACCOUNT_REGEX = /^[0-9]{9,18}\/[0-9]{4}$/;
const PHONE_NUM_REGEX = /^(\+\d{3})?\s?\d{3}\s?\d{3}\s?\d{3}$/;

const EditMentorForm = ({ mentor }: any) => {
	const navigate = useNavigate();

	const [updateMentor, { isLoading, isSuccess, isError, error }] =
		useUpdateMentorMutation();

	const [
		deleteMentor,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delerror },
	] = useDeleteMentorMutation();

	const [username, setUsername] = useState(mentor.username);
	const [validUsername, setValidUsername] = useState(false);
	const [passwordOld, setPasswordOld] = useState(mentor.passwordOld);
	const [validPasswordOld, setValidPasswordOld] = useState(false);
	const [passwordNew, setPasswordNew] = useState(mentor.passwordNew);
	const [validPasswordNew, setValidPasswordNew] = useState(false);

	const [name, setName] = useState(mentor.name);
	const [surname, setSurname] = useState(mentor.surname);
	const [gmail, setGmail] = useState(mentor.gmail);
	const [validGmail, setValidGmail] = useState(false);
	const [email, setEmail] = useState(mentor.email);
	const [validEmail, setValidEmail] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(mentor.phone_num);
	const [validPhoneNumber, setValidPhoneNumber] = useState(false);
	const [bankAccount, setBankAccount] = useState(mentor.bank_account);
	const [validBankAccount, setValidBankAccount] = useState(false);
	const [dateOfBirth, setDateOfBirth] = useState(mentor.date_of_birth);
	const [active, setActive] = useState(mentor.active);

	const { id, role, isAdmin, isTest } = useAuth();

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setUsername("");
			setPasswordOld("");
			setPasswordNew("");
			setName("");
			setSurname("");
			setGmail("");
			setEmail("");
			setPhoneNumber("");
			setBankAccount("");
			setDateOfBirth("");
			setActive(false);
			if (role === ROLES.Mentor) {
				navigate(`/sec`);
			} else {
				navigate(`/sec/mentors`);
			}
		}
	}, [isSuccess, isDelSuccess, navigate, id, role]);

	useEffect(() => {
		setValidUsername(USERNAME_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		if (passwordOld) {
			setValidPasswordOld(PASSWORDOLD_REGEX.test(passwordOld));
		} else {
			setValidPasswordOld(true);
		}
	}, [passwordOld]);

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

	useEffect(() => {
		if (passwordOld) {
			setValidPasswordNew(PASSWORDOLD_REGEX.test(passwordNew));
		} else {
			setValidPasswordNew(true);
			setPasswordNew("");
		}
	}, [passwordNew, passwordOld]);

	let canSave: boolean;
	if (passwordOld) {
		canSave =
			[
				validUsername,
				validPasswordOld,
				validPasswordNew,
				name,
				surname,
				validGmail,
				validEmail,
				validBankAccount,
				validPhoneNumber,
			].every(Boolean) && !isLoading;
	} else {
		canSave =
			[
				validUsername,
				name,
				surname,
				validGmail,
				validEmail,
				validBankAccount,
				validPhoneNumber,
			].every(Boolean) && !isLoading;
	}

	const onSaveMentorClicked = async (e: any) => {
		e.preventDefault();
		if (passwordOld) {
			await updateMentor({
				id: mentor.id,
				username,
				password_old: passwordOld,
				password_new: passwordNew,
				name,
				surname,
				gmail,
				email,
				phone_num: phoneNumber,
				bank_account: bankAccount,
				date_of_birth: dateOfBirth,
				active: Boolean(active),
			});
		} else {
			await updateMentor({
				id: mentor.id,
				username,
				name,
				surname,
				gmail,
				email,
				phone_num: phoneNumber,
				bank_account: bankAccount,
				date_of_birth: dateOfBirth,
				active: Boolean(active),
			});
		}
	};

	const onDeleteMentorClicked = async () => {
		await deleteMentor({ id: mentor.id });
	};

	const onStopEditingClicked = (e: any) => {
		e.preventDefault();
		setUsername("");
		setPasswordOld("");
		setPasswordNew("");
		setName("");
		setSurname("");
		setGmail("");
		setEmail("");
		setPhoneNumber("");
		setBankAccount("");
		setDateOfBirth("");
		setActive(false);
		if (role === ROLES.Mentor) {
			navigate(`/sec`);
		} else {
			navigate(`/sec/mentors`);
		}
	};

	const onUsernameChanged = (e: any) => setUsername(e.target.value);
	const onPasswordOldChanged = (e: any) => setPasswordOld(e.target.value);
	const onPasswordNewChanged = (e: any) => setPasswordNew(e.target.value);

	const [passwordTypeOld, setPasswordTypeOld] = useState("password");
	const [passwordTypeNew, setPasswordTypeNew] = useState("password");

	const onNameChanged = (e: any) => setName(e.target.value);
	const onSurnameChanged = (e: any) => setSurname(e.target.value);
	const onGmailChanged = (e: any) => setGmail(e.target.value);
	const onEmailChanged = (e: any) => setEmail(e.target.value);
	const onPhoneNumberChanged = (e: any) => setPhoneNumber(e.target.value);
	const onDateOfBirthChanged = (e: any) => setDateOfBirth(e.target.value);
	const onBankAccountChanged = (e: any) => setBankAccount(e.target.value);
	const onActiveChanged = (e: any) => setActive((prev: any) => !prev);

	const togglePasswordOld = () =>
		passwordTypeOld === "password"
			? setPasswordTypeOld("text")
			: setPasswordTypeOld("password");
	const togglePasswordNew = () =>
		passwordTypeNew === "password"
			? setPasswordTypeNew("text")
			: setPasswordTypeNew("password");

	const errorClass = isError || isDelError ? "errorMessage" : "hide";
	const validUsernameClass = !validUsername ? "form__input--incomplete" : "";
	const validPasswordOldClass = !validPasswordOld
		? "form__input--incomplete"
		: "";
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
	const validDateOfBirthClass = !dateOfBirth
		? "form__input--not_required_incomplete"
		: "";
	const validPasswordNewClass = !validPasswordNew
		? "form__input--not_required_incomplete"
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
	if (delerror) {
		if ("status" in delerror) {
			const errMsg =
				"error" in delerror
					? delerror.error
					: JSON.stringify(delerror.data);

			errorContent = errMsg;
		} else {
			errorContent = delerror.message;
		}
	}

	const content = (
		<div>
			<p className={errorClass}>{errorContent}</p>

			<form className="form" onSubmit={(e) => e.preventDefault()}>
				<div className="form__mentor-number">
					<h2>Úprava mentora</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Uložit změny"
							onClick={onSaveMentorClicked}
							disabled={!canSave}>
							<FontAwesomeIcon icon={faSave} />
						</button>
						<button
							className="icon-button form--cancel-button"
							title="Zahodit změny"
							onClick={onStopEditingClicked}>
							<FontAwesomeIcon icon={faTimesCircle} />
						</button>
						<button
							className="icon-button form--delete-button"
							title="Smazat mentora"
							onClick={onDeleteMentorClicked}>
							<FontAwesomeIcon icon={faTrashCan} />
						</button>
					</div>
				</div>
				<details>
					<summary>Účet</summary>
					<label className="form__label" htmlFor="mentor-username">
						Uživatelské jméno (Pouze písmena, délka 3-20 znaků.):
					</label>
					<input
						className={`form__input ${validUsernameClass}`}
						id="mentor-username"
						name="username"
						type="text"
						maxLength={20}
						autoComplete="off"
						value={username}
						onChange={onUsernameChanged}
					/>
					<br />
					{!isTest && (
						<details>
							<summary>Změnit heslo</summary>
							<label
								className="form__label"
								htmlFor="client-passwordOld">
								Staré heslo (Písmena, čísla a znaky !@#$. Délka
								4-12.):
							</label>
							<input
								className={`form__input ${validPasswordOldClass}`}
								id="client-passwordOld"
								name="password"
								type={passwordTypeOld}
								autoComplete="current-password"
								value={passwordOld}
								onChange={onPasswordOldChanged}
							/>
							<button
								className="font__input--change-password-visibility"
								onClick={togglePasswordOld}>
								{passwordTypeOld === "password" ? (
									<i>
										<FontAwesomeIcon icon={faEyeSlash} />
									</i>
								) : (
									<i>
										<FontAwesomeIcon icon={faEye} />
									</i>
								)}
							</button>
							<br />
							<label
								className="form__label"
								htmlFor="client-password-new">
								Nové heslo (Písmena, čísla a znaky !@#$. Délka
								4-12.):
							</label>
							<input
								className={`form__input ${validPasswordNewClass}`}
								id="client-password-new"
								name="password"
								type={passwordTypeNew}
								autoComplete="new-password"
								value={passwordNew}
								onChange={onPasswordNewChanged}
							/>
							<button
								className="font__input--change-password-visibility"
								onClick={togglePasswordNew}>
								{passwordTypeNew === "password" ? (
									<i>
										<FontAwesomeIcon icon={faEyeSlash} />
									</i>
								) : (
									<i>
										<FontAwesomeIcon icon={faEye} />
									</i>
								)}
							</button>
						</details>
					)}
					<MentorSetings />
					{isAdmin && (
						<>
							<label
								className="form__label form__checkbox-container"
								htmlFor="mentor-active">
								účet aktivní:
							</label>
							<input
								className="form__checkbox"
								id="mentor-active"
								name="mentor-active"
								type="checkbox"
								checked={active}
								onChange={onActiveChanged}
							/>
						</>
					)}
				</details>
				<br />
				<details>
					<summary>Údaje</summary>
					<label className="form__label" htmlFor="mentor-name">
						Jméno:
					</label>
					<input
						className={`form__input ${validNameClass}`}
						id="mentor-name"
						name="mentor-name"
						maxLength={50}
						type="text"
						autoComplete="off"
						value={name}
						onChange={onNameChanged}
					/>
					<br />
					<label className="form__label" htmlFor="mentor-surname">
						Příjmení:
					</label>
					<input
						className={`form__input ${validSurnameClass}`}
						id="mentor-surname"
						name="surname"
						type="text"
						maxLength={50}
						autoComplete="off"
						value={surname}
						onChange={onSurnameChanged}
					/>
					<br />
					<label
						className="form__label"
						htmlFor="mentor-date_of_birth">
						Datum narození:
					</label>
					<input
						className={`form__input ${validDateOfBirthClass}`}
						id="mentor-date_of_birth"
						name="date_of_birtht"
						type="date"
						autoComplete="off"
						value={dateOfBirth}
						onChange={onDateOfBirthChanged}
					/>
					<br />
					<details>
						<summary>Kontakt</summary>
						<label className="form__label" htmlFor="mentor-gmail">
							G-mail:
						</label>
						<input
							className={`form__input ${validGmailClass}`}
							id="mentor-gmail"
							name="gmail"
							type="text"
							maxLength={50}
							autoComplete="off"
							value={gmail}
							onChange={onGmailChanged}
						/>
						<br />
						<label className="form__label" htmlFor="mentor-email">
							E-mail:
						</label>
						<input
							className={`form__input ${validEmailClass}`}
							id="mentor-email"
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
							htmlFor="mentor-phone_number">
							Telefoní číslo:
						</label>
						<input
							className={`form__input ${validPhoneNumberClass}`}
							id="mentor-phone_number"
							name="phone_number"
							type="tel"
							autoComplete="off"
							value={phoneNumber}
							onChange={onPhoneNumberChanged}
						/>
						<br />
						<label
							className="form__label"
							htmlFor="mentor-bank_account">
							Číslo účtu:
						</label>
						<input
							className={`form__input ${validBankAccountClass}`}
							id="mentor-bank_account"
							name="bank_account"
							type="text"
							maxLength={25}
							autoComplete="off"
							value={bankAccount}
							onChange={onBankAccountChanged}
						/>
					</details>
				</details>
			</form>
		</div>
	);

	return content;
};

export default EditMentorForm;
