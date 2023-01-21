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
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* Public routes > */}
				<Route index element={<PublicPage />} />
				<Route path="login" element={<Login />} />
				{/* < Public routes */}

				{/* Protected routes > */}
				<Route element={<PersistLogin />}>
					{/* Persist login > */}
					<Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
						{/* Require auth > */}
						<Route element={<Prefetch />}>
							{/* Prefetch >*/}
							<Route path="sec" element={<SecureLayout />}>
								{/* /sec > */}
								<Route index element={<Dashboard />} />
								<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
									<Route path="mentors">
										{/* /mentors > */}
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin]} /> }>
											<Route index element={<MentorsList />}
											/>
										</Route>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
											<Route path=":id" element={<EditMentor />}
											/>
										</Route>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin]} /> }>
											<Route path="new" element={<NewMentor />}
											/>
										</Route>
									</Route>
									{/* < /mentors */}
								</Route>
								{/* < /mentors */}
								<Route path="tutorings">
									{/* /tutorings > */}
									<Route index element={<TutoringsList />} />
									<Route path=":id" element={<DisplayLessons />}
									/>
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
										<Route path="edit">
											<Route path=":tutoringId" element={<EditTutoring />} 
											/>
										</Route>
										<Route path="new">
											<Route index element={<NewTutoring />} 
											/>
										</Route>
									</Route>
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor,  ROLES.Lektor]} /> }>
										<Route path="show1">
											<Route path=":lektorId" element={<TutoringsList />}
											/>
										</Route>
									</Route>
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Client]} /> }>
										<Route path="show2">
											<Route path=":klientId" element={<TutoringsList />}
											/>
										</Route>
									</Route>
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
										<Route path="show3">
											<Route path=":mentorId" element={<TutoringsList />}
											/>
										</Route>
									</Route>
								</Route>
								{/* < /tutorings */}
								<Route path="lessons">
									<Route index element={<LessonsList />} />
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Lektor]} /> }> 
										<Route path=":id" element={<EditLesson />}
										/>
										<Route path="new">
											<Route path=":tutoringId" element={<NewLesson />}
											/>
										</Route>
									</Route>
								</Route>
								{/* < /lessons */}
								<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Lektor]} /> }>
									<Route path="lektors">
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin ]} /> }>
											<Route index element={<LektorsList />}
											/>
										</Route>
										<Route path=":id" element={<EditLektor />}
										/>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
											<Route path="new" element={<NewLektor />} 
											/>
											<Route path="show">
												<Route path=":mentorId" element={<LektorsList />}
												/>
											</Route>
										</Route>
									</Route>
								</Route>
								{/* < /lektors */}
								<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Client]} /> }>
									<Route path="clients">
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin ]} /> }>
											<Route index element={<ClientsList />} />
										</Route>
										<Route path=":id" element={<EditClient />}
										/>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor ]} /> }>
											<Route path="new" element={<NewClient />} 
											/>
											<Route path="show">
												<Route path=":mentorId" element={<ClientsList />}
												/>
											</Route>
										</Route>
									</Route>
								</Route>
								{/* < /clients */}
								<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Client]} /> }>
									<Route path="invoices">
										{/* /invoices > */}
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
											<Route index element={<InvoiceList />} 
											/>
										</Route>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
											<Route path="edit">
												<Route path=":invoiceId" element={<EditInvoice />}
												/>
											</Route>
											<Route path="new">
												<Route index element={<NewInvoice />} />
											</Route>
										</Route>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
											<Route path="show1">
												<Route path=":mentorId" element={<InvoiceList />}
												/>
											</Route>
										</Route>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Client]} /> }>
											<Route path="show2">
												<Route path=":klientId" element={<InvoiceList />}
												/>
											</Route>
										</Route>
									</Route>
								</Route>
								{/* < /invoices */}
								<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Lektor]} /> }>
								<Route path="salaries">
									{/* /salaries > */}
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin]} /> }>
										<Route index element={<SalaryList />} />
									</Route>
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
										<Route path="edit">
											<Route path=":salaryId" element={<EditSalary />}
											/>
										</Route>
										<Route path="new">
											<Route index element={<NewSalary />} />
										</Route>
									</Route>
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
										<Route path="show1">
											<Route path=":mentorId" element={<SalaryList />}
											/>
										</Route>
									</Route>
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Lektor]} /> }>
										<Route path="show2">
											<Route path=":lektorId" element={<SalaryList />}
											/>
										</Route>
									</Route>
									{/* < /salaries/show2 */}
								</Route>
								</Route>
								{/* < /salaries */}
							</Route>
							{/* < /sec */}
						</Route>
						{/* < Prefetch */}
					</Route>
					{/* <  Require auth */}
				</Route>
				{/* < Persist login */}
			</Route>
		</Routes>
	);
}

export default App;
