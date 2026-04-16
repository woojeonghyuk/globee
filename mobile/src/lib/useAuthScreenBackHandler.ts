import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { goBackOrStart } from '@/src/lib/navigation';

export function useAuthScreenBackHandler() {
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          goBackOrStart();
          return true;
        },
      );

      return () => subscription.remove();
    }, []),
  );
}
