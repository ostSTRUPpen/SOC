import { useAddNewInvoiceMutation } from "./invoicesApiSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { readFromLocalStorage } from "../../../hooks/localStorage";
import { ROLES } from "../../../config/roles";
import useAuth from "../../../hooks/useAuth";

const VALUE_REGEX = /^[0-9]{2,5}$/;

const NewInvoiceForm = ({ mentorId, mentors, clients }: any) => {
	const day = new Date();
	let today: string = `${day.getFullYear()}-${String(
		day.getMonth() + 1
	).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;

	let defaultValue: string = String(
		readFromLocalStorage("standartInvoiceValue")
	);
	if (defaultValue === "Not found") {
		defaultValue = "0";
	}

	const prefilLessonDate = readFromLocalStorage("prefillInvoiceDate");

	if (prefilLessonDate === "Not found" || prefilLessonDate === false) {
		today = "";
	}

	const [addNewInvoice, { isLoading, isSuccess, isError, error }] =
		useAddNewInvoiceMutation();

	const navigate = useNavigate();

	const { id, role } = useAuth();

	const [mentor, setMentor] = useState("");
	const [client, setClient] = useState("");
	const [value, setValue] = useState(defaultValue);
	const [validValue, setValidValue] = useState(false);
	const [date, setDate] = useState(today);

	useEffect(() => {
		if (isSuccess) {
			setMentor("");
			setClient("");
			setValue("");
			setDate("");
			navigate(`/sec/invoices/show1/${id}`);
			/* Možná bude třeba změnit ^ TODO */
		}
	}, [isSuccess, navigate, id]);

	useEffect(() => {
		setValidValue(VALUE_REGEX.test(value));
	}, [value]);

	let canSave: boolean =
		[
			mentor,
			client,
			validValue,
			date,
			mentor !== "0",
			client !== "0",
		].every(Boolean) && !isLoading;

	const onSaveInvoiceClicked = async (e: any) => {
		await addNewInvoice({
			mentor,
			client,
			value,
			date,
		});
	};

	const onStopEditingClicked = (e: any) => {
		e.preventDefault();
		setMentor("");
		setClient("");
		setValue("");
		navigate(`/sec/invoices/show1/${id}`);
		/* Možná bude třeba změnit ^ TODO */
	};

	let optionsMentor: Array<JSX.Element> = [
		<option key={0} value={0}>
			Vybrat mentora
		</option>,
	];
	for (let i = 0; i < mentors.length; i++) {
		if (mentors[i].id === id || role === ROLES.Admin) {
			optionsMentor.push(
				<option
					key={mentors[i].id}
					value={
						mentors[i].id
					}>{`${mentors[i].name} ${mentors[i].surname}`}</option>
			);
		}
	}

	let optionsClient: Array<JSX.Element> = [
		<option key={0} value={0}>
			Vybrat klient
		</option>,
	];
	for (let i = 0; i < clients.length; i++) {
		if (clients[i].mentor === id || role === ROLES.Admin) {
			optionsClient.push(
				<option
					key={clients[i].id}
					value={
						clients[i].id
					}>{`${clients[i].name_parent} ${clients[i].surname_parent}`}</option>
			);
		}
	}

	const onMentorsChanged = (e: any) => setMentor(e.target.value);
	const onClientsChanged = (e: any) => setClient(e.target.value);
	const onValuesChanged = (e: any) => setValue(e.target.value);
	const onDateChanged = (e: any) => setDate(e.target.value);

	const errorClass = isError ? "errorMessage" : "hide";
	const validMentorClass =
		!mentor || mentor === "0" ? "form__input--incomplete" : "";
	const validClientClass =
		!client || client === "0" ? "form__input--incomplete" : "";
	const validValueClass = !validValue ? "form__input--incomplete" : "";
	const validDateClass = !date ? "form__input--incomplete" : "";

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
				<div className="form__invoice-number">
					<h2>Tvorba nové faktury</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Uložit změny"
							onClick={onSaveInvoiceClicked}
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
				<label className="form__label" htmlFor="mentors">
					Mentor:
				</label>
				<select
					id="mentors"
					name="mentor_select"
					className={`form__select ${validMentorClass}`}
					multiple={false}
					size={1}
					value={mentor}
					onChange={onMentorsChanged}
					title="Příslušný mentor">
					{optionsMentor}
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
					title="Příslušný client">
					{optionsClient}
				</select>
				<br />
				<label className="form__label" htmlFor="date">
					Datum:
				</label>
				<input
					className={`form__input ${validDateClass}`}
					id="date"
					name="date"
					type="date"
					autoComplete="off"
					value={date}
					onChange={onDateChanged}
				/>
				<br />
				<label className="form__label" htmlFor="value">
					Hodnota:
				</label>
				<input
					className={`form__input--value ${validValueClass}`}
					id="value"
					name="value"
					type="number"
					max={99999}
					autoComplete="off"
					value={value}
					onChange={onValuesChanged}
				/>
				<br />
			</form>
		</>
	);

	return content;
};

export default NewInvoiceForm;
