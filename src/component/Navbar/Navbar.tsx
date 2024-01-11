import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { setCurrentUser } from "../../redux/user/UserAction";
import { useEffect } from "react";
import { IUserInfo } from "../../types/user";
import { EJobFinderRole } from "../../enum-types";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../../api/user";
import { employerFetchTheirInformation } from "../../api/employer";
import { fetchEmployeeInfo } from "../../api/employee";
import { setCurrentEmployee } from "../../redux/employee/EmployeeAction";
import { setCurrentCompany } from "../../redux/company/CompanyAction";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";

const NavbarControl = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const logout = () => {
    localStorage.removeItem("accessToken");

    dispatch(
      setCurrentUser({
        user: undefined,
        accessToken: "",
      })
    );
  };

  const setUserInfo = async () => {
    const user = await fetchUserInfo();

    if (user.role === EJobFinderRole.EMPLOYEES) {
      const data = await fetchEmployeeInfo(user.userId || "");
      if (isErrorHttpResponse(data)) {
        //fire warning here
      } else {
        dispatch(setCurrentEmployee(data.data!));
      }
    } else {
      const data = await employerFetchTheirInformation();
      if (isErrorHttpResponse(data)) {
        //fire warning here
      } else {
        dispatch(setCurrentCompany(data.data));
      }
    }

    dispatch(
      setCurrentUser({
        user: {
          email: user.identifier,
          userId: user.userId,
          role: user.role,
        },
        accessToken: localStorage.getItem("accessToken") || "",
      })
    );
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setUserInfo();
    }
  }, []);

  return (
    <Navbar
      className="nav-control"
      bg="dark"
      variant="dark"
      style={{ width: "100%" }}
    >
      <Navbar.Brand className="brand" href="/">
        JobFinder - IT Job
      </Navbar.Brand>

      <div className="login-or-user">
        {!user && (
          <>
            <Nav.Link
              className="white-font margin-left-right"
              style={{ color: "white" }}
              href="/login"
            >
              Login
            </Nav.Link>
          </>
        )}

        {user && (
          <div className="user-and-logout">
            <NavDropdown
              className="white-font margin-left-right"
              title={`Welcome back ${user.name || user.email}`}
              style={{ color: "white" }}
            >
              {user.role === EJobFinderRole.EMPLOYEES && (
                <>
                  <NavDropdown.Item
                    className="text-dark"
                    onClick={() => {
                      navigate(`/employee/profile/${user.userId}`);
                    }}
                  >
                    Update Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="text-dark"
                    onClick={() => {
                      navigate("/employee/applications");
                    }}
                  >
                    Manage Applications
                  </NavDropdown.Item>
                </>
              )}
              {user.role === EJobFinderRole.EMPLOYERS && (
                <>
                  <NavDropdown.Item
                    className="text-dark"
                    href={`/company/${user.userId}`}
                  >
                    Company Page
                  </NavDropdown.Item>
                  <NavDropdown.Item className="text-dark" href="/manageJobPost">
                    Manage Job Posts
                  </NavDropdown.Item>
                  <NavDropdown.Item className="text-dark" href="/createJobPost">
                    Create New Job
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
            <Nav.Link
              style={{ color: "white" }}
              className="white-font margin-left-right"
              onClick={logout}
            >
              Logout
            </Nav.Link>
          </div>
        )}
      </div>
    </Navbar>
  );
};
export default NavbarControl;
