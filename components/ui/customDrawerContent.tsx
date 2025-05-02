// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { DrawerContentScrollView } from '@react-navigation/drawer';
// import { Ionicons } from '@expo/vector-icons';
// import { useUserData } from '@/utils';
// import { useRouter } from 'expo-router';

// interface CustomDrawerContentProps {
//   props: any;
// }

// export const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ props }) => {
//   const { user } = useUserData();
//   const router = useRouter();

//   if (!user) return null;

//   const getDrawerItems = () => {
//     switch (user.role) {
//       case 'admin':
//         return [
//           {
//             label: 'Overview',
//             icon: 'home',
//             onPress: () => router.push('/admin' as any),
//           },
//           {
//             label: 'Users',
//             icon: 'people',
//             onPress: () => router.push('/admin/users' as any),
//           },
//           {
//             label: 'Settings',
//             icon: 'settings',
//             onPress: () => router.push('/admin/settings' as any),
//           },
//         ];
//       case 'teacher':
//         return [
//           {
//             label: 'My Classes',
//             icon: 'book',
//             onPress: () => router.push('/teacher/classes' as any),
//           },
//           {
//             label: 'Students',
//             icon: 'people',
//             onPress: () => router.push('/teacher/students' as any),
//           },
//           {
//             label: 'Assignments',
//             icon: 'document-text',
//             onPress: () => router.push('/teacher/assignments' as any),
//           },
//         ];
//       case 'student':
//         return [
//           {
//             label: 'My Courses',
//             icon: 'book',
//             onPress: () => router.push('/student/courses' as any),
//           },
//           {
//             label: 'Assignments',
//             icon: 'document-text',
//             onPress: () => router.push('/student/assignments' as any),
//           },
//           {
//             label: 'Grades',
//             icon: 'bar-chart',
//             onPress: () => router.push('/student/grades' as any),
//           },
//         ];
//       default:
//         return [];
//     }
//   };

//   return (
//     <DrawerContentScrollView {...props}>
//       <View className="p-4 border-b border-gray-200">
//         <View className="flex-row items-center">
//           {user.photo ? (
//             <Image
//               source={{ uri: user.photo }}
//               className="w-12 h-12 rounded-full"
//             />
//           ) : (
//             <View className="w-12 h-12 rounded-full bg-gray-300" />
//           )}
//           <View className="ml-4">
//             <Text className="text-lg font-bold">{user.name}</Text>
//             <Text className="text-gray-500 capitalize">{user.role}</Text>
//           </View>
//         </View>
//       </View>

//       <View className="flex-1">
//         {getDrawerItems().map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={item.onPress}
//             className="flex-row items-center p-4 border-b border-gray-100"
//           >
//             <Ionicons name={item.icon as any} size={24} color="#666" />
//             <Text className="ml-4 text-gray-700">{item.label}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <TouchableOpacity
//         onPress={() => {
//           // Handle logout
//           router.replace('/(auth)/signIn' as any);
//         }}
//         className="flex-row items-center p-4 border-t border-gray-200"
//       >
//         <Ionicons name="log-out-outline" size={24} color="#666" />
//         <Text className="ml-4 text-gray-700">Logout</Text>
//       </TouchableOpacity>
//     </DrawerContentScrollView>
//   );
// }; 