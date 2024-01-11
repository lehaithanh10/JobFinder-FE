import { toast } from "react-toastify";

export const notify = (message: string, callback: () => void) =>
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    onClose: callback,
  });
