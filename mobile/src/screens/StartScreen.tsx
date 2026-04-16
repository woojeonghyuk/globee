import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import BrandWordmark from '@/src/components/BrandWordmark';
import { supabase } from '@/src/lib/supabase';
import { colors } from '@/src/theme/colors';

export default function StartScreen() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  const splashOpacity = useRef(new Animated.Value(1)).current;
  const splashScale = useRef(new Animated.Value(0.92)).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted && data.session) {
        router.replace('/(tabs)/home');
      }
    });

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    Animated.timing(splashScale, {
      toValue: 1,
      duration: 650,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 380,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);

        Animated.parallel([
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(contentTranslateY, {
            toValue: 0,
            duration: 420,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 1300);

    return () => clearTimeout(timer);
  }, [contentOpacity, contentTranslateY, splashOpacity, splashScale]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {showSplash ? (
          <Animated.View style={[styles.splash, { opacity: splashOpacity }]}>
            <Animated.View
              style={[
                styles.splashInner,
                {
                  transform: [{ scale: splashScale }],
                },
              ]}
            >
              <Image
                source={require('@/assets/images/globee-logo.png')}
                style={styles.splashLogo}
                resizeMode="contain"
              />
            </Animated.View>
          </Animated.View>
        ) : (
          <>
            <View style={styles.bgCircleTop} />
            <View style={styles.bgCircleBottom} />

            <Animated.View
              style={[
                styles.content,
                {
                  opacity: contentOpacity,
                  transform: [{ translateY: contentTranslateY }],
                },
              ]}
            >
              <View style={styles.topBlock}>
                <BrandWordmark width={150} style={styles.brandLogo} />

                <Text style={styles.title}>
                  가까운 유학생 선생님과{'\n'}
                  아이의 첫 세계를 연결해요
                </Text>

                <Text style={styles.subtitle}>
                  검증된 문화 수업을 쉽고 편하게 찾아보고{'\n'}
                  우리 아이에게 맞는 클래스를 신청해보세요.
                </Text>
              </View>

              <View style={styles.bottomBlock}>
                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => router.push('/signup')}
                >
                  <Text style={styles.primaryButtonText}>
                    회원가입하고 시작하기
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => router.push('/login')}
                  hitSlop={10}
                  style={({ pressed }) => pressed && styles.linkPressed}
                >
                  <Text style={styles.linkText}>이미 계정이 있다면 로그인</Text>
                </Pressable>
              </View>
            </Animated.View>
          </>
        )}
      </View>
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

  splash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.honey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    width: 160,
    height: 160,
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

  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },

  topBlock: {
    paddingTop: 6,
  },
  brandLogo: {
    marginBottom: 34,
  },
  title: {
    color: colors.navy,
    fontSize: 31,
    lineHeight: 40,
    fontWeight: '900',
    letterSpacing: -0.9,
    marginBottom: 22,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 26,
    fontWeight: '700',
  },

  bottomBlock: {
    paddingBottom: 6,
  },
  primaryButton: {
    height: 62,
    borderRadius: 24,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  linkText: {
    marginTop: 22,
    textAlign: 'center',
    color: colors.navy,
    fontSize: 15,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  linkPressed: {
    opacity: 0.72,
  },
});
