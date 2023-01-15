import { useAddNewTutoringMutation } from "./tutoringsApiSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const SUBJECT_REGEX = /^[A-z]{1,3}$/;

const NewTutoringForm = ({ mentorId, lektors, clients }: any) => {
	const [addNewTutoring, { isLoading, isSuccess, isError, error }] =
		useAddNewTutoringMutation();

	const navigate = useNavigate();

	const [lektor, setLektor] = useState("");
	const [client, setClient] = useState("");
	const [subject, setSubject] = useState("");
	const [validSubject, setValidSubject] = useState(false);

	useEffect(() => {
		if (isSuccess) {
			setLektor("");
			setClient("");
			setSubject("");
			navigate(`/sec/tutorings`);
			/* Možná bude třeba změnit ^ TODO */
		}
	}, [isSuccess, navigate]);

	useEffect(() => {
		setValidSubject(SUBJECT_REGEX.test(subject));
	}, [subject]);

	let canSave: boolean =
		[lektor, client, validSubject].every(Boolean) && !isLoading;

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
		navigate(`/sec/tutorings`);
		/* Možná bude třeba změnit ^ TODO */
	};

	let optionsLektor: Array<JSX.Element> = [];
	for (let i = 0; i < lektors.length; i++) {
		optionsLektor.push(
			<option
				key={lektors[i].id}
				value={lektors[i].id}
			>{`${lektors[i].name} ${lektors[i].surname}`}</option>
		);
	}

	let optionsClient: Array<JSX.Element> = [];
	for (let i = 0; i < clients.length; i++) {
		optionsClient.push(
			<option
				key={clients[i].id}
				value={clients[i].id}
			>{`${clients[i].name_child} ${clients[i].surname_child}`}</option>
		);
	}

	const onLektorsChanged = (e: any) => setLektor(e.target.value);
	const onClientsChanged = (e: any) => setClient(e.target.value);
	const onSubjectsChanged = (e: any) => setSubject(e.target.value);

	const errorClass = isError ? "errorMessage" : "hide";
	const validLektorClass = !lektor ? "form__input--incomplete" : "";
	const validClientClass = !client ? "form__input--incomplete" : "";
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
		<>
			<p className={errorClass}>{errorContent}</p>

			<form className="form" onSubmit={(e) => e.preventDefault()}>
				<div className="form__client-number">
					<h2>Tvorba nového doučování</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Uložit změny"
							onClick={onSaveTutoringClicked}
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
					title="Příslušný mentor"
				>
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
					title="Příslušný klient"
				>
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
				/>{" "}
				<br />
			</form>
		</>
	);

	return content;
};

export default NewTutoringForm;
