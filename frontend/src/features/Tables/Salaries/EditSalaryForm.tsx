import {
	useUpdateSalaryMutation,
	useDeleteSalaryMutation,
} from "./salariesApiSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSave,
	faTimesCircle,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const VALUE_REGEX = /^[0-9]{2,5}$/;

const EditSalaryForm = ({ salary, mentors, lektors }: any) => {
	const [updateSalary, { isLoading, isSuccess, isError, error }] =
		useUpdateSalaryMutation();

	const [
		deleteSalary,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delerror },
	] = useDeleteSalaryMutation();

	const navigate = useNavigate();

	const [mentor, setMentor] = useState(salary.mentor);
	const [lektor, setLektor] = useState(salary.lektor);
	const [value, setValue] = useState(salary.value);
	const [validValue, setValidValue] = useState(false);
	const [date, setDate] = useState(salary.date);

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setMentor("");
			setLektor("");
			setValue("");
			setDate("");
			navigate(`/sec/salaries`);
			/* Možná bude třeba změnit ^ TODO */
		}
	}, [isSuccess, isDelSuccess, navigate]);

	useEffect(() => {
		setValidValue(VALUE_REGEX.test(value));
	}, [value]);

	let canSave: boolean =
		[mentor, lektor, validValue, date].every(Boolean) && !isLoading;

	const onSaveSalaryClicked = async (e: any) => {
		await updateSalary({
			id: salary.id,
			mentor,
			lektor,
			value,
			date,
		});
	};

	const onStopEditingClicked = (e: any) => {
		e.preventDefault();
		setMentor("");
		setLektor("");
		setValue("");
		navigate(`/sec/salaries`);
		/* Možná bude třeba změnit ^ TODO */
	};

	const onDeleteSalaryClicked = async (e: any) => {
		await deleteSalary({ id: salary.id });
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

	let optionsLektor: Array<JSX.Element> = [];
	for (let i = 0; i < lektors.length; i++) {
		optionsLektor.push(
			<option
				key={lektors[i].id}
				value={lektors[i].id}
			>{`${lektors[i].name_parent} ${lektors[i].surname_parent}`}</option>
		);
	}

	const onMentorsChanged = (e: any) => setMentor(e.target.value);
	const onLektorsChanged = (e: any) => setLektor(e.target.value);
	const onValuesChanged = (e: any) => setValue(e.target.value);
	const onDateChanged = (e: any) => setDate(e.target.value);

	const errorClass = isError || isDelError ? "errorMessage" : "hide";
	const validMentorClass = !mentor ? "form__input--incomplete" : "";
	const validLektorClass = !lektor ? "form__input--incomplete" : "";
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
				<div className="form__salary-number">
					<h2>Úprava výplaty</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Uložit změny"
							onClick={onSaveSalaryClicked}
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
							onClick={onDeleteSalaryClicked}
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
				<label className="form__label" htmlFor="lektors">
					Klient:
				</label>
				<select
					id="lektors"
					name="lektor_select"
					className={`form__select ${validLektorClass}`}
					multiple={false}
					size={1}
					value={lektor}
					onChange={onLektorsChanged}
					title="Příslušný klient"
				>
					{optionsLektor}
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

export default EditSalaryForm;
