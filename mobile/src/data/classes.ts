export type ClassItem = {
  id: string;
  title: string;
  country: string;
  flag: string;
  campus: string;
  category: string;
  teacherName: string;
  targetAge: string;
  startsAt: string;
  schedule: string;
  location: string;
  seatsLeft: number;
  seatsTaken: number;
  seatsTotal: number;
  priceLabel: string;
  badge: string;
  imageColor: string;
  description: string;
};

export type ApplicationItem = {
  id: string;
  classId: string;
  childId: string;
  childName: string;
  status:
    | '신청 완료'
    | '확정 대기'
    | '수업 확정'
    | '수업 완료'
    | '미참여'
    | '신청 취소';
};

export type CompletedClassItem = {
  id: string;
  applicationId: string;
  completedAt: string;
  diary: string;
  teacherComment: string;
};

export type ChildProfile = {
  id: string;
  fullName: string;
  age: number;
  school: string;
  interests: string[];
  note: string;
  gender: 'boy' | 'girl';
};

export type StampItem = {
  id: string;
  country: string;
  flag: string;
};

export type StampProgressItem = StampItem & {
  collected: boolean;
  completedCount: number;
};

export const classItems: ClassItem[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    title: '일본 다도와 간식 문화 체험',
    country: '일본',
    flag: '🇯🇵',
    campus: '서울과학기술대학교',
    category: '문화예절',
    teacherName: 'Yuna',
    targetAge: '8~11세',
    startsAt: '2026-04-18T14:00:00+09:00',
    schedule: '4월 18일 14:00',
    location: '서울과학기술대학교 근처 커뮤니티룸',
    seatsLeft: 3,
    seatsTaken: 3,
    seatsTotal: 6,
    priceLabel: '1회 18,000원',
    badge: '추천',
    imageColor: '#FFE3BA',
    description:
      '일본의 차 문화, 인사법, 계절 간식을 직접 체험하며 아이가 자연스럽게 다른 문화를 이해하도록 돕는 수업입니다.',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    title: '프랑스 미술관 놀이 클래스',
    country: '프랑스',
    flag: '🇫🇷',
    campus: '서울여대',
    category: '미술',
    teacherName: 'Camille',
    targetAge: '7~10세',
    startsAt: '2026-04-19T11:00:00+09:00',
    schedule: '4월 19일 11:00',
    location: '노원 키즈 라운지',
    seatsLeft: 2,
    seatsTaken: 4,
    seatsTotal: 6,
    priceLabel: '1회 20,000원',
    badge: '마감 임박',
    imageColor: '#DDEDFC',
    description:
      '프랑스 대표 그림을 아이 눈높이로 이야기하고, 나만의 작은 전시 포스터를 만들어보는 창의 문화 수업입니다.',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    title: '멕시코 리듬과 축제 이야기',
    country: '멕시코',
    flag: '🇲🇽',
    campus: '광운대',
    category: '음악',
    teacherName: 'Sofia',
    targetAge: '9~12세',
    startsAt: '2026-04-22T17:30:00+09:00',
    schedule: '4월 22일 17:30',
    location: '공릉 문화공간',
    seatsLeft: 5,
    seatsTaken: 1,
    seatsTotal: 6,
    priceLabel: '1회 16,000원',
    badge: '신규',
    imageColor: '#FAD0C4',
    description:
      '멕시코 축제와 음악을 배우고 간단한 리듬 악기를 사용해 함께 연주해보는 밝고 활동적인 수업입니다.',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    title: '베트남 시장과 음식 문화',
    country: '베트남',
    flag: '🇻🇳',
    campus: '서울과학기술대학교',
    category: '음식문화',
    teacherName: 'Linh',
    targetAge: '8~12세',
    startsAt: '2026-04-24T16:30:00+09:00',
    schedule: '4월 24일 16:30',
    location: '중계 키즈 스튜디오',
    seatsLeft: 4,
    seatsTaken: 2,
    seatsTotal: 6,
    priceLabel: '1회 17,000원',
    badge: '인기',
    imageColor: '#DDF4C8',
    description:
      '베트남 시장, 가족 식사 문화, 대표 음식 이야기를 놀이와 퀴즈로 배우는 수업입니다.',
  },
];

export const applicationItems: ApplicationItem[] = [
  {
    id: 'application-completed-1',
    classId: '00000000-0000-0000-0000-000000000004',
    childId: 'child-1',
    childName: '김민준',
    status: '수업 완료',
  },
  {
    id: 'application-completed-2',
    classId: '00000000-0000-0000-0000-000000000003',
    childId: 'child-2',
    childName: '박서아',
    status: '수업 완료',
  },
  {
    id: 'application-1',
    classId: '00000000-0000-0000-0000-000000000001',
    childId: 'child-1',
    childName: '김민준',
    status: '수업 확정',
  },
  {
    id: 'application-2',
    classId: '00000000-0000-0000-0000-000000000002',
    childId: 'child-2',
    childName: '박서아',
    status: '확정 대기',
  },
];

