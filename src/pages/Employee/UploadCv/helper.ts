export const isFileIsAcceptedExtensionType = (fileName: string) => {
  const fileExtension = fileName.split(".").pop() as string;
  const acceptedExtensions = ["pdf", "doc", "docx"];
  return acceptedExtensions.includes(fileExtension);
};

export const isFileSizeIsSmallerThan10MB = (file: File) => {
  const fileSizeInMB = file.size / (1024 * 1024); // convert file size from bytes to megabytes
  return fileSizeInMB < 10;
};
