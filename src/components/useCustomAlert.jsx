import { useState } from 'react';

const DEFAULT_ALERT = {
  visible: false,
  title: '',
  message: '',
  variant: 'success',
  buttonText: '확인',
  secondaryButtonText: undefined,
  onPress: undefined,
  onSecondaryPress: undefined,
  actions: undefined,
};

export default function useCustomAlert(initialValues = {}) {
  const [alertConfig, setAlertConfig] = useState({
    ...DEFAULT_ALERT,
    ...initialValues,
  });

  const showAlert = config => {
    setAlertConfig({
      ...DEFAULT_ALERT,
      ...config,
      visible: true,
    });
  };

  const closeAlert = () => {
    setAlertConfig(prev => ({
      ...prev,
      visible: false,
    }));
  };

  return {
    alertConfig,
    showAlert,
    closeAlert,
  };
}