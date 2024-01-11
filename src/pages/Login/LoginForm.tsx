import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../../redux/user/UserAction";
import { EIdentifyType, EJobFinderRole } from "../../enum-types";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";
import { logIn } from "../../api/auth";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import { renderErrorMessage } from "../../helpers/renderErrorMessage";
import { Form } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentError, setCurrentError] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<EJobFinderRole>(EJobFinderRole.EMPLOYEES);

  const handleLoginWithCredential = async (event: any) => {
    event?.preventDefault();

    const data = await logIn({
      username,
      password,
      role,
      identifierType: EIdentifyType.CREDENTIAL,
    });

    if (isErrorHttpResponse(data)) {
      setCurrentError(data.message);
    } else {
      localStorage.setItem("accessToken", data.data.accessToken);

      dispatch(
        setCurrentUser({
          user: {
            userId: data.data.userId,
            email: data.data.identifier,
            role,
          },
          accessToken: data.data.accessToken,
        })
      );

      

      navigate(`/`);
    }
  };

  // const handleLoginWithGoogle = async (event: any) => {
  //   try {
  //     const { user } = await signInWithGoogle();

  //     const accessToken = await user.getIdToken();
  //     const { data } = await axios.post<IApiLoginResponse>(
  //       `${process.env.REACT_APP_API_BASE_URL}auth/login`,
  //       {
  //         email: user.email,
  //         name: user.displayName,
  //         accessToken,
  //         role,
  //         identifierType: EIdentifyType.GOOGLE,
  //       },
  //     );

  //     localStorage.setItem('accessToken', accessToken);

  //     dispatch(
  //       setCurrentUser({
  //         user: {
  //           userId: data.userId,
  //           email: data.identifier,
  //           name: user.displayName || '',
  //           role,
  //         },
  //         accessToken,
  //       }),
  //     );

  //     navigate(`/`);
  //   } catch (err) {
  //     console.log('err here', err);
  //   }
  // };

  return (
    <div className="login-page">
      <h1
        style={{
          paddingBottom: "20px",
          fontWeight: "700",
          fontSize: "50px",
          textAlign: "center",
        }}
      >
        JobFinder
      </h1>
      <div className="form-content">
        <div className="content-main">
          <form>
            {!!currentError.length && renderErrorMessage(currentError)}

            <div className="fieldGroup">
              <Form.Control
                type="text"
                name="username"
                id="inputUsername"
                aria-describedby="passwordHelpBlock"
                placeholder="Email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="fieldGroup">
              <Form.Control
                type="password"
                name="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="role-option-container">
              <Form.Select
                className="text-center"
                aria-label="Default select example"
                onChange={(e) => {
                  setRole(e.target.value as EJobFinderRole);
                  console.log(role);
                }}
              >
                <option value={EJobFinderRole.EMPLOYEES}>Employee</option>
                <option value={EJobFinderRole.EMPLOYERS}>Employer</option>
              </Form.Select>
            </div>
            <button
              style={{ color: "white", fontSize: "17px" }}
              onClick={handleLoginWithCredential}
            >
              Login
            </button>
          </form>
          <div className="content-middle">
            <p className="forgot-password">
              <Link style={{ textDecoration: "none" }} to="/forgotPassword">
                Forgot password?
              </Link>
            </p>
          </div>
          <Link to="/signUp">
            <button style={{ backgroundColor: "gray", fontSize: "17px" }}>
              Create Account
            </button>
          </Link>
          {/* <button
            style={{ backgroundColor: "red", fontSize: "17px" }}
            onClick={handleLoginWithGoogle}
          >
            Continue with Google
          </button> */}
          {/* <button
            style={{ backgroundColor: '#359CE3', fontSize: '17px' }}
            onClick={handleLoginWithCredential}
          >
            Continue with Facebook
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
