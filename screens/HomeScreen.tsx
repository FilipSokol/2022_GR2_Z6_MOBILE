import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext, responseProps } from '../context/authModel';
import HomeDrawer from './HomeDrawer';

export const getUserInfo = (userInfo: responseProps) => {
  //const userRole = userInfo[`http://schemas.microsoft.com/ws/2008/06/identity/claims/role`]
  //setUserRole()

  // userInfo.forEach((element) => {
  //   console.log(element);
  // });
  const info =
    userInfo[`http://schemas.microsoft.com/ws/2008/06/identity/claims/role`];
  return info;
};

//useEffect(() => {getUserInfo();}, []);
const Drawer = createDrawerNavigator();

export const tgd = (navigation: any) => {
  navigation.toggleDrawer();
};

const HomeScreen = ({ navigation }: any) => {
  const { logout, userInfo }: any = useContext(AuthContext);

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    userInfo ? setUserRole(getUserInfo(userInfo)) : null;
  }, [userInfo]);
  return (
    <Drawer.Navigator
      initialRouteName="homeDrawer"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Close" onPress={() => tgd(props.navigation)} />
            <DrawerItem label="Logout" onPress={() => logout()} />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="homeDrawer"
        component={HomeDrawer}
        options={{ headerShown: false, drawerPosition: 'right' }}
      />

      {/* <Drawer.Screen
        name="home Drawer"
        component={HomeDrawer}
        options={{ headerShown: false, drawerPosition: 'right' }}
      /> */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  view: {
    //flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#FDFDFD',
  },
});

export default HomeScreen;
