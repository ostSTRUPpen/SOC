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
import useTitle from "./hooks/useTitle";
import Finances from "./features/Finances/Finances";

function App() {
	useTitle("Learning Triangle")
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

								<Route path="finances/:tutoringId" element={<Finances />} />

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
								</Route>
								{/* < /mentors */}
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
											<Route path="show/:mentorId" element={<LektorsList />}
											/>
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
											<Route path="show/:mentorId" element={<ClientsList />}
											/>
										</Route>
									</Route>
								</Route>
								{/* < /clients */}
								<Route path="tutorings">
									{/* /tutorings > */}
									<Route index element={<TutoringsList />} />
									<Route path=":id" element={<DisplayLessons />}
									/>
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
											<Route path="edit/:tutoringId" element={<EditTutoring />} 
											/>
										<Route path="new" element={<NewTutoring />}
										/>
									</Route>
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor,  ROLES.Lektor]} /> }>
											<Route path="show1/:lektorId" element={<TutoringsList />}
											/>
									</Route>
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Client]} /> }>
											<Route path="show2/:klientId" element={<TutoringsList />}
											/>
									</Route>
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
											<Route path="show3/:mentorId" element={<TutoringsList />}
											/>
									</Route>
								</Route>
								{/* < /tutorings */}
								<Route path="lessons">
									<Route index element={<LessonsList />} />
									<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Lektor]} /> }> 
										<Route path=":id" element={<EditLesson />}
										/>
										<Route path="new/:tutoringId" element={<NewLesson />}
										/>
									</Route>
								</Route>
								{/* < /lessons */}
								<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Client]} /> }>
									<Route path="invoices">
										{/* /invoices > */}
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
											<Route index element={<InvoiceList />} 
											/>
										</Route>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
											<Route path="edit/:invoiceId" element={<EditInvoice />}
											/>
											</Route>
											<Route path="new" element={<NewInvoice />}
											/>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
											<Route path="show1/:mentorId" element={<InvoiceList />}
											/>
										</Route>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Client]} /> }>
											<Route path="show2/:klientId" element={<InvoiceList />}
											/>
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
											<Route path="edit/:salaryId" element={<EditSalary />}
											/>
											<Route path="new" element={<NewSalary />}
											/>
										</Route>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor]} /> }>
											<Route path="show1/:mentorId" element={<SalaryList />}
											/>
										</Route>
										<Route element={ <RequireAuth allowedRoles={[ ROLES.Admin, ROLES.Mentor, ROLES.Lektor]} /> }>
											<Route path="show2/:lektorId" element={<SalaryList />}
											/>
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
