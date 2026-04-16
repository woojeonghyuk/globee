import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/src/theme/colors';

type ScreenShellProps = {
  children: ReactNode;
  scroll?: boolean;
};

export default function ScreenShell({ children, scroll = true }: ScreenShellProps) {
  const content = (
    <>
      <View style={styles.bgCircleTop} />
      <View style={styles.bgCircleBottom} />
      {children}
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView
          alwaysBounceVertical={false}
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        <View style={styles.fixedContent}>{content}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 26,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  fixedContent: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 26,
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
    backgroundColor: colors.sky,
    opacity: 0.95,
  },
  bgCircleBottom: {
    position: 'absolute',
    bottom: -150,
    left: -105,
    width: 250,
    height: 250,
    borderRadius: 999,
    backgroundColor: '#F7EBA6',
    opacity: 0.95,
  },
});
