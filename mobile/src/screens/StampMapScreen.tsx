import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ScreenShell from '@/src/components/ScreenShell';
import { useChildProfiles } from '@/src/state/ChildProfilesContext';
import { useCompletedRecords } from '@/src/state/CompletedRecordsContext';
import { colors } from '@/src/theme/colors';

export default function StampMapScreen() {
  const {
    completedRecords,
    getStampProgressItems,
    refreshCompletedRecords,
  } = useCompletedRecords();
  const { children } = useChildProfiles();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const activeChildId =
    children.length > 0 ? selectedChildId ?? children[0].id : null;
  const visibleCompletedRecords = activeChildId
    ? completedRecords.filter((record) => record.childId === activeChildId)
    : completedRecords;
  const stampItems = getStampProgressItems(visibleCompletedRecords);
  const collectedCount = stampItems.filter((item) => item.collected).length;
  const orderedStampItems = [...stampItems].sort(
    (first, second) =>
      Number(second.collected) - Number(first.collected) ||
      second.completedCount - first.completedCount,
  );

  useEffect(() => {
    if (children.length === 0) {
      setSelectedChildId(null);
      return;
    }

    if (
      !selectedChildId ||
      !children.some((child) => child.id === selectedChildId)
    ) {
      setSelectedChildId(children[0].id);
    }
  }, [children, selectedChildId]);

  useFocusEffect(
    useCallback(() => {
      refreshCompletedRecords();
    }, [refreshCompletedRecords]),
  );

  return (
    <ScreenShell>
      <View style={styles.header}>
        <Text style={styles.title}>나라 스탬프</Text>
        <Text style={styles.subtitle}>
          문화교류를 완료한 나라의 스탬프를 모아봐요.
        </Text>
      </View>

      {children.length > 1 ? (
        <ScrollView
          horizontal
          style={styles.childSelectorScroll}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.childSelector}
        >
          {children.map((child) => {
            const isSelected = child.id === activeChildId;

            return (
              <Pressable
                key={child.id}
                onPress={() => setSelectedChildId(child.id)}
                style={[
                  styles.childChip,
                  isSelected && styles.childChipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.childChipText,
                    isSelected && styles.childChipTextSelected,
                  ]}
                >
                  {child.fullName}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      ) : null}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>STAMP BOARD</Text>
        <Text style={styles.summaryTitle}>{collectedCount}개 나라 경험 완료</Text>
      </View>

      <View style={styles.stampGrid}>
        {orderedStampItems.map((stamp, index) => {
          const isThirdItem = (index + 1) % 3 === 0;

          return (
            <View
              key={stamp.id}
              style={[
                styles.stampCard,
                !isThirdItem && styles.stampCardGap,
                !stamp.collected && styles.lockedStampCard,
              ]}
            >
              <Text style={[styles.flag, !stamp.collected && styles.lockedFlag]}>
                {stamp.flag}
              </Text>

              <Text
                style={styles.country}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.82}
              >
                {stamp.country}
              </Text>

              <Text
                style={[
                  styles.stampState,
                  stamp.collected && styles.collectedState,
                ]}
              >
                {stamp.collected ? `${stamp.completedCount}회 완료` : '미획득'}
              </Text>
            </View>
          );
        })}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    color: colors.navy,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '700',
  },
  childSelector: {
    alignItems: 'center',
    gap: 8,
    paddingRight: 4,
  },
  childSelectorScroll: {
    flexGrow: 0,
    height: 48,
    marginBottom: 16,
  },
  childChip: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.74)',
    borderColor: 'rgba(255,255,255,0.88)',
    borderRadius: 24,
    borderWidth: 1,
    height: 46,
    justifyContent: 'center',
    minWidth: 92,
    paddingHorizontal: 18,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  childChipSelected: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
    shadowOpacity: 0.13,
  },
  childChipText: {
    color: colors.navySoft,
    fontSize: 14,
    fontWeight: '900',
  },
  childChipTextSelected: {
    color: colors.white,
  },
  summaryCard: {
    backgroundColor: '#F6F8FC',
    borderRadius: 28,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E3E8F2',
  },
  summaryLabel: {
    color: '#7B89A6',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  summaryTitle: {
    color: colors.navy,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.6,
  },
  stampGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  stampCard: {
    width: '30.66%',
    minHeight: 132,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 24,
    backgroundColor: colors.cardSolid,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.92)',
    marginBottom: 12,
  },
  stampCardGap: {
    marginRight: '4.01%',
  },
  lockedStampCard: {
    opacity: 0.62,
  },
  flag: {
    fontSize: 30,
    marginBottom: 10,
  },
  lockedFlag: {
    opacity: 0.58,
  },
  country: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 6,
    textAlign: 'center',
    lineHeight: 18,
  },
  stampState: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
  collectedState: {
    color: colors.green,
  },
});
