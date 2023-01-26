import {
	useUpdateInvoiceMutation,
	useDeleteInvoiceMutation,
} from "./invoicesApiSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSave,
	faTimesCircle,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import { ROLES } from "../../../config/roles";

const VALUE_REGEX = /^[0-9]{2,5}$/;
const INVOICE_NUMBER_REGEX = /^[0-9]{8,10}$/;

const EditInvoiceForm = ({ invoice, mentors, clients, tutorings }: any) => {
	const [updateInvoice, { isLoading, isSuccess, isError, error }] =
		useUpdateInvoiceMutation();

	const [
		deleteInvoice,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delerror },
	] = useDeleteInvoiceMutation();

	const navigate = useNavigate();

	const [mentor, setMentor] = useState(invoice.mentor);
	const [client, setClient] = useState(invoice.client);
	const [tutoring, setTutoring] = useState(invoice.tutoring);
	const [value, setValue] = useState(invoice.value);
	const [validValue, setValidValue] = useState(false);
	const [date, setDate] = useState(invoice.date);
	const [invoiceNumber, setInvoiceNumber] = useState(invoice.invoice_number);
	const [validInvoiceNumber, setValidInvoiceNumber] = useState(false);

	const { id, role } = useAuth();

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setMentor("");
			setClient("");
			setTutoring("");
			setValue("");
			setDate("");
			setInvoiceNumber(0);
			if (role === ROLES.Mentor) {
				navigate(`/sec/invoices/show1/${id}`);
			} else {
				navigate(`/sec/invoices`);
			}
		}
	}, [isSuccess, isDelSuccess, navigate, id, role]);

	useEffect(() => {
		setValidValue(VALUE_REGEX.test(value));
	}, [value]);

	useEffect(() => {
		setValidInvoiceNumber(
			INVOICE_NUMBER_REGEX.test(invoiceNumber.toString())
		);
	}, [invoiceNumber]);

	let canSave: boolean =
		[
			mentor,
			client,
			tutoring,
			validValue,
			date,
			validInvoiceNumber,
			mentor !== "0",
			client !== "0",
			tutoring !== "0",
		].every(Boolean) && !isLoading;

	const onSaveInvoiceClicked = async (e: any) => {
		await updateInvoice({
			id: invoice.id,
			mentor,
			client,
			tutoring,
			value,
			date,
			invoice_number: invoiceNumber,
		});
	};

	const onStopEditingClicked = (e: any) => {
		e.preventDefault();
		setMentor("");
		setClient("");
		setTutoring("");
		setValue("");
		setInvoiceNumber(0);
		if (role === ROLES.Mentor) {
			navigate(`/sec/invoices/show1/${id}`);
		} else {
			navigate(`/sec/invoices`);
		}
	};

	const onDeleteInvoiceClicked = async (e: any) => {
		await deleteInvoice({ id: invoice.id });
	};

	let optionsMentor: Array<JSX.Element> = [
		<option key={0} value={0}>
			Vybrat mentora
		</option>,
	];
	mentors.forEach((mentor: any) =>
		mentor.id === id || role === ROLES.Admin
			? optionsMentor.push(
					<option
						key={mentor.id}
						value={
							mentor.id
						}>{`${mentor.name} ${mentor.surname}`}</option>
			  )
			: ""
	);

	let optionsClient: Array<JSX.Element> = [
		<option key={0} value={0}>
			Vybrat klienta
		</option>,
	];
	clients.forEach((client: any) =>
		client.mentor === id || role === ROLES.Admin
			? optionsClient.push(
					<option
						key={client.id}
						value={
							client.id
						}>{`${client.name_parent} ${client.surname_parent}`}</option>
			  )
			: ""
	);

	let optionsTutoring: Array<JSX.Element> = [
		<option key={0} value={0}>
			Vybrat doučování
		</option>,
	];
	tutorings.forEach((tutoring: any) =>
		tutoring.client === client
			? optionsTutoring.push(
					<option key={tutoring.id} value={tutoring.id}>
						{tutoring.name}
					</option>
			  )
			: ""
	);

	const onMentorsChanged = (e: any) => setMentor(e.target.value);
	const onClientsChanged = (e: any) => setClient(e.target.value);
	const onTutoringsChanged = (e: any) => setTutoring(e.target.value);
	const onValuesChanged = (e: any) => setValue(e.target.value);
	const onDateChanged = (e: any) => setDate(e.target.value);
	const onInvoiceNumberChanged = (e: any) => setInvoiceNumber(e.target.value);

	const errorClass = isError || isDelError ? "errorMessage" : "hide";
	const validMentorClass =
		!mentor || mentor === "0" ? "form__input--incomplete" : "";
	const validClientClass =
		!client || client === "0" ? "form__input--incomplete" : "";
	const validTutoringClass =
		!tutoring || tutoring === "0" ? "form__input--incomplete" : "";
	const validValueClass = !validValue ? "form__input--incomplete" : "";
	const validDateClass = !date ? "form__input--incomplete" : "";
	const validInvoiceNumberClass = !validInvoiceNumber
		? "form__input--incomplete"
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
				<div className="form__invoice-number">
					<h2>Úprava faktury</h2>
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
						<button
							className="icon-button form--delete-button"
							title="Smazat fakturu"
							onClick={onDeleteInvoiceClicked}>
							<FontAwesomeIcon icon={faTrashCan} />
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
					title="Příslušný klient">
					{optionsClient}
				</select>
				<br />
				<label className="form__label" htmlFor="tutorings">
					Doučování:
				</label>
				<select
					id="tutorings"
					name="tutoring_select"
					className={`form__select ${validTutoringClass}`}
					multiple={false}
					size={1}
					value={tutoring}
					onChange={onTutoringsChanged}
					title="Příslušné doučování">
					{optionsTutoring}
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
					className={`form__input form__input--value ${validValueClass}`}
					id="value"
					name="value"
					type="number"
					max={99999}
					autoComplete="off"
					value={value}
					onChange={onValuesChanged}
				/>
				<br />
				<label className="form__label" htmlFor="invoice_number">
					Číslo faktury:
				</label>
				<input
					className={`form__input form__input--invoice_number ${validInvoiceNumberClass}`}
					id="invoice_number"
					name="invoice_number"
					type="number"
					autoComplete="off"
					value={invoiceNumber}
					onChange={onInvoiceNumberChanged}
				/>
			</form>
		</div>
	);

	return content;
};

export default EditInvoiceForm;
