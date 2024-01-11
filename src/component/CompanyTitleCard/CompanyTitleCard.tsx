import { Button } from "react-bootstrap";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import { EJobFinderRole } from "../../enum-types";
import { IUserInfo } from "../../types/user";
import { RootState } from "../../redux/reduxStore";
import { useSelector } from "react-redux";
import { IApiGetCompanyResponse } from "../../types/company";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../img/defaultImage/default-placeholder.png";

const CompanyTitleCard = ({
  title,
  location,
  logo,
  companyId,
  email,
}: {
  title: string;
  location: string;
  logo: string;
  companyId: string;
  email: string;
}) => {
  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const company: IApiGetCompanyResponse | undefined = useSelector(
    (state: RootState) => state.company.currentCompany
  );

  const navigate = useNavigate();

  return (
    <div
      className="row mt-5"
      style={{ backgroundColor: "#fff", maxHeight: "25vh" }}
    >
      <div className="col-md-3 d-flex justify-content-center align-items-center">
        <img
          className="aspect-ratio h-75 border border-secondary"
          src={logo || defaultImage}
          alt="company-logo"
          style={{ maxHeight: "22vh" }}
        />
      </div>
      <div className="col-md-6 py-3">
        <div className="d-flex justify-content-start py-2">
          <strong style={{ fontSize: "35px" }}>{title}</strong>
        </div>
        {!!email && (
          <div className="d-flex justify-content-start align-items-center">
            <HiMail />
            <div style={{ marginLeft: "5px" }}>{email} </div>
          </div>
        )}
        {!!location && (
          <div className="d-flex justify-content-start align-items-center">
            <HiLocationMarker />
            <div style={{ marginLeft: "5px" }}>{location} </div>
          </div>
        )}
      </div>
      <div className="col-md-3 d-flex justify-content-center align-items-center">
        {(user?.role !== EJobFinderRole.EMPLOYERS || !user.role) && (
          <Button className="btn btn-danger w-50">Follow</Button>
        )}
        {user?.role === EJobFinderRole.EMPLOYERS &&
          company?.id === companyId && (
            <Button
              variant="success"
              onClick={() => {
                navigate("/company/update-profile");
              }}
            >
              Edit Company Profile
            </Button>
          )}
      </div>
    </div>
  );
};

export default CompanyTitleCard;
