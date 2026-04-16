import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { colors } from '@/src/theme/colors';

const tabIcons = {
  home: ['home', 'home-outline'],
  applications: ['receipt', 'receipt-outline'],
  completed: ['albums', 'albums-outline'],
  stamps: ['map', 'map-outline'],
  my: ['person', 'person-outline'],
} as const;

type TabIconName = keyof typeof tabIcons;

function TabIcon({
  name,
  focused,
  color,
  size,
}: {
  name: TabIconName;
  focused: boolean;
  color: string;
  size: number;
}) {
  const [activeIcon, inactiveIcon] = tabIcons[name];

  return (
    <Ionicons
      name={focused ? activeIcon : inactiveIcon}
      color={color}
      size={size}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.navy,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '800',
          marginTop: 2,
        },
        tabBarStyle: {
          height: 74,
          paddingTop: 8,
          paddingBottom: 12,
          backgroundColor: colors.white,
          borderTopColor: colors.line,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '홈',
          tabBarIcon: (props) => <TabIcon name="home" {...props} />,
        }}
      />
      <Tabs.Screen
        name="applications"
        options={{
          title: '신청',
          tabBarIcon: (props) => <TabIcon name="applications" {...props} />,
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          title: '완료',
          tabBarIcon: (props) => <TabIcon name="completed" {...props} />,
        }}
      />
      <Tabs.Screen
        name="stamps"
        options={{
          title: '스탬프',
          tabBarIcon: (props) => <TabIcon name="stamps" {...props} />,
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: '마이',
          tabBarIcon: (props) => <TabIcon name="my" {...props} />,
        }}
      />
    </Tabs>
  );
}
