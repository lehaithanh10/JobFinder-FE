import { Badge, Button } from "react-bootstrap";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { IUserInfo } from "../../types/user";
import { RootState } from "../../redux/reduxStore";
import { useSelector } from "react-redux";
import { EJobFinderRole } from "../../enum-types";
import { JobKeyWord } from "../../types/job";
import { IApiGetCompanyResponse } from "../../types/company";
import { useNavigate } from "react-router-dom";

type JobTitleCardProps = {
  title: string;
  logo: string;
  location: string[];
  salary: string;
  id: string;
  keywords: JobKeyWord[];
  active: boolean;
  userId: string;
};

function JobTitleCard({
  title,
  logo,
  location,
  salary,
  id,
  keywords,
  active,
  userId,
}: JobTitleCardProps) {
  const navigate = useNavigate();

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const company: IApiGetCompanyResponse | undefined = useSelector(
    (state: RootState) => state.company.currentCompany
  );

  const handleApplyJob = () => {
    navigate(`/apply/${id}`);
  };

  const renderKeywords = (keywords: JobKeyWord[]) => {
    if (!keywords) return <p></p>;

    return keywords.map((keyword, index: number) => (
      <Badge key={index} className="ms-2" pill bg="success">
        {keyword.title}
      </Badge>
    ));
  };

  const renderItems = (items: string[]) => {
    if (!items) return <p></p>;
    return items.map((item, index: number) => (
      <p style={{ marginLeft: "5px" }} key={index}>
        {item}
      </p>
    ));
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ borderBottom: "0.5px solid black" }}
    >
      <div className="d-flex">
        <div className="d-flex align-items-center w-25 mx-3">
          <img src={logo} alt="logo-company" style={{ width: "100%" }} />
        </div>
        <div className="w-75 d-flex justify-content-center">
          <div className="w-100">
            <div className="d-flex justify-content-start pt-2">
              <h3>{title}</h3>
            </div>
            <div className="d-flex justify-content-start">
              <AttachMoneyIcon />
              <p>{salary}</p>
            </div>
            <div className="d-flex justify-content-start">
              <LocationOnIcon />
              {renderItems(location)}
            </div>
            <div className="w-100 pb-2">{renderKeywords(keywords)}</div>
          </div>
        </div>
      </div>
      <div className="w-100 d-flex flex-column justify-content-center p-2">
        {user && user.role === EJobFinderRole.EMPLOYEES && active && (
          <Button variant="primary" onClick={handleApplyJob}>
            Apply Job
          </Button>
        )}
        {user &&
          user.role === EJobFinderRole.EMPLOYERS &&
          user.userId === userId && (
            <Button
              variant="primary"
              onClick={() => {
                navigate(`/updateJobPost/${id}`);
              }}
            >
              Edit Job
            </Button>
          )}
        {!user && active && (
          <Button variant="primary" disabled>
            Login to apply this job
          </Button>
        )}
      </div>
    </div>
  );
}

export default JobTitleCard;
