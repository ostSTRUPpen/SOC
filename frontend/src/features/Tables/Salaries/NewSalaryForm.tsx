import { useAddNewSalaryMutation } from "./salariesApiSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { readFromLocalStorage } from "../../../hooks/useLocalStorage";
import useAuth from "../../../hooks/useAuth";
import { ROLES } from "../../../config/roles";

const VALUE_REGEX = /^[0-9]{2,5}$/;

const NewSalaryForm = ({ mentorId, mentors, lektors, tutorings }: any) => {
	const day = new Date();
	let today: string = `${day.getFullYear()}-${String(
		day.getMonth() + 1
	).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;

	let defaultValue: string = String(
		readFromLocalStorage("standartSalaryValue")
	);
	if (defaultValue === "Not found") {
		defaultValue = "0";
	}

	const prefilLessonDate = readFromLocalStorage("prefillSalaryDate");

	if (prefilLessonDate === "Not found" || prefilLessonDate === false) {
		today = "";
	}

	const [addNewSalary, { isLoading, isSuccess, isError, error }] =
		useAddNewSalaryMutation();

	const navigate = useNavigate();

	const [mentor, setMentor] = useState("");
	const [lektor, setLektor] = useState("");
	const [tutoring, setTutoring] = useState("");
	const [value, setValue] = useState(defaultValue);
	const [validValue, setValidValue] = useState(false);
	const [date, setDate] = useState(today);

	const { id, role } = useAuth();

	useEffect(() => {
		if (isSuccess) {
			setMentor("");
			setLektor("");
			setTutoring("");
			setValue("");
			setDate("");
			if (role === ROLES.Mentor) {
				navigate(`/sec/salaries/show1/${id}`);
			} else {
				navigate(`/sec/salaries`);
			}
		}
	}, [isSuccess, navigate, id, role]);

	useEffect(() => {
		setValidValue(VALUE_REGEX.test(value));
	}, [value]);

	let canSave: boolean =
		[
			mentor,
			lektor,
			tutoring,
			validValue,
			date,
			mentor !== "0",
			lektor !== "0",
			tutoring !== "0",
		].every(Boolean) && !isLoading;

	const onSaveSalaryClicked = async (e: any) => {
		await addNewSalary({
			mentor,
			lektor,
			tutoring,
			value,
			date,
		});
	};

	const onStopEditingClicked = (e: any) => {
		e.preventDefault();
		setMentor("");
		setLektor("");
		setTutoring("");
		setValue("");
		if (role === ROLES.Mentor) {
			navigate(`/sec/salaries/show1/${id}`);
		} else {
			navigate(`/sec/salaries`);
		}
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

	let optionsLektor: Array<JSX.Element> = [
		<option key={0} value={0}>
			Vybrat lektora
		</option>,
	];
	lektors.forEach((lektor: any) =>
		lektor.mentor === id || role === ROLES.Admin
			? optionsLektor.push(
					<option
						key={lektor.id}
						value={
							lektor.id
						}>{`${lektor.name} ${lektor.surname}`}</option>
			  )
			: ""
	);

	let optionsTutoring: Array<JSX.Element> = [
		<option key={0} value={0}>
			Vybrat doučování
		</option>,
	];
	tutorings.forEach((tutoring: any) =>
		tutoring.lektor === lektor
			? optionsTutoring.push(
					<option key={tutoring.id} value={tutoring.id}>
						{tutoring.name}
					</option>
			  )
			: ""
	);

	const onMentorsChanged = (e: any) => setMentor(e.target.value);
	const onLektorsChanged = (e: any) => setLektor(e.target.value);
	const onTutoringsChanged = (e: any) => setTutoring(e.target.value);
	const onValuesChanged = (e: any) => setValue(e.target.value);
	const onDateChanged = (e: any) => setDate(e.target.value);

	const errorClass = isError ? "errorMessage" : "hide";
	const validMentorClass =
		!mentor || mentor === "0" ? "form__input--incomplete" : "";
	const validLektorClass =
		!lektor || lektor === "0" ? "form__input--incomplete" : "";
	const validTutoringClass =
		!tutoring || tutoring === "0" ? "form__input--incomplete" : "";
	const validValueClass = !validValue ? "form__input--incomplete" : "";
	const validDateClass = !date ? "form__input--incomplete" : "";

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

	const content = (
		<div>
			<p className={errorClass}>{errorContent}</p>

			<form className="form" onSubmit={(e) => e.preventDefault()}>
				<div className="form__salary-number">
					<h2>Tvorba nové výplaty</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Uložit změny"
							onClick={onSaveSalaryClicked}
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
					title="Příslušný klient">
					{optionsLektor}
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
		</div>
	);

	return content;
};

export default NewSalaryForm;
