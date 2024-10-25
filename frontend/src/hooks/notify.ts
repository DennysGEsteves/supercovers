import { useToast, UseToastOptions } from '@chakra-ui/toast';

export const useNotify = () => {
  const toast = useToast({
    containerStyle: {
      marginBottom: 100,
    },
  });

  function success(title: string) {
    return toast({
      title,
      position: 'bottom',
      status: 'success',
      isClosable: true,
    } as UseToastOptions);
  }

  function error(title: string) {
    return toast({
      title,
      position: 'bottom',
      status: 'error',
      isClosable: true,
    } as UseToastOptions);
  }

  function warning(title: string) {
    return toast({
      title,
      position: 'bottom',
      status: 'warning',
      isClosable: true,
    } as UseToastOptions);
  }

  function info(title: string) {
    return toast({
      title,
      position: 'bottom',
      status: 'info',
      isClosable: true,
    } as UseToastOptions);
  }

  return {
    success,
    error,
    warning,
    info,
  };
};
