import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { EResumeMethod } from "../../../types/resume";

export interface IEmployeeEducationProps {
  link?: string;
  title?: string;
  method?: EResumeMethod;
  onClickEditButton?: (e: any) => void;
  onClickDeleteButton?: (e: any) => void;
}

const EmployeeResume = (props: IEmployeeEducationProps) => {
  return (
    <div className="border-bottom border-2 mb-3 w-100">
      <div className="d-flex align-items-center">
        <a href={props.link} target="_blank" rel="noreferrer">
          {props.title}
        </a>
        <div className="ms-2">
          {props.method === EResumeMethod.CREATE && (
            <AiOutlineEdit
              style={{ cursor: "pointer" }}
              className="me-2 link-primary"
              size={28}
              onClick={props.onClickEditButton}
            />
          )}
          <HiOutlineTrash
            style={{ cursor: "pointer" }}
            className="me-2 link-danger"
            size={28}
            onClick={props.onClickDeleteButton}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeResume;
