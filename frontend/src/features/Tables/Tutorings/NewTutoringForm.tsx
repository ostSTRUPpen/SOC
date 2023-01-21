import { useAddNewTutoringMutation } from "./tutoringsApiSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import { ROLES } from "../../../config/roles";

const SUBJECT_REGEX = /^[A-z]{1,3}$/;

const NewTutoringForm = ({ mentorId, lektors, clients }: any) => {
	const [addNewTutoring, { isLoading, isSuccess, isError, error }] =
		useAddNewTutoringMutation();

	const navigate = useNavigate();

	const [lektor, setLektor] = useState("");
	const [client, setClient] = useState("");
	const [subject, setSubject] = useState("");
	const [validSubject, setValidSubject] = useState(false);

	const { id, role } = useAuth();

	useEffect(() => {
		if (isSuccess) {
			setLektor("");
			setClient("");
			setSubject("");
			if (role === ROLES.Mentor) {
				navigate(`/sec/tutorings/show3/${id}`);
			} else {
				navigate(`/sec/tutorings`);
			}
			/* Možná bude třeba změnit ^ TODO */
		}
	}, [isSuccess, navigate, id, role]);

	useEffect(() => {
		setValidSubject(SUBJECT_REGEX.test(subject));
	}, [subject]);

	let canSave: boolean =
		[lektor, client, validSubject, lektor !== "0", client !== "0"].every(
			Boolean
		) && !isLoading;

	const onSaveTutoringClicked = async (e: any) => {
		await addNewTutoring({
			lektor,
			client,
			subject,
		});
	};

	const onStopEditingClicked = (e: any) => {
		e.preventDefault();
		setLektor("");
		setClient("");
		setSubject("");
		if (role === ROLES.Mentor) {
			navigate(`/sec/tutorings/show3/${id}`);
		} else {
			navigate(`/sec/tutorings`);
		}
		/* Možná bude třeba změnit ^ TODO */
	};

	let optionsLektor: Array<JSX.Element> = [
		<option key={0} value={0}>
			Vybrat lektora
		</option>,
	];
	for (let i = 0; i < lektors.length; i++) {
		if (lektors[i].mentor === id || role === ROLES.Admin) {
			optionsLektor.push(
				<option
					key={lektors[i].id}
					value={
						lektors[i].id
					}>{`${lektors[i].name} ${lektors[i].surname}`}</option>
			);
		}
	}

	let optionsClient: Array<JSX.Element> = [
		<option key={0} value={0}>
			Vybrat klienta
		</option>,
	];
	for (let i = 0; i < clients.length; i++) {
		if (clients[i].mentor === id && role !== ROLES.Admin) {
			optionsClient.push(
				<option
					key={clients[i].id}
					value={
						clients[i].id
					}>{`${clients[i].name_child} ${clients[i].surname_child}`}</option>
			);
		} else if (role === ROLES.Admin) {
			optionsClient.push(
				<option
					key={clients[i].id}
					value={
						clients[i].id
					}>{`${clients[i].name_child} ${clients[i].surname_child}`}</option>
			);
		}
	}

	const onLektorsChanged = (e: any) => setLektor(e.target.value);
	const onClientsChanged = (e: any) => setClient(e.target.value);
	const onSubjectsChanged = (e: any) => setSubject(e.target.value);

	const errorClass = isError ? "errorMessage" : "hide";
	const validLektorClass =
		!lektor || lektor === "0" ? "form__input--incomplete" : "";
	const validClientClass =
		!client || client === "0" ? "form__input--incomplete" : "";
	const validSubjectClass = !validSubject ? "form__input--incomplete" : "";

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

	const content = (
		<div>
			<p className={errorClass}>{errorContent}</p>

			<form className="form" onSubmit={(e) => e.preventDefault()}>
				<div className="form__client-number">
					<h2>Tvorba nového doučování</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Uložit změny"
							onClick={onSaveTutoringClicked}
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
				<label className="form__label" htmlFor="lektors">
					Lektor:
				</label>
				<select
					id="lektors"
					name="lektor_select"
					className={`form__select ${validLektorClass}`}
					multiple={false}
					size={1}
					value={lektor}
					onChange={onLektorsChanged}
					title="Příslušný mentor">
					{optionsLektor}
				</select>
				<br />
				<label className="form__label" htmlFor="clients">
					Klient:
				</label>
				<select
					id="clients"
					name="client_select"
					className={`form__select ${validClientClass}`}
					multiple={false}
					size={1}
					value={client}
					onChange={onClientsChanged}
					title="Příslušný klient">
					{optionsClient}
				</select>
				<br />
				<label className="form__label" htmlFor="subject">
					Předmět:
				</label>
				<input
					className={`form__input ${validSubjectClass}`}
					id="subject"
					name="subject"
					type="text"
					maxLength={3}
					autoComplete="off"
					value={subject}
					onChange={onSubjectsChanged}
				/>
				<br />
			</form>
		</div>
	);

	return content;
};

export default NewTutoringForm;
