import Swal from "sweetalert2";
import "../Style/toast.css";

export const showToast = (message, icon = "success") => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",

    showConfirmButton: false,

    timer: 3000,
    timerProgressBar: true,

    width: "auto",

    customClass: {
      popup: `modern-toast modern-toast--${icon}`,
      title: "modern-toast__title",
      icon: "modern-toast__icon",
      timerProgressBar: "modern-toast__progress",
    },

    showClass: {
      popup: "animate__animated animate__slideInRight animate__faster",
    },

    hideClass: {
      popup: "animate__animated animate__slideOutRight animate__faster",
    },

    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon,
    title: message,
  });
};