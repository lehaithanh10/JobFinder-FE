import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import EmployeeInfoForm from "./component/CreateNewCvForm/CreateNewCvForm";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import LoginForm from "./pages/Login/LoginForm";
import SignUpForm from "./pages/SignUp/SignUpForm";
import ManageApplication from "./pages/Employee/ManageApplication/ManageApplication";
import UploadCvPage from "./pages/Employee/UploadCv/UploadCvPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewProfile from "./pages/Employee/NewProfile/NewProfile";
import CompanyPage from "./pages/Company/CompanyPage";
import CreateJobPage from "./pages/Job/CreateJobPage";
import ManageJobPosts from "./pages/Company/ManageJobPosts";
import DetailJob from "./pages/Job/JobDetailPage";
import ListApplicants from "./pages/Job/ListApplicants";
import ApplyJobPage from "./pages/Job/ApplyJobPage";
import UpdateProfile from "./pages/Company/UpdateProfile";
import UpdateJobPage from "./pages/Job/UpdateJobPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/signUp" element={<SignUpForm />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/employee/profile/:id" element={<NewProfile />}></Route>
          <Route
            path="/employee/applications"
            element={<ManageApplication />}
          ></Route>
          <Route path="/employeeForm" element={<EmployeeInfoForm />}></Route>
          <Route path="/uploadCv" element={<UploadCvPage />}></Route>
          <Route path="/company/:id" element={<CompanyPage />}></Route>
          <Route
            path="/company/update-profile"
            element={<UpdateProfile />}
          ></Route>
          <Route path="/job/:id" element={<DetailJob />}></Route>
          <Route path="/createJobPost" element={<CreateJobPage />}></Route>
          <Route
            path="/updateJobPost/:jobId"
            element={<UpdateJobPage />}
          ></Route>
          <Route path="/manageJobPost" element={<ManageJobPosts />}></Route>
          <Route
            path="/job-applications/:jobId"
            element={<ListApplicants />}
          ></Route>
          <Route path="/apply/:jobId" element={<ApplyJobPage />}></Route>
        </Routes>
      </Router>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
