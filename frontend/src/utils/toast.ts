import { UseToastOptions } from '@chakra-ui/toast';

export const ToastError = (title: string): UseToastOptions => ({
  title,
  position: 'top-end',
  status: 'error',
  isClosable: true,
  containerStyle: {
    zIndex: 11,
    marginTop: 100,
  },
});

export const ToastWarning = (title: string): UseToastOptions => ({
  title,
  position: 'top-end',
  status: 'warning',
  isClosable: true,
  containerStyle: {
    zIndex: 11,
    marginTop: 100,
  },
});

export const ToastSuccess = (title: string): UseToastOptions => ({
  title,
  position: 'top-end',
  status: 'success',
  isClosable: true,
  containerStyle: {
    zIndex: 11,
    marginTop: 100,
  },
});
