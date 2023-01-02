import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PublicPage from "./components/PublicPage";
import Login from "./features/auth/Login";
import SecureLayout from "./components/SecureLayout";
import Dashboard from "./features/auth/Dashboard";
import TutoringsList from "./features/Tables/Tutorings/TutoringsList";
import DisplayLessons from "./features/Tables/Tutorings/DisplayLessons";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<PublicPage />} />
				<Route path="login" element={<Login />} />

				<Route path="sec" element={<SecureLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="tutorings">
						<Route index element={<TutoringsList />} />
						<Route path=":id" element={<DisplayLessons />} />
					</Route>
				</Route>
				{/* End Secure */}
			</Route>
		</Routes>
	);
}

export default App;
