import Swal from 'sweetalert2';

// sweetalert notification
export const showLoading = (params) => {
  Swal.fire({
    text: 'Please wait...',
    onBeforeOpen: () => Swal.showLoading(),
    allowOutsideClick: () => !Swal.isLoading(),
    showCancelButton: false,
    showConfirmButton: false,
    ...params
  });
};


export const showError = (errStr, params) => {
  Swal.fire({
    type: 'error',
    text: `Error: ${errStr}`,
    allowOutsideClick: () => !Swal.isLoading(),
    ...params
  });
};

export const showSuccess = (success, params) => {
  Swal.fire({
    type: 'success',
    text: `${success}`,
    allowOutsideClick: () => !Swal.isLoading(),
    ...params
  });
};
