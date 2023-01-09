import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectLektorById } from "./lektorsApiSlice";

const Lektor: any = ({ lektorId }: any) => {
	const lektor = useSelector((state) => selectLektorById(state, lektorId));

	const navigate = useNavigate();
	//console.log(tutoringId);
	if (lektor) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const handleEdit = () => navigate(`/sec/lektors/${lektorId}`);
		const canEdit = 1;

		let editing;
		if (canEdit) {
			editing = (
				<td className="table__cell">
					<button
						title="edit button"
						className="icon-button table__button--edit"
						onClick={handleEdit}
					>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			);
		} else {
			editing = <td className="table__cell" hidden></td>;
		}

		return (
			<tr className="table__row lektor">
				<td className="table__cell">{lektor.lektor_number}</td>
				<td className="table__cell">{lektor.date}</td>
				<td className="table__cell">{lektor.theme}</td>
				<td className="table__cell">{lektor.length}</td>
				<td className="table__cell">{lektor.info}</td>
				{editing}
			</tr>
		);
	} else return null;
};

export default Lektor;
