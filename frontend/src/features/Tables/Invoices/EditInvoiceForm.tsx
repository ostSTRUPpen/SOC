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

const VALUE_REGEX = /^[0-9]{2,5}$/;

const EditInvoiceForm = ({ invoice, mentors, clients }: any) => {
	const [updateInvoice, { isLoading, isSuccess, isError, error }] =
		useUpdateInvoiceMutation();

	const [
		deleteInvoice,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delerror },
	] = useDeleteInvoiceMutation();

	const navigate = useNavigate();

	const [mentor, setMentor] = useState(invoice.mentor);
	const [client, setClient] = useState(invoice.client);
	const [value, setValue] = useState(invoice.value);
	const [validValue, setValidValue] = useState(false);
	const [date, setDate] = useState(invoice.date);

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setMentor("");
			setClient("");
			setValue("");
			setDate("");
			navigate(`/sec/invoices`);
			/* Možná bude třeba změnit ^ TODO */
		}
	}, [isSuccess, isDelSuccess, navigate]);

	useEffect(() => {
		setValidValue(VALUE_REGEX.test(value));
	}, [value]);

	let canSave: boolean =
		[mentor, client, validValue, date].every(Boolean) && !isLoading;

	const onSaveInvoiceClicked = async (e: any) => {
		await updateInvoice({
			id: invoice.id,
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
		navigate(`/sec/invoices`);
		/* Možná bude třeba změnit ^ TODO */
	};

	const onDeleteInvoiceClicked = async (e: any) => {
		await deleteInvoice({ id: invoice.id });
	};

	let optionsMentor: Array<JSX.Element> = [];
	for (let i = 0; i < mentors.length; i++) {
		optionsMentor.push(
			<option
				key={mentors[i].id}
				value={mentors[i].id}
			>{`${mentors[i].name} ${mentors[i].surname}`}</option>
		);
	}

	let optionsClient: Array<JSX.Element> = [];
	for (let i = 0; i < clients.length; i++) {
		optionsClient.push(
			<option
				key={clients[i].id}
				value={clients[i].id}
			>{`${clients[i].name_parent} ${clients[i].surname_parent}`}</option>
		);
	}

	const onMentorsChanged = (e: any) => setMentor(e.target.value);
	const onClientsChanged = (e: any) => setClient(e.target.value);
	const onValuesChanged = (e: any) => setValue(e.target.value);
	const onDateChanged = (e: any) => setDate(e.target.value);

	const errorClass = isError || isDelError ? "errorMessage" : "hide";
	const validMentorClass = !mentor ? "form__input--incomplete" : "";
	const validClientClass = !client ? "form__input--incomplete" : "";
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
				<div className="form__invoice-number">
					<h2>Úprava faktury</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Uložit změny"
							onClick={onSaveInvoiceClicked}
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
							title="Smazat fakturu"
							onClick={onDeleteInvoiceClicked}
						>
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
					title="Příslušný mentor"
				>
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
					title="Příslušný klient"
				>
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
					className={`form__input ${validValueClass}`}
					id="value"
					name="value"
					type="number"
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

export default EditInvoiceForm;
