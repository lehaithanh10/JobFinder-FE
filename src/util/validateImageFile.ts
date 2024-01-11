export const validateImageFile = (fileType: string) => {
  const fileStart = fileType.split("/")[0];

  if (fileStart === "image") return true;

  return false;
};
