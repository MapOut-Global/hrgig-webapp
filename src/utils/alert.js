import { toast } from 'react-toastify';

export const toastAlert = (msg, status = 'success') => {
  toast[status](msg);
};
