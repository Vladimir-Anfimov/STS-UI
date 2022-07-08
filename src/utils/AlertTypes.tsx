import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export function alertError(text: string) {
  Swal.fire({
    icon: "error",
    text: text,
  });
}

export function alertSuccess(text: string) {
  Swal.fire({
    icon: "success",
    text: text,
  });
}

export function alertWarning(text: string) {
  Swal.fire({
    icon: "warning",
    text: text,
  });
}

export function askIfSure(text: string, callback: Function) {
  Swal.fire({
    text: text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Da!",
  }).then((result) => {
    if (result.value) callback();
  });
}

export function confirmAction(text: string, callback: Function) {
  Swal.fire({
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Da!",
  }).then((result) => {
    if (result.value) callback();
  });
}

export function confirmWithDifferentButtons(
  text: string,
  callback: Function,
  msgBtn1: string,
  msgBtn2: string
) {
  Swal.fire({
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: msgBtn1,
    cancelButtonText: msgBtn2,
  }).then((result) => {
    if (result.value) callback();
  });
}

export function alertInternetLost() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Conexiunea cu internetul a fost pierdută!",
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });
}

export function closeAlert() {
  Swal.close();
}

export function AlertInternetRestabilit() {
  Toast.fire({
    icon: "success",
    title: "Conexiune restabilită",
  });
}
