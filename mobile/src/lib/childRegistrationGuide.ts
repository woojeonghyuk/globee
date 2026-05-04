import AsyncStorage from '@react-native-async-storage/async-storage';

const CHILD_REGISTRATION_GUIDE_KEY_PREFIX = 'child-registration-guide';

function getChildRegistrationGuideKey(userId: string) {
  return `${CHILD_REGISTRATION_GUIDE_KEY_PREFIX}:${userId}`;
}

export async function markChildRegistrationGuidePending(userId: string) {
  await AsyncStorage.setItem(getChildRegistrationGuideKey(userId), 'pending');
}

export async function clearChildRegistrationGuidePending(userId: string) {
  await AsyncStorage.removeItem(getChildRegistrationGuideKey(userId));
}

export async function isChildRegistrationGuidePending(userId: string) {
  const value = await AsyncStorage.getItem(getChildRegistrationGuideKey(userId));

  return value === 'pending';
}
