import { useAddNewLessonMutation } from "./lessonsApiSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const NewLessonForm = ({ tutoring }: any) => {
	const day = new Date();
	const today: string = `${day.getFullYear()}-${String(
		day.getMonth() + 1
	).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;

	const defaultLength: string = "60";

	const [addNewLesson, { isLoading, isSuccess, isError, error }] =
		useAddNewLessonMutation();
	// console.log(tutoring);
	const navigate = useNavigate();

	const [number, setNumber] = useState("");
	const [date, setDate] = useState(today);
	const [theme, setTheme] = useState("");
	const [length, setLength] = useState(defaultLength);
	const [info, setInfo] = useState("");

	useEffect(() => {
		if (isSuccess) {
			setNumber("");
			setDate("");
			setTheme("");
			setLength("");
			setInfo("");
			navigate(`/sec/tutorings/${tutoring}`);
		}
	}, [isSuccess, navigate, tutoring]);

	const canSave =
		[number, date, theme, length, info].every(Boolean) && !isLoading;

	const onSaveLessonClicked = async (e: any) => {
		e.preventDefault();
		if (canSave) {
			const lesson_number = number;
			/*console.log(
				`${tutoring}| ${lesson_number}, ${date}, ${theme}, ${length} ${info}`
			);*/
			await addNewLesson({
				tutoring: tutoring,
				lesson_number,
				date,
				theme,
				length,
				info,
			});
		}
	};

	const onStopEditingClicked = async (e: any) => {
		e.preventDefault();
		setNumber("");
		setDate("");
		setTheme("");
		setLength("");
		setInfo("");
		navigate(`/sec/tutorings/${tutoring}`);
	};

	const onNumberChanged = (e: any) => setNumber(e.target.value);
	const onDateChanged = (e: any) => setDate(e.target.value);
	const onThemeChanged = (e: any) => setTheme(e.target.value);
	const onLengthChanged = (e: any) => setLength(e.target.value);
	const onInfoChanged = (e: any) => setInfo(e.target.value);

	const errorClass = isError ? "errorMessage" : "hide";
	const validNumberClass = !number ? "from__input--incomplete" : "";
	const validDateClass = !date ? "from__input--incomplete" : "";
	const validThemeClass = !theme ? "from__input--incomplete" : "";
	const validLengthClass = !length ? "from__input--incomplete" : "";
	const validInfoClass = !info ? "from__input--incomplete" : "";

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
				<div className="form__lesson-number">
					<h2>Nový zápis lekce</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Vytvořit nový zápis"
							onClick={onSaveLessonClicked}
						>
							<FontAwesomeIcon icon={faSave} />
						</button>
						<button
							className="icon-button form--cancel-button"
							title="Zahodit zápis"
							onClick={onStopEditingClicked}
						>
							<FontAwesomeIcon icon={faTimesCircle} />
						</button>
					</div>
				</div>
				<label className="form__label" htmlFor="lesson-number">
					Číslo lekce:
				</label>
				<input
					className={`form__input ${validNumberClass}`}
					id="lesson-number"
					name="číslo"
					type="number"
					autoComplete="off"
					value={number}
					onChange={onNumberChanged}
				/>
				<label className="form__label" htmlFor="lesson-date">
					Datum lekce:
				</label>
				<input
					className={`form__input ${validDateClass}`}
					id="lesson-date"
					name="datum"
					type="date"
					autoComplete="off"
					value={date}
					defaultValue={today}
					onChange={onDateChanged}
				/>
				<label className="form__label" htmlFor="lesson-theme">
					Téma lekce:
				</label>
				<input
					className={`form__input ${validThemeClass}`}
					id="lesson-theme"
					name="téma"
					type="text"
					autoComplete="off"
					value={theme}
					onChange={onThemeChanged}
				/>
				<label className="form__label" htmlFor="lesson-length">
					Délka lekce:
				</label>
				<input
					className={`form__input ${validLengthClass}`}
					id="lesson-length"
					name="trvání"
					type="number"
					autoComplete="off"
					value={length}
					defaultValue="60"
					onChange={onLengthChanged}
				/>
				<label className="form__label" htmlFor="lesson-info">
					Poznámka k lekci:
				</label>
				<input
					className={`form__input ${validInfoClass}`}
					id="lesson-info"
					name="poznámky"
					type="text"
					autoComplete="off"
					value={info}
					onChange={onInfoChanged}
				/>
			</form>
		</>
	);

	return content;
};

export default NewLessonForm;
