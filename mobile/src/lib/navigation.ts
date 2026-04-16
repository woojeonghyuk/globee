import { router } from 'expo-router';

export function goBackOrStart() {
  if (router.canGoBack()) {
    router.back();
    return;
  }

  router.replace('/');
}
