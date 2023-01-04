/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  DrawerActions,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
  ActivityIndicator,
  ColorSchemeName,
  Pressable,
  View,
} from 'react-native';
import DrawerButton from '../components/DrawerButton';

import Colors from '../constants/Colors';
import { AuthContext } from '../context/authModel';
import useColorScheme from '../hooks/useColorScheme';
import Grades from '../screens/Grades';
import HomeDrawer from '../screens/HomeDrawer';
import HomeScreen from '../screens/HomeScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Register from '../screens/Register';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TeacherAllStudents from '../screens/TeacherAllStudents';
import TeacherGroupsScreen from '../screens/TeacherGroupsScreen';
import TeacherGroupStudentsScreen from '../screens/TeacherGroupStudentsScreen';
import UsersThree from '../assets/images/UsersThree.svg';
import {
  RootHomeStackParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import { navigationRef } from './helper';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      ref={navigationRef}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
export const LOGGED = false;
/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
function RootNavigator() {
  //const logged = true;
  const { isLoading, userToken }: string | any = React.useContext(AuthContext);
  if (isLoading) {
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} />
    </View>;
  }
  return (
    <Stack.Navigator>
      {userToken !== null ? (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={({ navigation }) => ({
              headerShown: false,
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Root"
            component={BottomHomeTabNavigator}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="Register" component={BottomHomeTabNavigator} options={{ headerShown: false }} />   */}
        </>
      )}
      {/* <Stack.Screen
        name="Home Drawer"
        component={CreateTopDrawer}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      /> */}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Drawer.Screen name="HomeDrawer" component={HomeDrawer} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ title: 'Subjects', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Grades"
          component={Grades}
          options={{ title: 'Grades', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Students"
          component={TeacherGroupStudentsScreen}
          options={{ title: 'Students', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="allStudents"
          component={TeacherAllStudents}
          options={{ title: 'All Students', headerTitleAlign: 'center' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { userInfo }: string | any = React.useContext(AuthContext);
  return (
    <BottomTab.Navigator
      initialRouteName="TabTwo"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          //headerTitleAlign: 'center',
          title: 'Schedule',
          headerTitleAlign: 'center',
          tabBarActiveBackgroundColor: '#313131',
          headerStyle: {
            backgroundColor: 'stealblue',
          },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => {
          //       null;
          //     }}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}
          //   >
          //     <FontAwesome
          //       name="info-circle"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{ marginRight: 15 }}
          //     />
          //   </Pressable>
          // ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={HomeScreen}
        options={({ navigation }: any) => ({
          title: 'Home',
          headerTitleStyle: {
            //fontFamily: 'Roboto',
            //fontStyle: 'italic',
          },
          headerTitleAlign: 'center',
          headerRight: () => <DrawerButton navigation={navigation} />,
          headerStyle: {
            backgroundColor: '#FDFDFD',
          },
          tabBarActiveBackgroundColor: '#313131',
          tabBarIcon: ({ color }) => <TabBarIcon name="empire" color={color} />,
        })}
      />
      {/* <BottomTab.Screen
        name="HomeDrawer"
        component={CreateTopDrawer}
        headerLeft={null}
        gestureEnabled={false}
        options={{ headerShown: false }}
      /> */}
      {!userInfo?.TeacherId ? (
        <BottomTab.Screen
          name="TabThree"
          component={ModalScreen}
          options={({ navigation }: any) => ({
            title: 'Grades',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'stealblue',
            },
            tabBarActiveBackgroundColor: '#313131',
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="graduation-cap" color={color} />
            ),
          })}
        />
      ) : (
        <BottomTab.Screen
          name="TabThree"
          component={TeacherGroupsScreen}
          options={({ navigation }: any) => ({
            title: 'Group Panel',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'stealblue',
            },
            headerRight: () => (
              <UsersThree
                style={{ marginRight: 20 }}
                onPress={() => {
                  navigation.navigate('allStudents');
                }}
              />
            ),
            tabBarActiveBackgroundColor: '#313131',
            tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
          })}
        />
      )}
    </BottomTab.Navigator>
  );
}

const HomeTab = createBottomTabNavigator<RootHomeStackParamList>();

function BottomHomeTabNavigator() {
  return (
    <HomeTab.Navigator initialRouteName="Login">
      <HomeTab.Screen
        name={'Login'}
        component={TabTwoScreen}
        options={{
          title: 'Login',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'stealblue',
          },
          tabBarActiveBackgroundColor: '#313131',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="university" color={color} />
          ),
        }}
      />
      <HomeTab.Screen
        name={'Register'}
        component={Register}
        options={{
          title: 'Register',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'stealblue',
          },
          tabBarActiveBackgroundColor: '#313131',
          tabBarIcon: ({ color }: any) => (
            <TabBarIcon name="university" color={color} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
}

function CreateTopDrawer() {
  return (
    //<NavigationContainer>
    <Drawer.Navigator initialRouteName="homeDrawer">
      <Drawer.Screen name="homeDrawer" component={HomeDrawer} />
    </Drawer.Navigator>
    //</NavigationContainer>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}
