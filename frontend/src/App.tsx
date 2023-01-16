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
import InvoiceList from "./features/Tables/Invoices/InvoiceList";
import EditInvoice from "./features/Tables/Invoices/EditInvoice";
import NewInvoice from "./features/Tables/Invoices/NewInvoice";
import SalaryList from "./features/Tables/Salaries/SalaryList";
import EditSalary from "./features/Tables/Salaries/EditSalary";
import NewSalary from "./features/Tables/Salaries/NewSalary";
import MentorsList from "./features/Tables/Mentors/MentorsList";
import NewMentor from "./features/Tables/Mentors/NewMentor";
import EditMentor from "./features/Tables/Mentors/EditMentor";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<PublicPage />} />
				<Route path="login" element={<Login />} />
				<Route element={<Prefetch />}>
					{/* Prefetch >*/}
					<Route path="sec" element={<SecureLayout />}>
						{/* /sec > */}
						<Route index element={<Dashboard />} />
						<Route path="mentors">
							{/* /mentors > */}
							<Route index element={<MentorsList />} />
							<Route path=":id" element={<EditMentor />} />
							<Route path="new" element={<NewMentor />} />
						</Route>
						{/* < /mentors */}
						<Route path="tutorings">
							{/* /tutorings > */}
							<Route index element={<TutoringsList />} />
							<Route path=":id" element={<DisplayLessons />} />
							<Route path="edit">
								{/* /tutorings/edit > */}
								<Route
									path=":tutoringId"
									element={<EditTutoring />}
								/>
							</Route>
							{/* < /tutorings/edit */}
							<Route path="new">
								{/* /tutorings/new > */}
								<Route index element={<NewTutoring />} />
								<Route
									path=":mentorId"
									element={<NewTutoring />}
								/>
							</Route>
							{/* < /tutorings/new */}
							<Route path="show1">
								{/* /tutorings/show1 > */}
								<Route
									path=":lektorId"
									element={<TutoringsList />}
								/>
							</Route>
							{/* < /tutorings/show1 */}
							<Route path="show2">
								{/* /tutorings/show2 > */}
								<Route
									path=":klientId"
									element={<TutoringsList />}
								/>
							</Route>
							{/* < /tutorings/show2 */}
						</Route>
						{/* < /tutorings */}
						<Route path="lessons">
							{/* /lessons > */}
							<Route index element={<LessonsList />} />
							<Route path=":id" element={<EditLesson />} />
							<Route path="new">
								{/* /lessons/new > */}
								<Route
									path=":tutoringId"
									element={<NewLesson />}
								/>
							</Route>
							{/* < /lessons/new */}
						</Route>
						{/* < /lessons */}
						<Route path="lektors">
							{/* /lektors > */}
							<Route index element={<LektorsList />} />
							<Route path=":id" element={<EditLektor />} />
							<Route path="new" element={<NewLektor />} />
							<Route path="show">
								{/* /lektors/show > */}
								<Route
									path="mentorId"
									element={<LektorsList />}
								/>
							</Route>
							{/* < /lektors/show */}
						</Route>
						{/* < /lektors */}
						<Route path="clients">
							{/* /clients > */}
							<Route index element={<ClientsList />} />
							<Route path=":id" element={<EditClient />} />
							<Route path="new" element={<NewClient />} />
							<Route path="show">
								{/* /clients/show > */}
								<Route
									path=":mentorId"
									element={<ClientsList />}
								/>
							</Route>
							{/* < /clients/show */}
						</Route>
						{/* < /clients */}
						<Route path="invoices">
							{/* /invoices > */}
							<Route index element={<InvoiceList />} />
							<Route path="edit">
								{/* /invoices/edit > */}
								<Route
									path=":invoiceId"
									element={<EditInvoice />}
								/>
							</Route>
							{/* < /invoices/edit */}
							<Route path="new">
								{/* /invoices/new > */}
								<Route index element={<NewInvoice />} />
							</Route>
							{/* < /invoices/new */}
							<Route path="show1">
								{/* /invoices/show1 > */}
								<Route
									path=":mentorId"
									element={<InvoiceList />}
								/>
							</Route>
							{/* < /invoices/show1 */}
							<Route path="show2">
								{/* /invoices/show2 > */}
								<Route
									path=":klientId"
									element={<InvoiceList />}
								/>
							</Route>
							{/* < /invoices/show2 */}
						</Route>
						{/* < /invoices */}
						<Route path="salaries">
							{/* /salaries > */}
							<Route index element={<SalaryList />} />
							<Route path="edit">
								{/* /salaries/edit > */}
								<Route
									path=":salaryId"
									element={<EditSalary />}
								/>
							</Route>
							{/* < /salaries/edit */}
							<Route path="new">
								{/* /salaries/new > */}
								<Route index element={<NewSalary />} />
							</Route>
							{/* < /salaries/new */}
							<Route path="show1">
								{/* /salaries/show1 > */}
								<Route
									path=":mentorId"
									element={<SalaryList />}
								/>
							</Route>
							{/* < /salaries/show1 */}
							<Route path="show2">
								{/* /salaries/show2 > */}
								<Route
									path=":lektorId"
									element={<SalaryList />}
								/>
							</Route>
							{/* < /salaries/show2 */}
						</Route>
						{/* < /salaries */}
					</Route>
					{/* < /sec */}
				</Route>
				{/* < Prefetch */}
			</Route>
		</Routes>
	);
}

export default App;
