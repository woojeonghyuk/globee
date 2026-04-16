import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

import ClassCard from '@/src/components/ClassCard';
import ClassDetailSheet from '@/src/components/ClassDetailSheet';
import ScreenShell from '@/src/components/ScreenShell';
import { ClassItem } from '@/src/data/classes';
import { useApplications } from '@/src/state/ApplicationsContext';
import { useClasses } from '@/src/state/ClassesContext';
import { useChildProfiles } from '@/src/state/ChildProfilesContext';
import { colors } from '@/src/theme/colors';

function getCampusLabel(campus: string) {
  return campus === '서울과기대' ? '서울과학기술대학교' : campus;
}

function isActiveApplicationStatus(status: string) {
  return status === '신청 완료' || status === '확정 대기' || status === '수업 확정';
}

function getClassSortTime(classItem: ClassItem) {
  const date = new Date(classItem.startsAt);

  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

export default function HomeScreen() {
  const { children } = useChildProfiles();
  const { classes, refreshClasses } = useClasses();
  const {
    addApplication,
    applications,
    hasActiveApplication,
    refreshApplications,
  } = useApplications();
  const [selectedCampus, setSelectedCampus] = useState('');
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [selectedChildIds, setSelectedChildIds] = useState<string[]>([]);

  const hiddenCompletedClassIds = useMemo(
    () =>
      new Set(
        applications
          .filter(
            (application) =>
              application.status === '수업 완료' ||
              application.status === '미참여',
          )
          .map((application) => application.classId),
      ),
    [applications],
  );

  const visibleClasses = useMemo(
    () => classes.filter((item) => !hiddenCompletedClassIds.has(item.id)),
    [classes, hiddenCompletedClassIds],
  );

  const campusOptions = useMemo(
    () =>
      Array.from(
        new Set(visibleClasses.map((item) => item.campus).filter(Boolean)),
      ),
    [visibleClasses],
  );

  useEffect(() => {
    if (campusOptions.length === 0) {
      setSelectedCampus('');
      return;
    }

    if (!campusOptions.includes(selectedCampus)) {
      setSelectedCampus(campusOptions[0]);
    }
  }, [campusOptions, selectedCampus]);

  const filteredClasses = useMemo(
    () =>
      (selectedCampus
        ? visibleClasses.filter((item) => item.campus === selectedCampus)
        : visibleClasses
      ).sort((first, second) => getClassSortTime(first) - getClassSortTime(second)),
    [selectedCampus, visibleClasses],
  );

  useFocusEffect(
    useCallback(() => {
      refreshClasses();
      refreshApplications();

      const intervalId = setInterval(() => {
        refreshClasses();
        refreshApplications();
      }, 5000);

      return () => clearInterval(intervalId);
    }, [refreshApplications, refreshClasses]),
  );

  const selectedChildren = children.filter((child) =>
    selectedChildIds.includes(child.id),
  );

  const getAppliedChildNames = useCallback(
    (classId: string) =>
      applications
        .filter(
          (application) =>
            application.classId === classId &&
            isActiveApplicationStatus(application.status),
        )
        .map((application) => application.childName)
        .filter(Boolean),
    [applications],
  );

  const getOwnActiveApplicationCount = useCallback(
    (classId: string) =>
      applications.filter(
        (application) =>
          application.classId === classId &&
          isActiveApplicationStatus(application.status),
      ).length,
    [applications],
  );

  const getReservedCount = useCallback(
    (classItem: ClassItem) =>
      Math.max(classItem.seatsTaken, getOwnActiveApplicationCount(classItem.id)),
    [getOwnActiveApplicationCount],
  );

  const getSeatsRemaining = useCallback(
    (classItem: ClassItem) =>
      Math.max(classItem.seatsTotal - getReservedCount(classItem), 0),
    [getReservedCount],
  );

  const getSeatsLabel = useCallback(
    (classItem: ClassItem) => {
      const remaining = getSeatsRemaining(classItem);

      return remaining > 0 ? `${remaining}자리 남음` : '마감';
    },
    [getSeatsRemaining],
  );

  const getCapacityText = useCallback(
    (classItem: ClassItem) =>
      `${Math.min(getReservedCount(classItem), classItem.seatsTotal)}/${
        classItem.seatsTotal
      }명`,
    [getReservedCount],
  );

  const getAppliedBadges = useCallback(
    (classId: string) => {
      const names = Array.from(new Set(getAppliedChildNames(classId)));

      if (names.length <= 2) {
        return names.map((name) => `${name} 신청완료`);
      }

      return [`${names[0]}, ${names[1]} 외 ${names.length - 2}명 신청완료`];
    },
    [getAppliedChildNames],
  );

  const openClassDetail = (classItem: ClassItem) => {
    const firstAvailableChild = children.find(
      (child) => !hasActiveApplication(classItem.id, child.id),
    );

    setSelectedClass(classItem);
    setSelectedChildIds(firstAvailableChild ? [firstAvailableChild.id] : []);
  };

  const closeClassDetail = () => {
    setSelectedClass(null);
    setSelectedChildIds([]);
  };

  const toggleChild = (childId: string) => {
    if (selectedClass && hasActiveApplication(selectedClass.id, childId)) return;

    setSelectedChildIds((prev) =>
      prev.includes(childId)
        ? prev.filter((id) => id !== childId)
        : [...prev, childId],
    );
  };

  const goToMyPage = () => {
    closeClassDetail();
    router.push('/(tabs)/my');
  };

  const handleApply = async () => {
    if (!selectedClass) return;

    const remainingSeats = getSeatsRemaining(selectedClass);

    if (remainingSeats === 0) {
      Alert.alert('마감된 수업이에요', '이 수업은 신청 가능한 자리가 없어요.');
      return;
    }

    if (selectedChildren.length === 0) {
      if (children.length > 0) {
        const allChildrenAlreadyApplied = children.every((child) =>
          hasActiveApplication(selectedClass.id, child.id),
        );

        if (allChildrenAlreadyApplied) {
          Alert.alert(
            '이미 신청한 수업이에요',
            '등록된 아이가 모두 이 수업을 신청했어요.',
          );
          return;
        }

        Alert.alert('아이 선택 필요', '신청할 아이를 선택해주세요.');
        return;
      }

      Alert.alert('아이 등록 필요', '마이페이지에서 아이를 먼저 등록해주세요.');
      return;
    }

    if (selectedChildren.length > remainingSeats) {
      Alert.alert(
        '자리가 부족해요',
        `이 수업은 ${remainingSeats}자리만 남아 있어요.`,
      );
      return;
    }

    const alreadyAppliedChildren = selectedChildren.filter((child) =>
      hasActiveApplication(selectedClass.id, child.id),
    );

    if (alreadyAppliedChildren.length > 0) {
      Alert.alert(
        '이미 신청한 수업이에요',
        `${alreadyAppliedChildren
          .map((child) => child.fullName)
          .join(', ')} 아이는 이미 이 수업을 신청했어요.`,
      );
      return;
    }

    const appliedNames: string[] = [];
    const skippedNames: string[] = [];

    try {
      for (const child of selectedChildren) {
        const applied = await addApplication({
          classId: selectedClass.id,
          childId: child.id,
          childName: child.fullName,
          status: '신청 완료',
        });

        if (applied) {
          appliedNames.push(child.fullName);
        } else {
          skippedNames.push(child.fullName);
        }
      }
    } catch (error) {
      refreshApplications();
      refreshClasses();

      const message =
        error instanceof Error
          ? error.message
          : '수업 신청을 저장하지 못했어요. 잠시 후 다시 시도해주세요.';
      const partialMessage =
        appliedNames.length > 0
          ? `${appliedNames.join(', ')} 아이는 신청됐고, 나머지 신청 중 문제가 생겼어요.\n${message}`
          : message;

      Alert.alert(
        appliedNames.length > 0 ? '일부 신청 완료' : '신청 실패',
        partialMessage,
      );
      return;
    }

    refreshApplications();
    refreshClasses();

    if (appliedNames.length === 0) {
      Alert.alert('이미 신청한 수업이에요', '선택한 아이가 이미 이 수업을 신청했어요.');
      return;
    }

    Alert.alert(
      '신청 완료',
      `${appliedNames.join(', ')} 아이로 ${selectedClass.country} 수업을 신청했어요.${
        skippedNames.length > 0
          ? `\n이미 신청된 아이: ${skippedNames.join(', ')}`
          : ''
      }`,
      [{ text: '확인', onPress: closeClassDetail }],
    );
  };

  return (
    <ScreenShell>
      <View style={styles.header}>
        <Text style={styles.brand}>Globee</Text>
        <Text style={styles.title}>동네에서 떠나는 세계여행{'\n'}오늘 가볼 나라는 어디일까요?</Text>
      </View>

      <View style={styles.schoolSection}>
        <Text style={styles.sectionLabel}>학교 선택하기</Text>
        <View style={styles.schoolRow}>
          {campusOptions.map((campus) => {
            const isActive = campus === selectedCampus;

            return (
              <Pressable
                key={campus}
                style={[styles.schoolChip, isActive && styles.activeSchoolChip]}
                onPress={() => setSelectedCampus(campus)}
              >
                <Text
                  style={[
                    styles.schoolChipText,
                    isActive && styles.activeSchoolChipText,
                  ]}
                >
                  {getCampusLabel(campus)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.classSection}>
        <View style={styles.classHeader}>
          <Text style={styles.classHeaderTitle}>오늘의 여행가능한 곳</Text>
          <Text style={styles.classHeaderCount}>{filteredClasses.length}개</Text>
        </View>

        <View style={styles.cardList}>
          {filteredClasses.map((item) => (
            <ClassCard
              key={item.id}
              item={item}
              badges={getAppliedBadges(item.id)}
              seatsFull={getSeatsRemaining(item) === 0}
              seatsLabel={getSeatsLabel(item)}
              onPress={() => openClassDetail(item)}
            />
          ))}
        </View>

        {filteredClasses.length === 0 ? (
          <View style={styles.emptyClassCard}>
            <Text style={styles.emptyClassTitle}>여행지를 개발중이에요~</Text>
            <Text style={styles.emptyClassText}>
              여행지가 완성되면 바로 보여드릴께요.
            </Text>
          </View>
        ) : null}
      </View>

      <ClassDetailSheet
        visible={selectedClass !== null}
        classItem={selectedClass}
        capacityText={selectedClass ? getCapacityText(selectedClass) : undefined}
        onClose={closeClassDetail}
        action={
          <Pressable
            style={({ pressed }) => [
              styles.applyButton,
              (selectedChildren.length === 0 ||
                (selectedClass ? getSeatsRemaining(selectedClass) === 0 : false)) &&
                styles.applyButtonDisabled,
              pressed &&
                selectedChildren.length > 0 &&
                !(selectedClass ? getSeatsRemaining(selectedClass) === 0 : false) &&
                styles.pressed,
            ]}
            onPress={handleApply}
          >
            <Text style={styles.applyButtonText}>
              {selectedClass && getSeatsRemaining(selectedClass) === 0
                ? '마감된 수업'
                : selectedChildren.length > 1
                ? `${selectedChildren.length}명 신청하기`
                : '신청하기'}
            </Text>
          </Pressable>
        }
      >
        <View style={styles.childSelectSection}>
          <Text style={styles.childSelectTitle}>신청할 아이</Text>

          {children.length > 0 ? (
            <View style={styles.childChipRow}>
              {children.map((child) => {
                const isActive = selectedChildIds.includes(child.id);
                const alreadyApplied = selectedClass
                  ? hasActiveApplication(selectedClass.id, child.id)
                  : false;

                return (
                  <Pressable
                    key={child.id}
                    style={[
                      styles.childChip,
                      isActive && styles.activeChildChip,
                      !isActive && styles.inactiveChildChip,
                      alreadyApplied && styles.appliedChildChip,
                    ]}
                    onPress={() => toggleChild(child.id)}
                  >
                    <Text
                      style={[
                        styles.childChipText,
                        isActive && styles.activeChildChipText,
                        alreadyApplied && styles.appliedChildChipText,
                      ]}
                    >
                      {alreadyApplied
                        ? `${child.fullName} 신청완료`
                        : child.fullName}
                    </Text>
                  </Pressable>
                );
              })}

              <Pressable style={styles.addChildChip} onPress={goToMyPage}>
                <Text style={styles.addChildChipText}>+ 아이 추가</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.emptyChildBox}>
              <Text style={styles.emptyChildText}>
                등록된 아이가 없어요. 마이페이지에서 먼저 아이를 등록해주세요.
              </Text>
              <Pressable style={styles.goMyButton} onPress={goToMyPage}>
                <Text style={styles.goMyButtonText}>마이페이지로 가기</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ClassDetailSheet>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 28,
  },
  brand: {
    color: colors.orange,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 10,
  },
  title: {
    color: colors.navy,
    fontSize: 31,
    lineHeight: 38,
    fontWeight: '900',
    letterSpacing: 0,
  },
  schoolSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  schoolRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  schoolChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.66)',
    borderWidth: 1,
    borderColor: colors.line,
  },
  activeSchoolChip: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  schoolChipText: {
    color: colors.navySoft,
    fontSize: 13,
    fontWeight: '900',
  },
  activeSchoolChipText: {
    color: colors.white,
  },
  classSection: {
    marginBottom: 12,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  classHeaderTitle: {
    color: colors.navy,
    fontSize: 22,
    fontWeight: '900',
  },
  classHeaderCount: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '900',
  },
  cardList: {
    gap: 14,
  },
  emptyClassCard: {
    padding: 22,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.86)',
    alignItems: 'center',
    marginTop: 14,
  },
  emptyClassTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 7,
  },
  emptyClassText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 20,
  },
  childSelectSection: {
    marginBottom: 18,
  },
  childSelectTitle: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 10,
  },
  childChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  childChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  activeChildChip: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  inactiveChildChip: {
    opacity: 0.42,
  },
  appliedChildChip: {
    backgroundColor: colors.mint,
    borderColor: colors.mint,
    opacity: 1,
  },
  childChipText: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: '900',
  },
  activeChildChipText: {
    color: colors.white,
  },
  appliedChildChipText: {
    color: colors.green,
  },
  addChildChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.honey,
  },
  addChildChipText: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: '900',
  },
  emptyChildBox: {
    padding: 15,
    borderRadius: 22,
    backgroundColor: colors.white,
    gap: 12,
  },
  emptyChildText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '700',
  },
  goMyButton: {
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.honey,
  },
  goMyButtonText: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '900',
  },
  applyButton: {
    height: 58,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.navy,
  },
  applyButtonDisabled: {
    opacity: 0.42,
  },
  applyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
