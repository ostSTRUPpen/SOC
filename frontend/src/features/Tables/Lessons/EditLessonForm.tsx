import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useUpdateLessonMutation,
	useDeleteLessonMutation,
} from "./lessonsApiSlice";
import {
	faSave,
	faTrashCan,
	faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const LENGTH_REGEX = /^[0-9]{1,3}$/;

const EditLessonForm = ({ lesson }: any) => {
	const [updateLesson, { isLoading, isSuccess, isError, error }] =
		useUpdateLessonMutation();

	const [
		deleteLesson,
		{ isSuccess: isDelSuccess, isError: isDelError, error: delerror },
	] = useDeleteLessonMutation();

	const navigate = useNavigate();

	const [number, setNumber] = useState(lesson.lesson_number);
	const [date, setDate] = useState(lesson.date);
	const [theme, setTheme] = useState(lesson.theme);
	const [length, setLength] = useState(lesson.length);
	const [validLength, setValidLength] = useState(false);
	const [info, setInfo] = useState(lesson.info);
	const [navTo, setNavTo] = useState(lesson.tutoring);

	useEffect(() => {
		if (isSuccess || isDelSuccess) {
			setNumber("");
			setDate("");
			setTheme("");
			setLength("");
			setInfo("");
			navigate(`/sec/tutorings/${navTo}`);
			setNavTo("");
		}
	}, [isSuccess, isDelSuccess, navigate, navTo]);

	useEffect(() => {
		setValidLength(LENGTH_REGEX.test(length));
	}, [length]);

	const canSave =
		[number, date, theme, validLength, info].every(Boolean) && !isLoading;

	const onSaveLessonClicked = async (e: any) => {
		if (canSave) {
			await updateLesson({
				id: lesson.id,
				tutoring: lesson.tutoring,
				lesson_number: lesson.lesson_number,
				date,
				theme,
				length,
				info,
			});
		}
	};

	const onDeleteLessonClicked = async () => {
		await deleteLesson({ id: lesson.id });
	};

	const onStopEditingClicked = (e: any) => {
		e.preventDefault();
		setNumber("");
		setDate("");
		setTheme("");
		setLength("");
		setInfo("");
		navigate(`/sec/tutorings/${navTo}`);
		setNavTo("");
	};

	const onDateChanged = (e: any) => setDate(e.target.value);
	const onThemeChanged = (e: any) => setTheme(e.target.value);
	const onLengthChanged = (e: any) => setLength(e.target.value);
	const onInfoChanged = (e: any) => setInfo(e.target.value);

	const errorClass = isError || isDelError ? "errorMessage" : "hide";
	const validDateClass = !date ? "form__input--incomplete" : "";
	const validThemeClass = !theme ? "form__input--incomplete" : "";
	const validLengthClass = !validLength ? "form__input--incomplete" : "";
	const validInfoClass = !info ? "form__input--incomplete" : "";

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
				<div className="form__lesson-number">
					<h2>Úprava zápisu lekce číslo {lesson.lesson_number}</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button form--save-button"
							title="Uložit změny"
							onClick={onSaveLessonClicked}
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
							onClick={onDeleteLessonClicked}
						>
							<FontAwesomeIcon icon={faTrashCan} />
						</button>
					</div>
				</div>
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
					onChange={onDateChanged}
				/>
				<br />
				<label className="form__label" htmlFor="lesson-theme">
					Téma lekce:
				</label>
				<input
					className={`form__input ${validThemeClass}`}
					id="lesson-theme"
					name="téma"
					type="text"
					maxLength={100}
					autoComplete="off"
					value={theme}
					onChange={onThemeChanged}
				/>
				<br />
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
					onChange={onLengthChanged}
				/>
				<br />
				<label className="form__label" htmlFor="lesson-info">
					Poznámka k lekci:
				</label>
				<input
					className={`form__input--info ${validInfoClass}`}
					id="lesson-info"
					name="poznámky"
					type="text"
					maxLength={500}
					autoComplete="off"
					value={info}
					onChange={onInfoChanged}
				/>
			</form>
		</>
	);

	return content;
};

export default EditLessonForm;
