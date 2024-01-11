import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { formatDateToMMYYYY } from "../../../util/formatDateToMMYYYY";
import parse from "html-react-parser";
import { IUserInfo } from "../../../types/user";
import { RootState } from "../../../redux/reduxStore";
import { useSelector } from "react-redux";

export interface IEmployeeWorkingExperienceProps {
  position?: string;
  companyName?: string;
  responsibility?: string;
  startingDate?: string;
  endingDate?: string;
  companyAddress?: string;
  userId: string;
  onClickEditButton: (e: any) => void;
  onClickDeleteButton: (e: any) => void;
}

const EmployeeWorkingExperience = (props: IEmployeeWorkingExperienceProps) => {
  const {
    position,
    startingDate,
    endingDate,
    companyName,
    responsibility,
    companyAddress,
    userId,
  } = props;

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  return (
    <div className="border-bottom border-2 mb-3 w-100">
      <div className="d-flex justify-content-between">
        {!!position && <h4 className="mb-2">{position}</h4>}
        {user?.userId === userId && (
          <div>
            <div>
              <AiOutlineEdit
                style={{ cursor: "pointer" }}
                className="me-2 link-primary"
                size={28}
                onClick={props.onClickEditButton}
              />
              <HiOutlineTrash
                style={{ cursor: "pointer" }}
                className="me-2 link-danger"
                size={28}
                onClick={props.onClickDeleteButton}
              />
            </div>
          </div>
        )}
      </div>
      {!!companyName && <strong className="mb-1">{companyName}</strong>}

      {!!(startingDate || endingDate) && (
        <div className="mb-1" style={{ fontWeight: 500, color: "gray" }}>
          {startingDate && formatDateToMMYYYY(startingDate)}
          {startingDate && endingDate ? "-" : ""}
          {endingDate && formatDateToMMYYYY(endingDate)}
        </div>
      )}
      {!!companyAddress && (
        <div className="mb-1" style={{ fontWeight: 500, color: "gray" }}>
          {companyAddress}
        </div>
      )}
      {!!responsibility && <p className="my-3">{parse(responsibility)}</p>}
    </div>
  );
};

export default EmployeeWorkingExperience;
