import { toast } from 'react-toastify';

const toastOptions = { position: toast.POSITION.TOP_CENTER, autoClose: 3000 };

export function errorNotification(text: string) {
  toast.error(text, toastOptions);
}

export function successNotification(text: string) {
  toast.success(text, toastOptions);
}
