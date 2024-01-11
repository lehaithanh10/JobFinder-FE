import { Stack } from "react-bootstrap";
import { MdMail, MdLocalPhone, MdLocationPin } from "react-icons/md";
import { FaLinkedin, FaGithubSquare, FaFacebookSquare } from "react-icons/fa";
import { IUserInfoForm } from "../../../component/CreateNewCvForm/CreateNewCvForm";
import { EducationDto, WorkingExperienceDto } from "../../../api/employee";
import * as _ from "lodash";
import { Button, Container } from "react-bootstrap";
import jsPDF from "jspdf";
import { CVTemplateProps } from "../CVTemplateProps";
import { Divider } from "@material-ui/core";

const CvTemplate2 = (props: CVTemplateProps) => {
  const renderWorkingExperiences = (
    workingExperiences: WorkingExperienceDto[] | undefined
  ) => {
    if (workingExperiences && workingExperiences.length) {
      return workingExperiences.map((workingExp) => {
        return (
          <Stack gap={2}>
            <div>{workingExp.position}</div>
            <div>{workingExp.companyName}</div>
            <div>
              {workingExp.startingDate} - {workingExp.endingDate}
            </div>

            <div className="mt-1">Responsibility:</div>
            <div style={{ whiteSpace: "pre-line" }}>
              {workingExp.responsibility}
            </div>
          </Stack>
        );
      });
    }
  };

  const renderEducations = (educations: EducationDto[] | undefined) => {
    if (educations && educations.length) {
      return educations.map((education) => {
        return (
          <Stack gap={2}>
            <div>{education.schoolName}</div>
            <div>{education.studyField}</div>
            <Stack direction="horizontal">
              <div>
                {education.startingDate} - {education.endingDate}
              </div>
            </Stack>
          </Stack>
        );
      });
    }
  };

  return (
    <Container className="mt-4 mb-2" style={{ maxWidth: "50%" }}>
      <div>
        <Stack direction="horizontal">
          <Stack gap={2} style={{ width: "40%" }}>
            <h1>{props.name ? props.name : "Jhon Doe"}</h1>
            {props.profession && (
              <div color={"gray.500"}>{props.profession}</div>
            )}
          </Stack>
          <Stack gap={2} style={{ width: "40%" }}>
            {props.profileDescription && (
              <div color={"gray.500"}>{props.profileDescription}</div>
            )}
          </Stack>
        </Stack>

        <Stack
          style={{
            backgroundColor: "cyan.400",
            color: "#fff",
          }}
          className="px-5 py-2 justify-content-between border-top border-dark"
        >
          <Stack direction="horizontal">
            <Stack direction="horizontal" gap={1}>
              <MdMail />
              <div>{props.email ? props.email : "jhondoe@gmail.com"}</div>
            </Stack>
            <Stack direction="horizontal" gap={1}>
              <MdLocalPhone />{" "}
              <div>
                {props.mobilePhone ? props.mobilePhone : "+918559584846"}
              </div>
            </Stack>
            <Stack direction="horizontal" gap={1}>
              <MdLocationPin />{" "}
              <div>{props.location ? props.location : "Pune, MH"}</div>
            </Stack>
          </Stack>
          <Stack direction="horizontal">
            <Stack direction="horizontal" gap={1}>
              <FaLinkedin /> <div>LinkedIn</div>
            </Stack>
            <Stack direction="horizontal" gap={1}>
              <FaGithubSquare /> <div>GitHub</div>
            </Stack>
            <Stack direction="horizontal" gap={1}>
              <FaFacebookSquare />
              <div>Facebook</div>
            </Stack>
          </Stack>
        </Stack>

        <Stack direction="horizontal" gap={2}>
          <Stack gap={3}>
            <Stack>
              <h1 color={"gray.700"}>EDUCATION</h1>
            </Stack>
          </Stack>

          <Stack className="mx-2 w-100" gap={3}>
            <Stack className="my-2">
              <h1 color={"gray.700"}>SKILLS</h1>
              <div>
                <div>{props.skillDescription}</div>
              </div>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          className="w-100 h-100 my-2 px-2 py-3 justify-content-between align-items-start border-top border-dark"
          gap={1}
        >
          <h1 color={"gray.700"}>WORK EXPERIENCE</h1>
        </Stack>
      </div>
      <Button
        variant="dark"
        className="py-2 my-3 text-white font-weight-bold"
        style={{ width: "100%" }}
        // onClick={createCv}
      >
        Save
      </Button>
    </Container>
  );
};

export default CvTemplate2;
