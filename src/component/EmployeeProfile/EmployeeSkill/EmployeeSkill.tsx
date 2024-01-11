import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { IUserInfo } from "../../../types/user";
import { RootState } from "../../../redux/reduxStore";
import { useSelector } from "react-redux";

export interface IEmployeeSkillProps {
  userId: string;
  title?: string;
  onClickEditButton: (e: any) => void;
  onClickDeleteButton: (e: any) => void;
}

const EmployeeSkill = (props: IEmployeeSkillProps) => {
  const { title, userId } = props;

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  return (
    <div className="w-50 d-flex justify-content-between pt-3">
      <div>{title}</div>
      {user?.userId === userId && (
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
      )}
    </div>
  );
};

export default EmployeeSkill;
