import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { formatDateToMMYYYY } from "../../../util/formatDateToMMYYYY";
import parse from "html-react-parser";
import { IUserInfo } from "../../../types/user";
import { RootState } from "../../../redux/reduxStore";
import { useSelector } from "react-redux";

export interface IEmployeeEducationProps {
  studyField?: string;
  startingDate?: string;
  endingDate?: string;
  degree?: string;
  schoolName?: string;
  description?: string;
  userId: string;
  onClickEditButton: (e: any) => void;
  onClickDeleteButton: (e: any) => void;
}

const EmployeeEducation = (props: IEmployeeEducationProps) => {
  const {
    userId,
    studyField,
    startingDate,
    endingDate,
    schoolName,
    description,
  } = props;

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  return (
    <div className="border-bottom border-2 mb-3 w-100">
      <div className="d-flex justify-content-between">
        {!!schoolName && (
          <h4 className="mb-2" style={{ maxWidth: "80%" }}>
            {schoolName}
          </h4>
        )}
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
      {!!studyField && (
        <div style={{ fontWeight: 500, color: "gray" }}>{studyField}</div>
      )}
      {!!(startingDate || endingDate) && (
        <div className="mb-1" style={{ fontWeight: 500, color: "gray" }}>
          {startingDate && formatDateToMMYYYY(startingDate)}
          {startingDate && endingDate ? "-" : ""}{" "}
          {endingDate && formatDateToMMYYYY(endingDate)}
        </div>
      )}
      {!!description && <p className="mb-4">{parse(description)}</p>}
    </div>
  );
};

export default EmployeeEducation;
