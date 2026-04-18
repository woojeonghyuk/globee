import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Href, router } from 'expo-router';

import BrandWordmark from '@/src/components/BrandWordmark';
import {
  formatKoreanPhoneInput,
  getPasswordValidationError,
  isValidKoreanPhone,
  normalizeKoreanPhone,
} from '@/src/lib/phone';
import { goBackOrStart } from '@/src/lib/navigation';
import { supabase } from '@/src/lib/supabase';
import { useAuthScreenBackHandler } from '@/src/lib/useAuthScreenBackHandler';
import { colors } from '@/src/theme/colors';

const resetPasswordRoute = '/reset-password' as Href;

export default function LoginScreen() {
  useAuthScreenBackHandler();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (isSubmitting) return;

    if (!isValidKoreanPhone(phone)) {
      Alert.alert('입력 확인', '휴대폰 번호를 정확히 입력해주세요.');
      return;
    }

    const passwordError = getPasswordValidationError(password, phone);
    if (passwordError) {
      Alert.alert('입력 확인', passwordError);
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      phone: normalizeKoreanPhone(phone),
      password,
    });

    if (error) {
      setIsSubmitting(false);
      Alert.alert(
        '로그인 실패',
        '휴대폰 번호 또는 비밀번호가 맞지 않아요.\n다시 확인해주세요.',
      );
      return;
    }

    setIsSubmitting(false);
    router.replace('/(tabs)/home');
  };

  const handleLoginHelp = () => {
    Alert.alert('로그인 문의', '인스타그램 @globee_st 계정으로 문의해주세요.');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.bgCircleTop} />
        <View style={styles.bgCircleBottom} />

        <Pressable onPress={goBackOrStart} style={styles.backButton} hitSlop={10}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <View style={styles.content}>
          <View style={styles.headerArea}>
            <BrandWordmark width={148} style={styles.brandLogo} />
            <Text style={styles.title}>로그인</Text>
            <Text style={styles.subtitle}>
              보호자 전화번호와 비밀번호로 시작해요.
            </Text>
          </View>

          <View style={styles.formArea}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>휴대폰 번호</Text>
              <TextInput
                value={phone}
                onChangeText={(value) => setPhone(formatKoreanPhoneInput(value))}
                placeholder="휴대폰 번호를 입력해주세요"
                placeholderTextColor={colors.muted}
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>비밀번호</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호를 입력해주세요"
                placeholderTextColor={colors.muted}
                secureTextEntry
                style={styles.input}
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                isSubmitting && styles.loginButtonDisabled,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>
                {isSubmitting ? '로그인 중' : '로그인'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.footerArea}>
            <Pressable onPress={() => router.replace('/signup')} hitSlop={10}>
              <Text style={styles.footerLink}>회원가입</Text>
            </Pressable>

            <Text style={styles.footerDivider}>|</Text>

            <Pressable onPress={() => router.replace(resetPasswordRoute)} hitSlop={10}>
              <Text style={styles.footerLink}>비밀번호 찾기</Text>
            </Pressable>

            <Text style={styles.footerDivider}>|</Text>

            <Pressable onPress={handleLoginHelp} hitSlop={10}>
              <Text style={styles.footerLink}>로그인 문의</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },

  bgCircleTop: {
    position: 'absolute',
    top: -60,
    right: -50,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: '#DDEDFC',
    opacity: 0.95,
  },
  bgCircleBottom: {
    position: 'absolute',
    bottom: -150,
    left: -90,
    width: 250,
    height: 250,
    borderRadius: 999,
    backgroundColor: '#F7EBA6',
    opacity: 0.95,
  },

  backButton: {
    position: 'absolute',
    top: 54,
    left: 22,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  backText: {
    color: colors.navy,
    fontSize: 35,
    fontWeight: '700',
  },

  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 78,
    paddingBottom: 34,
    justifyContent: 'space-between',
  },

  headerArea: {
    alignItems: 'center',
    marginTop: 4,
  },
  brandLogo: {
    marginBottom: 16,
  },
  title: {
    color: colors.navy,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '900',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  formArea: {
    marginTop: 24,
    gap: 28,
  },
  inputGroup: {
    gap: 10,
  },
  inputLabel: {
    color: colors.navySoft,
    fontSize: 15,
    fontWeight: '700',
  },
  input: {
    height: 54,
    color: colors.navy,
    fontSize: 18,
    fontWeight: '600',
    borderBottomWidth: 1.2,
    borderBottomColor: colors.lineStrong,
    paddingHorizontal: 0,
  },

  loginButton: {
    marginTop: 18,
    height: 62,
    borderRadius: 30,
    backgroundColor: colors.honey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.58,
  },
  loginButtonText: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
  },

  footerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 8,
  },
  footerLink: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '600',
  },
  footerDivider: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});
