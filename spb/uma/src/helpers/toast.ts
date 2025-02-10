import Toast from 'react-native-root-toast';

export type ToastProps = {
  message: string;
  delay?: number;
  duration?: number;
  positions?: number;
  backgroundColor?: string;
  shadowColor?: string;
  textColor?: string;
};

export const toast = ({
  message,
  delay = 0,
  duration = 2500,
  positions = Toast.positions.BOTTOM,
  backgroundColor,
  shadowColor,
  textColor,
}: ToastProps) => {
  Toast.show(message, {
    duration: duration,
    position: positions,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: delay,
    backgroundColor: backgroundColor,
    shadowColor: shadowColor,
    textColor: textColor,
  });
};

export const toastSuccess = (props: ToastProps) => {
  toast({
    ...props,
    backgroundColor: 'green',
    shadowColor: 'green',
    textColor: 'white',
  });
};

export const toastError = (props: ToastProps) => {
  toast({
    ...props,
    backgroundColor: 'red',
    shadowColor: 'red',
    textColor: 'white',
  });
};
