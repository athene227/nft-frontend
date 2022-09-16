import { ToastContainer, toast } from 'react-toastify';

const notification = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  }
};

export default notification;
