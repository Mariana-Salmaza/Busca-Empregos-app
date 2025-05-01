import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import JobsList from "./pages/JobsList";
import JobDetails from "./pages/JobDetails";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import MyPubs from "./pages/MyPubs";
import VacancyForm from "./pages/VacancyForm";
import EditVacancyForm from "./pages/EditVacancyForm";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <PrivateRoute>
              <Outlet />
              <Footer />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/jobsList" element={<JobsList />} />
          <Route path="/job-details/:id" element={<JobDetails />} />
          <Route path="/myPubs" element={<MyPubs />} />
          <Route path="/vacancyForm" element={<VacancyForm />} />
          <Route path="/EditVacancyForm" element={<EditVacancyForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
