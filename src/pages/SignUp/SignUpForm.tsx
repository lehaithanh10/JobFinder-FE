import { useState } from "react";
import { renderErrorMessage } from "../../helpers/renderErrorMessage";
import { EIdentifyType, EJobFinderRole } from "../../enum-types";

import "./SignUpForm.scss";
import { signUp } from "../../api/auth";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import { setCurrentUser } from "../../redux/user/UserAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";

const SignUpForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [role, setRole] = useState<EJobFinderRole>(EJobFinderRole.EMPLOYEES);
  const [currentError, setCurrentError] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateAccount = async () => {
    const data = await signUp({
      username,
      password,
      passwordAgain,
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

  // const handleCreateAccountWithGoogle = () => {
  //   console.log(role);
  // };

  // const handleCreateAccountWithFacebook = () => {
  //   console.log(role);
  // };

  return (
    <div className="signUp-page">
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
                placeholder="Email"
                maxLength={5000}
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
                maxLength={500}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="fieldGroup">
              <Form.Control
                type="password"
                name="passwordAgain"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="Confirm password"
                value={passwordAgain}
                maxLength={500}
                onChange={(e) => {
                  setPasswordAgain(e.target.value);
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
          </form>
          <button
            style={{ backgroundColor: "#38e168", fontSize: "17px" }}
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
          {/* <button
            style={{ backgroundColor: "red", fontSize: "17px" }}
            onClick={handleCreateAccountWithGoogle}
          >
            Continue with Google
          </button> */}
          {/* <button
            style={{ backgroundColor: '#359CE3', fontSize: '17px' }}
            onClick={handleCreateAccountWithFacebook}
          >
            Continue with Facebook
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
