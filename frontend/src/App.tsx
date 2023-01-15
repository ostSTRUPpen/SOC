import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PublicPage from "./components/PublicPage";
import Login from "./features/auth/Login";
import SecureLayout from "./components/SecureLayout";
import Dashboard from "./features/auth/Dashboard";
import TutoringsList from "./features/Tables/Tutorings/TutoringsList";
import DisplayLessons from "./features/Tables/Tutorings/DisplayLessons";
import LessonsList from "./features/Tables/Lessons/LessonsList";
import EditLesson from "./features/Tables/Lessons/EditLesson";
import NewLesson from "./features/Tables/Lessons/NewLesson";
import Prefetch from "./features/auth/Prefetch";
import LektorsList from "./features/Tables/Lektors/LektorsList";
import EditLektor from "./features/Tables/Lektors/EditLektor";
import NewLektor from "./features/Tables/Lektors/NewLektor";
import ClientsList from "./features/Tables/Klients/ClientList";
import EditClient from "./features/Tables/Klients/EditClient";
import NewClient from "./features/Tables/Klients/NewClient";
import NewTutoring from "./features/Tables/Tutorings/NewTutoring";
import EditTutoring from "./features/Tables/Tutorings/EditTutoring";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<PublicPage />} />
				<Route path="login" element={<Login />} />
				<Route element={<Prefetch />}>
					{" "}
					{/* Prefetch >*/}
					<Route path="sec" element={<SecureLayout />}>
						{" "}
						{/* /sec > */}
						<Route index element={<Dashboard />} />
						<Route path="tutorings">
							{" "}
							{/* /tutorings > */}
							<Route index element={<TutoringsList />} />
							<Route path=":id" element={<DisplayLessons />} />
							<Route path="edit">
								{/* /tutorings/edit > */}
								<Route
									path=":tutoringId"
									element={<EditTutoring />}
								/>
							</Route>{" "}
							{/* < /tutorings/edit */}
							<Route path="new">
								{" "}
								{/* /tutorings/new > */}
								<Route index element={<NewTutoring />} />
								<Route
									path=":mentorId"
									element={<NewTutoring />}
								/>
							</Route>{" "}
							{/* < /tutorings/new */}
							<Route path="show1">
								{" "}
								{/* /tutorings/show1 > */}
								<Route
									path=":lektorId"
									element={<TutoringsList />}
								/>
							</Route>{" "}
							{/* < /tutorings/show1 */}
							<Route path="show2">
								{" "}
								{/* /tutorings/show2 > */}
								<Route
									path=":klientId"
									element={<TutoringsList />}
								/>
							</Route>{" "}
							{/* < /tutorings/show2 */}
						</Route>{" "}
						{/* < /tutorings */}
						<Route path="lessons">
							{" "}
							{/* /lessons > */}
							<Route index element={<LessonsList />} />
							<Route path=":id" element={<EditLesson />} />
							<Route path="new">
								{" "}
								{/* /lessons/new > */}
								<Route
									path=":tutoringId"
									element={<NewLesson />}
								/>
							</Route>{" "}
							{/* < /lessons/new */}
						</Route>{" "}
						{/* < /lessons */}
						<Route path="lektors">
							{" "}
							{/* /lektors > */}
							<Route index element={<LektorsList />} />
							<Route path=":id" element={<EditLektor />} />
							<Route path="new" element={<NewLektor />} />
							<Route path="show">
								{" "}
								{/* /lektors/show > */}
								<Route
									path="mentorId"
									element={<LektorsList />}
								/>
							</Route>{" "}
							{/* < /lektors/show */}
						</Route>{" "}
						{/* < /lektors */}
						<Route path="clients">
							{" "}
							{/* /clients > */}
							<Route index element={<ClientsList />} />
							<Route path=":id" element={<EditClient />} />
							<Route path="new" element={<NewClient />} />
							<Route path="show">
								{" "}
								{/* /clients/show > */}
								<Route
									path=":mentorId"
									element={<ClientsList />}
								/>
							</Route>{" "}
							{/* < /clients/show */}
						</Route>{" "}
						{/* < /clients */}
					</Route>
					{/* < /sec */}
				</Route>{" "}
				{/* < Prefetch */}
			</Route>
		</Routes>
	);
}

export default App;
