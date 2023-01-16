import { useState, useEffect } from "react";
import {
	useUpdateLektorMutation,
	useDeleteLektorMutation,
} from "./lektorsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSave,
	faTrashCan,
	faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const USERNAME_REGEX = /^[A-z]{3,20}$/;
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const GMAIL_REGEX = /^(\W|^)[\w.+-]*@gmail\.com(\W|$)$/;
const EMAIL_REGEX = /^([A-z]|[1-9]|\.)*@([A-z]|[1-9]){2,10}\.[A-z]{1,5}$/;
const BANK_ACCOUNT_REGEX = /^[0-9]{9,18}\/[0-9]{4}$/;
const PHONE_NUM_REGEX = /^(\+\d{3})?\s?\d{3}\s?\d{3}\s?\d{3}$/;

const EditLektorForm = ({ lektor, mentors }: any) => {
	const [updateLektor, { isLoading, isSuccess, isError, error }] =
		useUpdateLektorMutation();

	const [
		deleteLektor,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delerror },
	] = useDeleteLektorMutation();

	const navigate = useNavigate();

	const [mentor, setMentor] = useState(lektor.mentor);
	const [username, setUsername] = useState(lektor.username);
	const [validUsername, setValidUsername] = useState(false);
	const [password, setPassword] = useState(lektor.password);
	const [validPassword, setValidPassword] = useState(false);
	const [name, setName] = useState(lektor.name);
	const [surname, setSurname] = useState(lektor.surname);
	const [gmail, setGmail] = useState(lektor.gmail);
	const [validGmail, setValidGmail] = useState(false);
	const [email, setEmail] = useState(lektor.email);
	const [validEmail, setValidEmail] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(lektor.phone_num);
	const [validPhoneNumber, setValidPhoneNumber] = useState(false);
	const [bankAccount, setBankAccount] = useState(lektor.bank_account);
	const [validBankAccount, setValidBankAccount] = useState(false);
	const [dateOfBirth, setDateOfBirth] = useState(lektor.date_of_birth);
	const [active, setActive] = useState(lektor.active);

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
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
			setActive("");
			navigate(`/sec/lektors`);
			/* Možná bude třeba změnit ^ TODO */
		}
	}, [isSuccess, isDelSuccess, navigate]);

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
		email ? setValidEmail(EMAIL_REGEX.test(email)) : setValidEmail(true);
	}, [email]);
	useEffect(() => {
		setValidBankAccount(BANK_ACCOUNT_REGEX.test(bankAccount));
	}, [bankAccount]);
	useEffect(() => {
		setValidPhoneNumber(PHONE_NUM_REGEX.test(phoneNumber));
	}, [phoneNumber]);

	let canSave: boolean;
	if (password) {
		canSave =
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
			].every(Boolean) && !isLoading;
	} else {
		canSave =
			[
				mentor,
				validUsername,
				name,
				surname,
				validGmail,
				validEmail,
				validBankAccount,
				validPhoneNumber,
				dateOfBirth,
			].every(Boolean) && !isLoading;
	}
	const onSaveLektorClicked = async (e: any) => {
		if (password) {
			await updateLektor({
				id: lektor.id,
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
				active: Boolean(active),
			});
		} else {
			await updateLektor({
				id: lektor.id,
				mentor: mentor,
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

	let options: Array<JSX.Element> = [];
	for (let i = 0; i < mentors.length; i++) {
		options.push(
			<option
				key={mentors[i].id}
				value={mentors[i].id}
			>{`${mentors[i].name} ${mentors[i].surname}`}</option>
		);
	}

	const onDeleteLektorClicked = async () => {
		await deleteLektor({ id: lektor.id });
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
		setActive("");
		navigate(`/sec/lektors`);
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

	const onActiveChanged = (e: any) => setActive(e.target.value);

	const errorClass = isError || isDelError ? "errorMessage" : "hide";
	const validUsernameClass = !validUsername ? "form__input--incomplete" : "";
	const validPasswordClass = !validPassword
		? "form__input--not_required_incomplete"
		: "";
	const validMentorClass = !mentor ? "form__input--incomplete" : "";
	const validNameClass = !name ? "form__input--incomplete" : "";
	const validSurnameClass = !surname ? "form__input--incomplete" : "";
	const validGmailClass = !validGmail
		? "form__input--not_required_incomplete"
		: "";
	const validEmailClass = !validEmail
		? "form__input--not_required_incomplete"
		: "";
	const validPhoneNumberClass = !phoneNumber ? "form__input--incomplete" : "";
	const validBankAccountClass = !validBankAccount
		? "form__input--incomplete"
		: "";
	const validDateOfBirthClass = !dateOfBirth ? "form__input--incomplete" : "";

	let errorContent;
	if (error) {
		if ("status" in error) {
			// you can access all properties of `FetchBaseQueryError` here
			const errMsg =
				"error" in error ? error.error : JSON.stringify(error.data);

			errorContent = errMsg;
		} else {
			// you can access all properties of `SerializedError` here
			errorContent = error.message;
		}
	}
	if (delerror) {
		if ("status" in delerror) {
			// you can access all properties of `FetchBaseQueryError` here
			const errMsg =
				"error" in delerror
					? delerror.error
					: JSON.stringify(delerror.data);

			errorContent = errMsg;
		} else {
			// you can access all properties of `SerializedError` here
			errorContent = delerror.message;
		}
	}

	const content = (
		<>
			<p className={errorClass}>{errorContent}</p>

			<form className="form" onSubmit={(e) => e.preventDefault()}>
				<div className="form__lektor-number">
					<h2>úprava informací o lektorovi {lektor.lektor_number}</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Uložit změny"
							onClick={onSaveLektorClicked}
							disabled={!canSave}
						>
							<FontAwesomeIcon icon={faSave} />
						</button>
						<button
							className="icon-button form--cancel-button"
							title="Zahodit změny"
							onClick={onStopEditingClicked}
						>
							<FontAwesomeIcon icon={faTimesCircle} />
						</button>
						<button
							className="icon-button form--delete-button"
							title="Smazat lekci"
							onClick={onDeleteLektorClicked}
						>
							<FontAwesomeIcon icon={faTrashCan} />
						</button>
					</div>
				</div>
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
					title="Příslušný lektor"
				>
					{options}
				</select>
				<br />
				<label className="form__label" htmlFor="lektor-username">
					Uživatelské jméno:
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
					Heslo:
				</label>
				<input
					className={`form__input ${validPasswordClass}`}
					id="lektor-password"
					name="pasword"
					type="password"
					autoComplete="off"
					value={password}
					onChange={onPasswordChanged}
				/>
				<br />
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
				<label className="form__label" htmlFor="lektor-date_of_birth">
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
					maxLength={55}
					autoComplete="off"
					value={email}
					onChange={onEmailChanged}
				/>
				<br />
				<label className="form__label" htmlFor="lektor-phone_number">
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
				<label className="form__label" htmlFor="lektor-bank_account">
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
				<label
					className="form__label form__checkbox-container"
					htmlFor="lektor-active"
				>
					účet aktivní:
					<input
						className="form__checkbox"
						id="lektor-active"
						name="lektor-active"
						type="checkbox"
						checked={active}
						onChange={onActiveChanged}
					/>
				</label>
			</form>
		</>
	);

	return content;
};

export default EditLektorForm;
