import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme/colors';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    marginBottom: 14,
  },
  title: {
    color: colors.navy,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
});
