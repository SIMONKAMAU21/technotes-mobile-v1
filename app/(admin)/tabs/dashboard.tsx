import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import HeaderDashboard from '@/components/ui/headerDashbord';
import { HeaderWithIcon } from '@/components/ui/headerWithIcon';
import { useUserData } from '@/utils';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'light';
  const {user} = useUserData()
  console.log('user', user)

  return (
    
    <SafeAreaView className="flex-1 mt-10">
      {/* <HeaderWithIcon title="Dashboard" /> */}
      <HeaderDashboard userName={`welcome ${user?.name}`} isDarkMode={isDarkMode} onThemeToggle={() => {}} userImage={user?.photo} onMenuPress={() => {}} />
    <ScrollView 
      className={` ${isDarkMode ? 'bg-gray-900' : 'bg-white '}`}
      contentContainerClassName="p-2"
    >
      <View className="mb-6">
        <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Dashboard
        </Text>
        <Text className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Welcome to your admin dashboard
        </Text>
      </View>

      <View className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-sm mb-4`}>
        <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Quick Stats
        </Text>
        <Text className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Overview of your system statistics
        </Text>
      </View>

      <View className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-sm`}>
        <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Recent Activity Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt explicabo excepturi odio ducimus doloremque harum laborum aut magni, voluptates, placeat, assumenda qui asperiores. Quae, magnam quibusdam consequatur fugit laborum fuga porro harum, voluptate necessitatibus, laboriosam illo neque! Sunt temporibus eveniet illo ducimus explicabo quia dicta rerum! At corporis illo, dolor voluptatum repudiandae minima officia maiores, dolores dicta, sequi perferendis atque ullam pariatur enim unde eos aliquam! Aspernatur illo itaque quos tempore sit facere eum laudantium sunt! Sunt, ipsa ratione. Porro eveniet nostrum ullam numquam. Eligendi ipsa autem quisquam saepe ea nihil iusto veniam harum? Dignissimos, in? Ratione eligendi totam minus ut quae! Optio nisi beatae sapiente quidem sit fuga! Aliquam blanditiis magnam quibusdam cupiditate asperiores at iste, molestias dicta accusantium sunt rem, unde aut saepe quis et laudantium. Rerum suscipit eum placeat quasi sunt! Qui veritatis quasi minima necessitatibus ex atque maiores excepturi accusantium placeat sit consequuntur cupiditate iure rerum nihil et, molestiae corporis dolor eius quidem nostrum! Iste quae totam, assumenda deleniti ratione consequuntur corrupti. Obcaecati similique saepe officiis nostrum. Culpa vero, ut eaque autem amet, numquam earum dolorem sapiente aperiam temporibus cum voluptatum molestiae ipsum repellat consectetur officiis? Et deserunt adipisci tempora voluptatum labore esse totam quis quia modi. Eos quisquam enim perferendis, nam impedit dignissimos quia ipsam consectetur ea veniam deleniti expedita architecto similique qui, sit repellat repudiandae dicta vitae ut temporibus autem. Iste, modi optio recusandae debitis vel quod officia facere odio maxime, deserunt adipisci amet necessitatibus assumenda impedit repellendus, et quas mollitia corrupti itaque? Sint voluptatem ea exercitationem vero, necessitatibus deserunt voluptatibus doloribus, saepe praesentium modi, totam facere incidunt delectus quidem non vitae excepturi molestiae quam inventore eveniet. Obcaecati quis eos consequatur sed explicabo! Molestiae nihil ad, quod impedit aut, incidunt tempore minus, quo esse qui libero. Voluptate odit voluptas dignissimos quas reiciendis non tempora, magnam accusamus sed explicabo dolores distinctio nemo natus consectetur voluptatum dolorem aspernatur totam sint quisquam obcaecati. Reiciendis quis, animi voluptatem eligendi delectus cupiditate temporibus tempore, est eius explicabo vero? Odit delectus, iusto et facilis quaerat expedita itaque illo eos ullam non earum ipsam velit perspiciatis architecto quis animi eligendi fugit soluta commodi. Nam consequuntur beatae ratione, optio provident doloribus excepturi alias odio aliquam harum, perferendis facilis incidunt nulla veniam voluptas suscipit voluptate! Distinctio fuga molestias, minima deleniti voluptatibus cupiditate quaerat beatae dolores impedit blanditiis nesciunt nihil corporis ratione reprehenderit eius similique eveniet, mollitia rerum non id odit veniam? Unde enim amet natus sed labore odit molestiae autem vel tempora quis. Quam sapiente explicabo facere illo eveniet magnam dolor eum quod, enim tenetur modi possimus, et vero quisquam sed, eos ipsa eaque libero. Hic reiciendis error maiores veniam libero magni quos a recusandae molestias facere nostrum, consequuntur unde impedit, numquam magnam officia perferendis quia exercitationem est esse corrupti. Eaque, non odit tempore facere quos magnam excepturi ducimus vero quasi expedita, ratione, velit nisi incidunt consequuntur. Ex voluptatem maiores tenetur. Dolor nam perferendis nobis eos fuga fugiat aliquam ab neque quibusdam doloremque, illo totam voluptatem labore quisquam eaque maiores reprehenderit laudantium. Cumque delectus ipsa debitis sed, in quas voluptatem tempore quasi nostrum sapiente necessitatibus aspernatur ad modi a quisquam, porro, blanditiis distinctio. Tempore omnis impedit laboriosam quam cumque reprehenderit, provident architecto vero. Autem minus repellat natus eos, a beatae? Quidem omnis minus molestias distinctio ratione, veritatis debitis ut, vero ex ipsam voluptas temporibus excepturi reprehenderit? Natus ipsam magni voluptates modi cumque ad laboriosam veniam blanditiis itaque quidem sint deleniti harum porro amet soluta, dignissimos nihil illum labore quis. Aspernatur tempora cum ab natus sequi pariatur dolore voluptas, autem aperiam iste dicta distinctio praesentium ad unde excepturi totam debitis explicabo, repellendus nemo doloribus impedit! Rerum earum amet atque! Quibusdam nulla minus natus necessitatibus corporis molestias soluta adipisci in, repudiandae sequi dolorem ipsam modi beatae facere eveniet nam explicabo quasi optio dolores cumque tempora distinctio? Maxime cumque veniam nihil corrupti temporibus nisi culpa eum repudiandae numquam commodi ratione expedita a saepe odit nesciunt, labore consequatur tenetur! Voluptates repudiandae laudantium iste distinctio, ullam dolorem soluta numquam aspernatur nihil labore ea a totam consectetur impedit debitis illum quia, tenetur eius nemo atque quibusdam. Vel ut a id suscipit eum dolores reprehenderit quia incidunt, vero enim rem, dolor at neque ex reiciendis nihil quisquam quae labore maxime? Ratione ab eaque sequi maxime non magnam nostrum quae aut libero fugit, quis accusamus delectus voluptatibus. Natus nemo quo eveniet tenetur illo commodi numquam! Reprehenderit soluta esse sit fuga harum inventore cumque dolores quia vel ipsum earum architecto aspernatur modi, delectus neque blanditiis. Rem repellendus itaque quia assumenda necessitatibus ut. Molestiae odio, aliquid officia accusantium quis optio repudiandae! Sequi culpa dolor aut dolore, nisi quidem excepturi officiis architecto quisquam vel? Temporibus architecto iure, inventore quidem exercitationem labore amet, quasi ipsam, consectetur adipisci ad voluptas dolores quibusdam obcaecati eius asperiores numquam perspiciatis deleniti! Doloremque nam odit perspiciatis tempora nemo provident, numquam possimus error fuga facilis sed excepturi, ea ratione autem asperiores animi harum dolore! Accusamus quae, sit a adipisci recusandae fugit distinctio, nesciunt expedita et eaque iure voluptatibus doloribus quam alias consectetur dolorem velit accusantium explicabo itaque architecto sed minus. Quo vel et, unde optio enim voluptate odit repellendus. Eaque harum omnis unde eveniet illum nostrum aut perferendis sequi at alias fugit quod culpa, ab sint, minima aliquid consequatur sit ipsam, expedita delectus porro numquam assumenda officiis. Praesentium id earum dolor aliquam voluptates dolores harum ut odio. Quasi tempora fugiat quas. Voluptatum sequi, soluta, reprehenderit voluptate, eius asperiores est laborum labore exercitationem iure aspernatur illum fuga ab similique dolorem quae? Provident quo iste eos animi. Dolore, ex officiis officia saepe veritatis nostrum quaerat omnis impedit labore! Fuga voluptatem illo reiciendis saepe earum inventore nisi possimus quo! Temporibus incidunt quis ut modi harum iste? Quo ullam error modi qui ipsam omnis, cupiditate laborum aut magnam impedit ut tempora labore repellat pariatur obcaecati iusto, tempore doloremque nobis beatae officia magni nihil unde. Pariatur rerum officia fugiat voluptate quasi provident voluptas laborum eligendi ex beatae rem distinctio, nesciunt magnam explicabo exercitationem inventore qui asperiores, ducimus cum sapiente. In asperiores consequuntur, eum quam dolores vero.
        </Text>
        <Text className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Latest updates and activities
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
