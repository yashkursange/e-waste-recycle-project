import toast from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message, {
    position: 'top-right',
    duration: 3000,
    style: {
      background: '#10b981',
      color: '#fff',
      borderRadius: '8px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
    icon: '✓',
  });
};

export const showError = (message) => {
  toast.error(message, {
    position: 'top-right',
    duration: 4000,
    style: {
      background: '#ef4444',
      color: '#fff',
      borderRadius: '8px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    },
    icon: '✕',
  });
};

export const showLoading = (message) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#3b82f6',
      color: '#fff',
      borderRadius: '8px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    },
  });
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

export const updateToast = (toastId, message, type = 'success') => {
  toast.dismiss(toastId);
  if (type === 'success') {
    showSuccess(message);
  } else if (type === 'error') {
    showError(message);
  }
};
