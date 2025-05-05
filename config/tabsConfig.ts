import { ArrowRightLeft, BarChart3, Home, Plus, User } from "lucide-react-native";

export const tabsConfig: TabConfig[] = [
  {
    name: 'Home',
    icon: Home,
    href: '/(app)/(tabs)',
  },
  {
    name: 'Transactions',
    icon: ArrowRightLeft,
    href: '/(app)/(tabs)/transactions',
  },
  {
    name: 'Report',
    icon: BarChart3,
    href: '/(app)/(tabs)/report',
  },
  {
    name: 'Profile',
    icon: User,
    href: '/(app)/(tabs)/profile',
  },
]