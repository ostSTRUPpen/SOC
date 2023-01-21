import { useState, useEffect } from "react";
import {
	useUpdateClientMutation,
	useDeleteClientMutation,
} from "./clientsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSave,
	faTrashCan,
	faTimesCircle,
	faEyeSlash,
	faEye,
} from "@fortawesome/free-solid-svg-icons";

import ClientSetings from "../../Settings/ClientSetings";
import { ROLES } from "../../../config/roles";
import useAuth from "../../../hooks/useAuth";

const USERNAME_REGEX = /^[A-z]{3,20}$/;
const PASSWORDOLD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const GMAIL_REGEX = /^(\W|^)[\w.+-]*@gmail\.com(\W|$)$/;
const EMAIL_REGEX = /^([A-z]|[1-9]|\.)*@([A-z]|[1-9]){2,10}\.[A-z]{1,5}$/;
const BANK_ACCOUNT_REGEX = /^[0-9]{9,18}\/[0-9]{4}$/;
const PHONE_NUM_REGEX = /^(\+\d{3})?\s?\d{3}\s?\d{3}\s?\d{3}$/;

const EditClientForm = ({ client, mentors }: any) => {
	const [updateClient, { isLoading, isSuccess, isError, error }] =
		useUpdateClientMutation();

	const [
		deleteClient,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delerror },
	] = useDeleteClientMutation();

	const navigate = useNavigate();

	//Account
	const [mentor, setMentor] = useState(client.mentor);
	const [username, setUsername] = useState(client.username);
	const [validUsername, setValidUsername] = useState(false);
	const [passwordOld, setPasswordOld] = useState(client.passwordOld);
	const [validPasswordOld, setValidPasswordOld] = useState(false);
	const [passwordNew, setPasswordNew] = useState(client.passwordNew);
	const [validPasswordNew, setValidPasswordNew] = useState(false);

	//Parent
	const [nameParent, setNameParent] = useState(client.name_parent);
	const [surnameParent, setSurnameParent] = useState(client.surname_parent);
	const [gmailParent, setGmailParent] = useState(client.gmail_parent);
	const [validGmailParent, setValidGmailParent] = useState(false);
	const [emailParent, setEmailParent] = useState(client.email_parent);
	const [validEmailParent, setValidEmailParent] = useState(false);
	const [phoneNumberParent, setPhoneNumberParent] = useState(
		client.phone_num_parent
	);
	const [validPhoneNumberParent, setValidPhoneNumberParent] = useState(false);
	const [bankAccount, setBankAccount] = useState(client.bank_account);
	const [validBankAccount, setValidBankAccount] = useState(false);

	//Child
	const [nameChild, setNameChild] = useState(client.name_child);
	const [surnameChild, setSurnameChild] = useState(client.surname_child);
	const [gmailChild, setGmailChild] = useState(client.gmail_child);
	const [validGmailChild, setValidGmailChild] = useState(false);
	const [emailChild, setEmailChild] = useState(client.email_child);
	const [validEmailChild, setValidEmailChild] = useState(false);
	const [phoneNumberChild, setPhoneNumberChild] = useState(
		client.phone_num_child
	);
	const [validPhoneNumberChild, setValidPhoneNumberChild] = useState(false);
	const [dateOfBirthChild, setDateOfBirthChild] = useState(
		client.date_of_birth_child
	);
	const [active, setActive] = useState(client.active);

	const { id, role } = useAuth();

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setMentor("");
			setUsername("");
			setPasswordOld("");
			setPasswordNew("");
			setNameParent("");
			setSurnameParent("");
			setGmailParent("");
			setEmailParent("");
			setPhoneNumberParent("");
			setBankAccount("");
			setNameChild("");
			setSurnameChild("");
			setGmailChild("");
			setEmailChild("");
			setPhoneNumberChild("");
			setDateOfBirthChild("");
			setActive("");
			if (role === ROLES.Client) {
				navigate(`/sec`);
			} else if (role === ROLES.Mentor) {
				navigate(`/sec/clients/show/${id}`);
			} else {
				navigate(`/sec/clients`);
			}

			/* Možná bude třeba změnit ^ TODO */
		}
	}, [isSuccess, isDelSuccess, navigate, role, id]);

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
		gmailParent
			? setValidGmailParent(GMAIL_REGEX.test(gmailParent))
			: setValidGmailParent(true);
	}, [gmailParent]);
	useEffect(() => {
		setValidEmailParent(EMAIL_REGEX.test(emailParent));
	}, [emailParent]);
	useEffect(() => {
		setValidPhoneNumberParent(PHONE_NUM_REGEX.test(phoneNumberParent));
	}, [phoneNumberParent]);
	useEffect(() => {
		bankAccount
			? setValidBankAccount(BANK_ACCOUNT_REGEX.test(bankAccount))
			: setValidBankAccount(true);
	}, [bankAccount]);

	useEffect(() => {
		gmailChild
			? setValidGmailChild(GMAIL_REGEX.test(gmailChild))
			: setValidGmailChild(true);
	}, [gmailChild]);
	useEffect(() => {
		emailChild
			? setValidEmailChild(EMAIL_REGEX.test(emailChild))
			: setValidEmailChild(true);
	}, [emailChild]);
	useEffect(() => {
		setValidPhoneNumberChild(PHONE_NUM_REGEX.test(phoneNumberChild));
	}, [phoneNumberChild]);

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
				mentor,
				validUsername,
				validPasswordOld,
				validPasswordNew,
				nameParent,
				surnameParent,
				validGmailParent,
				validEmailParent,
				validPhoneNumberParent,
				validBankAccount,
				nameChild,
				surnameChild,
				validGmailChild,
				validEmailChild,
				validPhoneNumberChild,
				dateOfBirthChild,
				mentor !== "0",
			].every(Boolean) && !isLoading;
	} else {
		canSave =
			[
				mentor,
				validUsername,
				nameParent,
				!passwordNew,
				surnameParent,
				validGmailParent,
				validEmailParent,
				validPhoneNumberParent,
				validBankAccount,
				nameChild,
				surnameChild,
				validGmailChild,
				validEmailChild,
				validPhoneNumberChild,
				validPhoneNumberChild,
				dateOfBirthChild,
				mentor !== "0",
			].every(Boolean) && !isLoading;
	}
	const onSaveClientClicked = async (e: any) => {
		if (passwordOld) {
			await updateClient({
				id: client.id,
				mentor: mentor,
				username,
				password_old: passwordOld,
				passwordNew_new: passwordNew,
				name_parent: nameParent,
				surname_parent: surnameParent,
				gmail_parent: gmailParent,
				email_parent: emailParent,
				phone_num_parent: phoneNumberParent,
				bank_account: bankAccount,
				name_child: nameChild,
				surname_child: surnameChild,
				gmail_child: gmailChild,
				email_child: emailChild,
				phone_num_child: phoneNumberChild,
				date_of_birth_child: dateOfBirthChild,
				active: Boolean(active),
			});
		} else {
			await updateClient({
				id: client.id,
				mentor: mentor,
				username,
				name_parent: nameParent,
				surname_parent: surnameParent,
				gmail_parent: gmailParent,
				email_parent: emailParent,
				phone_num_parent: phoneNumberParent,
				bank_account: bankAccount,
				name_child: nameChild,
				surname_child: surnameChild,
				gmail_child: gmailChild,
				email_child: emailChild,
				phone_num_child: phoneNumberChild,
				date_of_birth_child: dateOfBirthChild,
				active: Boolean(active),
			});
		}
	};

	let options: Array<JSX.Element> = [
		<option key={0} value={0}>
			Vybrat mentora
		</option>,
	];
	for (let i = 0; i < mentors.length; i++) {
		if (mentors[i].id === id || role === ROLES.Admin) {
			options.push(
				<option
					key={mentors[i].id}
					value={
						mentors[i].id
					}>{`${mentors[i].name} ${mentors[i].surname}`}</option>
			);
		}
	}

	const onDeleteClientClicked = async () => {
		await deleteClient({ id: client.id });
	};

	const onStopEditingClicked = (e: any) => {
		e.preventDefault();
		setMentor("");
		setUsername("");
		setPasswordOld("");
		setPasswordNew("");
		setNameParent("");
		setSurnameParent("");
		setGmailParent("");
		setEmailParent("");
		setPhoneNumberParent("");
		setBankAccount("");
		setNameChild("");
		setSurnameChild("");
		setGmailChild("");
		setEmailChild("");
		setPhoneNumberChild("");
		setDateOfBirthChild("");
		setActive("");
		if (role === ROLES.Client) {
			navigate(`/sec`);
		} else if (role === ROLES.Mentor) {
			navigate(`/sec/clients/show/${id}`);
		} else {
			navigate(`/sec/clients`);
		}
		/* Možná bude třeba změnit ^ TODO */
	};
	const onUsernameChanged = (e: any) => setUsername(e.target.value);
	const onPasswordOldChanged = (e: any) => setPasswordOld(e.target.value);
	const onPasswordNewChanged = (e: any) => setPasswordNew(e.target.value);

	const onParentNameChanged = (e: any) => setNameParent(e.target.value);
	const onParentSurnameChanged = (e: any) => setSurnameParent(e.target.value);
	const onParentGmailChanged = (e: any) => setGmailParent(e.target.value);
	const onParentEmailChanged = (e: any) => setEmailParent(e.target.value);
	const onParentPhoneNumberChanged = (e: any) =>
		setPhoneNumberParent(e.target.value);
	const onBankAccountChanged = (e: any) => setBankAccount(e.target.value);

	const onChildNameChanged = (e: any) => setNameChild(e.target.value);
	const onChildSurnameChanged = (e: any) => setSurnameChild(e.target.value);
	const onChildGmailChanged = (e: any) => setGmailChild(e.target.value);
	const onChildEmailChanged = (e: any) => setEmailChild(e.target.value);
	const onChildPhoneNumberChanged = (e: any) =>
		setPhoneNumberChild(e.target.value);
	const onChildDateOfBirthChanged = (e: any) =>
		setDateOfBirthChild(e.target.value);
	const onMentorIdChanged = (e: any) => setMentor(e.target.value);

	const onActiveChanged = (e: any) => setActive((prev: any) => !prev);

	const [passwordTypeOld, setPasswordTypeOld] = useState("password");
	const [passwordTypeNew, setPasswordTypeNew] = useState("password");

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
		? "form__input--not_required_incomplete"
		: "";
	const validMentorClass =
		!mentor || mentor === "0" ? "form__input--incomplete" : "";
	const validParentNameClass = !nameParent ? "form__input--incomplete" : "";
	const validParentSurnameClass = !surnameParent
		? "form__input--incomplete"
		: "";
	const validParentGmailClass = !validGmailParent
		? "form__input--not_required_incomplete"
		: "";
	const validParentEmailClass = !validEmailParent
		? "form__input--incomplete"
		: "";
	const validParentPhoneNumberClass = !validPhoneNumberParent
		? "form__input--incomplete"
		: "";
	const validBankAccountClass = !validBankAccount
		? "form__input--not_required_incomplete"
		: "";
	const validChildNameClass = !nameChild ? "form__input--incomplete" : "";
	const validChildSurnameClass = !surnameChild
		? "form__input--incomplete"
		: "";
	const validChildGmailClass = !validGmailChild
		? "form__input--not_required_incomplete"
		: "";
	const validChildEmailClass = !validEmailChild
		? "form__input--not_required_incomplete"
		: "";
	const validChildPhoneNumberClass = !validPhoneNumberChild
		? "form__input--incomplete"
		: "";
	const validChildDateOfBirthClass = !dateOfBirthChild
		? "form__input--incomplete"
		: "";

	const validPasswordNewClass = !validPasswordNew
		? "form__input--not_required_incomplete"
		: "";

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
		<div>
			<p className={errorClass}>{errorContent}</p>

			<form className="form" onSubmit={(e) => e.preventDefault()}>
				<div className="form__client-number">
					<h2>Úprava informací o klientovi {client.client_number}</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Uložit změny"
							onClick={onSaveClientClicked}
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
							title="Smazat lekci"
							onClick={onDeleteClientClicked}>
							<FontAwesomeIcon icon={faTrashCan} />
						</button>
					</div>
				</div>
				<details>
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
						title="Příslušný mentor">
						{options}
					</select>
					<br />
					<label className="form__label" htmlFor="client-username">
						Uživatelské jméno:
					</label>
					<input
						className={`form__input ${validUsernameClass}`}
						id="client-username"
						name="username"
						type="text"
						maxLength={20}
						autoComplete="off"
						value={username}
						onChange={onUsernameChanged}
					/>
					<br />
					<details>
						<summary>Změnit heslo</summary>
						<label
							className="form__label"
							htmlFor="client-passwordOld">
							Staré heslo:
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
							Nové heslo:
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
					<ClientSetings />
					<label
						className="form__label form__checkbox-container"
						htmlFor="client-active">
						účet aktivní:
					</label>
					<input
						className="form__checkbox"
						id="client-active"
						name="client-active"
						type="checkbox"
						checked={active}
						onChange={onActiveChanged}
					/>
				</details>
				<br />
				<details>
					<summary>Rodič</summary>
					<label className="form__label" htmlFor="client-name_parent">
						Jméno rodiče:
					</label>
					<input
						className={`form__input ${validParentNameClass}`}
						id="client-name_parent"
						name="client-name_parent"
						maxLength={50}
						type="text"
						autoComplete="off"
						value={nameParent}
						onChange={onParentNameChanged}
					/>
					<br />
					<label
						className="form__label"
						htmlFor="client-surname_parent">
						Příjmení rodiče:
					</label>
					<input
						className={`form__input--info ${validParentSurnameClass}`}
						id="client-surname_parent"
						name="poznámky"
						type="text"
						maxLength={50}
						autoComplete="off"
						value={surnameParent}
						onChange={onParentSurnameChanged}
					/>
					<br />
					<details>
						<summary>Kontakt</summary>
						<label
							className="form__label"
							htmlFor="client-gmail_parent">
							G-mail rodiče:
						</label>
						<input
							className={`form__input--info ${validParentGmailClass}`}
							id="client-gmail_parent"
							name="gmail_parent"
							type="text"
							maxLength={50}
							autoComplete="off"
							value={gmailParent}
							onChange={onParentGmailChanged}
						/>
						<br />
						<label
							className="form__label"
							htmlFor="client-email_parent">
							E-mail rodiče:
						</label>
						<input
							className={`form__input--info ${validParentEmailClass}`}
							id="client-email_parent"
							name="email_parent"
							type="text"
							maxLength={50}
							autoComplete="off"
							value={emailParent}
							onChange={onParentEmailChanged}
						/>
						<br />
						<label
							className="form__label"
							htmlFor="client-phone_number_parent">
							Telefoní číslo rodiče:
						</label>
						<input
							className={`form__input--info ${validParentPhoneNumberClass}`}
							id="client-phone_number_parent"
							name="phone_number_parent"
							type="tel"
							autoComplete="off"
							value={phoneNumberParent}
							onChange={onParentPhoneNumberChanged}
						/>
						<br />
						<label
							className="form__label"
							htmlFor="client-bank_account">
							Číslo účtu:
						</label>
						<input
							className={`form__input--info ${validBankAccountClass}`}
							id="client-bank_account"
							name="bank_account"
							type="text"
							maxLength={25}
							autoComplete="off"
							value={bankAccount}
							onChange={onBankAccountChanged}
						/>
					</details>
				</details>
				<br />
				<details>
					<summary>Dítě</summary>
					<label className="form__label" htmlFor="client-name_child">
						Jméno dítěte:
					</label>
					<input
						className={`form__input ${validChildNameClass}`}
						id="client-name_child"
						name="client-name_child"
						maxLength={50}
						type="text"
						autoComplete="off"
						value={nameChild}
						onChange={onChildNameChanged}
					/>
					<br />
					<label
						className="form__label"
						htmlFor="client-surname_child">
						Příjmení dítěte:
					</label>
					<input
						className={`form__input--info ${validChildSurnameClass}`}
						id="client-surname_child"
						name="poznámky"
						type="text"
						maxLength={50}
						autoComplete="off"
						value={surnameChild}
						onChange={onChildSurnameChanged}
					/>{" "}
					<br />
					<label
						className="form__label"
						htmlFor="lektor-date_of_birth_child">
						Datum narození dítěte:
					</label>
					<input
						className={`form__input--info ${validChildDateOfBirthClass}`}
						id="lektor-date_of_birth_child"
						name="date_of_birth_child"
						type="date"
						autoComplete="off"
						value={dateOfBirthChild}
						onChange={onChildDateOfBirthChanged}
					/>
					<br />
					<details>
						<summary>Kontakt</summary>
						<label
							className="form__label"
							htmlFor="client-gmail_child">
							G-mail dítěte:
						</label>
						<input
							className={`form__input--info ${validChildGmailClass}`}
							id="client-gmail_child"
							name="gmail_child"
							type="text"
							maxLength={50}
							autoComplete="off"
							value={gmailChild}
							onChange={onChildGmailChanged}
						/>
						<br />
						<label
							className="form__label"
							htmlFor="client-email_child">
							E-mail dítěte:
						</label>
						<input
							className={`form__input--info ${validChildEmailClass}`}
							id="client-email_child"
							name="email_child"
							type="text"
							maxLength={50}
							autoComplete="off"
							value={emailChild}
							onChange={onChildEmailChanged}
						/>
						<br />
						<label
							className="form__label"
							htmlFor="client-phone_number_child">
							Telefoní číslo dítěte:
						</label>
						<input
							className={`form__input--info ${validChildPhoneNumberClass}`}
							id="client-phone_number_child"
							name="phone_number_child"
							type="tel"
							autoComplete="off"
							value={phoneNumberChild}
							onChange={onChildPhoneNumberChanged}
						/>
						<br />
					</details>
				</details>
			</form>
		</div>
	);

	return content;
};

export default EditClientForm;