export const completedClassItems: CompletedClassItem[] = [
  {
    id: 'completed-1',
    applicationId: 'application-completed-1',
    completedAt: '2026-04-24',
    diary: '시장 놀이를 하면서 베트남 인사말과 음식 이름을 즐겁게 따라 했어요.',
    teacherComment: '처음 보는 문화에도 호기심이 많고 질문을 적극적으로 해줬어요.',
  },
  {
    id: 'completed-2',
    applicationId: 'application-completed-2',
    completedAt: '2026-04-22',
    diary: '리듬 악기를 직접 흔들고 축제 그림을 색칠하며 수업에 참여했어요.',
    teacherComment: '음악 활동을 특히 좋아해서 다음 문화 수업도 잘 맞을 것 같아요.',
  },
];

export const childProfiles: ChildProfile[] = [
  {
    id: 'child-1',
    fullName: '김민준',
    age: 9,
    school: '공릉초 3학년',
    interests: ['음식', '퀴즈', '만들기'],
    note: '처음 만나는 선생님 앞에서는 조금 낯을 가려요.',
    gender: 'boy',
  },
  {
    id: 'child-2',
    fullName: '박서아',
    age: 11,
    school: '태릉초 1학년',
    interests: ['미술', '음악', '동물'],
    note: '활동적인 수업과 그림 그리기를 좋아해요.',
    gender: 'girl',
  },
];

export const stampItems: StampItem[] = [
  { id: '1', country: '우크라이나', flag: '🇺🇦' },
  { id: '2', country: '프랑스', flag: '🇫🇷' },
  { id: '3', country: '미국', flag: '🇺🇸' },
  { id: '4', country: '인도', flag: '🇮🇳' },
  { id: '5', country: '캐나다', flag: '🇨🇦' },
  { id: '6', country: '리투아니아', flag: '🇱🇹' },
  { id: '7', country: '칠레', flag: '🇨🇱' },

  { id: '8', country: '스페인', flag: '🇪🇸' },
  { id: '9', country: '일본', flag: '🇯🇵' },
  { id: '10', country: '중국', flag: '🇨🇳' },
  { id: '11', country: '독일', flag: '🇩🇪' },
  { id: '12', country: '이탈리아', flag: '🇮🇹' },
  { id: '13', country: '네덜란드', flag: '🇳🇱' },
  { id: '14', country: '스위스', flag: '🇨🇭' },

  { id: '15', country: '러시아', flag: '🇷🇺' },
  { id: '16', country: '베트남', flag: '🇻🇳' },
  { id: '17', country: '남아프리카공화국', flag: '🇿🇦' },
  { id: '18', country: '터키', flag: '🇹🇷' },
  { id: '19', country: '태국', flag: '🇹🇭' },
  { id: '20', country: '덴마크', flag: '🇩🇰' },
  { id: '21', country: '핀란드', flag: '🇫🇮' },

  { id: '22', country: '노르웨이', flag: '🇳🇴' },
  { id: '23', country: '영국', flag: '🇬🇧' },
  { id: '24', country: '호주', flag: '🇦🇺' },
  { id: '25', country: '아르헨티나', flag: '🇦🇷' },
  { id: '26', country: '포르투갈', flag: '🇵🇹' },
  { id: '27', country: '폴란드', flag: '🇵🇱' },
  { id: '28', country: '벨기에', flag: '🇧🇪' },

  { id: '29', country: '인도네시아', flag: '🇮🇩' },
  { id: '30', country: '이란', flag: '🇮🇷' },
  { id: '31', country: '케냐', flag: '🇰🇪' },
  { id: '32', country: '방글라데시', flag: '🇧🇩' },
  { id: '33', country: '말레이시아', flag: '🇲🇾' },
  { id: '34', country: '멕시코', flag: '🇲🇽' },
  { id: '35', country: '브라질', flag: '🇧🇷' },
];

export function getClassById(classId: string) {
  return classItems.find((item) => item.id === classId);
}

export function getApplicationById(applicationId: string) {
  return applicationItems.find((item) => item.id === applicationId);
}

export function getStampItemsWithProgress(
  completedItems: CompletedClassItem[] = completedClassItems,
): StampProgressItem[] {
  const completedByCountry = new Map<
    string,
    { count: number; flag: string; firstClassId: string }
  >();

  completedItems.forEach((completedItem) => {
    const applicationItem = getApplicationById(completedItem.applicationId);
    if (!applicationItem) return;

    const classItem = getClassById(applicationItem.classId);
    if (!classItem) return;

    const current = completedByCountry.get(classItem.country);

    completedByCountry.set(classItem.country, {
      count: (current?.count ?? 0) + 1,
      flag: classItem.flag,
      firstClassId: current?.firstClassId ?? classItem.id,
    });
  });

  const stampCountries = new Set(stampItems.map((stamp) => stamp.country));
  const syncedStampItems = stampItems.map((stamp) => {
    const completedCountry = completedByCountry.get(stamp.country);
    const completedCount = completedCountry?.count ?? 0;

    return {
      ...stamp,
      collected: completedCount > 0,
      completedCount,
    };
  });

  completedByCountry.forEach((completedCountry, country) => {
    if (stampCountries.has(country)) return;

    syncedStampItems.push({
      id: `stamp-${completedCountry.firstClassId}`,
      country,
      flag: completedCountry.flag,
      collected: true,
      completedCount: completedCountry.count,
    });
  });

  return syncedStampItems;
}
