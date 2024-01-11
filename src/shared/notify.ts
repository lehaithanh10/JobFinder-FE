import { toast } from "react-toastify";

export const notify = (message: string, callback: () => void) =>
  toast.success(message, {
    autoClose: 1500,
    onClose: callback,
  });
