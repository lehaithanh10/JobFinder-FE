import axios from "axios";

export type CreateEmployeeSkillDto = {
  title?: string;
  id?: string;
};

export type UpdateEmployeeSkillDto = {
  title?: string;
};

export const createEmployeeSkill = async (
  createEmployeeSkillDto: CreateEmployeeSkillDto
) => {
  console.log(createEmployeeSkillDto);
  try {
    const data = await axios.post<CreateEmployeeSkillDto>(
      `${process.env.REACT_APP_API_BASE_URL}/employee-skill`,
      { skills: [createEmployeeSkillDto] },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    return {
      status: data.status,
      data: data.data,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      message: Array.isArray(err.response.data.message)
        ? [...err.response.data.message]
        : [err.response.data.message],
    };
  }
};

export const updateEmployeeSkill = async (
  updateEmployeeSkillDto: UpdateEmployeeSkillDto,
  skillId: string
) => {
  try {
    const data = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/employee-skill`,
      updateEmployeeSkillDto,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: { skillId },
      }
    );

    return {
      status: data.status,
      data: data.data,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      message: Array.isArray(err.response.data.message)
        ? [...err.response.data.message]
        : [err.response.data.message],
    };
  }
};

export const deleteEmployeeSkill = async (skillId: string) => {
  try {
    const data = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/employee-skill`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: { skillId },
      }
    );

    return {
      status: data.status,
      data: data.data,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      message: Array.isArray(err.response.data.message)
        ? [...err.response.data.message]
        : [err.response.data.message],
    };
  }
};
