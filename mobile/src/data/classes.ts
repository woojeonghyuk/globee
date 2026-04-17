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
    | '신청 확인중'
    | '신청 완료'
    | '확정 대기'
    | '수업 완료'
    | '미참여'
    | '신청 취소';
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

export const stampItems: StampItem[] = [
  { id: '1', country: '멕시코', flag: '🇲🇽' },
  { id: '2', country: '우크라이나', flag: '🇺🇦' },
  { id: '3', country: '프랑스', flag: '🇫🇷' },
  { id: '4', country: '미국', flag: '🇺🇸' },
  { id: '5', country: '인도', flag: '🇮🇳' },
  { id: '6', country: '캐나다', flag: '🇨🇦' },
  { id: '7', country: '리투아니아', flag: '🇱🇹' },
  { id: '8', country: '칠레', flag: '🇨🇱' },
  { id: '9', country: '스페인', flag: '🇪🇸' },
  { id: '10', country: '일본', flag: '🇯🇵' },
  { id: '11', country: '중국', flag: '🇨🇳' },
  { id: '12', country: '독일', flag: '🇩🇪' },
  { id: '13', country: '이탈리아', flag: '🇮🇹' },
  { id: '14', country: '스웨덴', flag: '🇸🇪' },
  { id: '15', country: '스위스', flag: '🇨🇭' },
  { id: '16', country: '러시아', flag: '🇷🇺' },
  { id: '17', country: '베트남', flag: '🇻🇳' },
  { id: '18', country: '남아프리카공화국', flag: '🇿🇦' },
  { id: '19', country: '터키', flag: '🇹🇷' },
  { id: '20', country: '태국', flag: '🇹🇭' },
  { id: '21', country: '덴마크', flag: '🇩🇰' },
  { id: '22', country: '대만', flag: '🇹🇼' },
  { id: '23', country: '노르웨이', flag: '🇳🇴' },
  { id: '24', country: '영국', flag: '🇬🇧' },
  { id: '25', country: '호주', flag: '🇦🇺' },
  { id: '26', country: '아르헨티나', flag: '🇦🇷' },
  { id: '27', country: '모로코', flag: '🇲🇦' },
  { id: '28', country: '이집트', flag: '🇪🇬' },
  { id: '29', country: '벨기에', flag: '🇧🇪' },
  { id: '30', country: '인도네시아', flag: '🇮🇩' },
  { id: '31', country: '이란', flag: '🇮🇷' },
  { id: '32', country: '케냐', flag: '🇰🇪' },
  { id: '33', country: '방글라데시', flag: '🇧🇩' },
  { id: '34', country: '말레이시아', flag: '🇲🇾' },
  { id: '35', country: '브라질', flag: '🇧🇷' },
];
