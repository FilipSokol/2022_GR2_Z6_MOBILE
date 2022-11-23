import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext, responseProps } from '../context/authModel';

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

const HomeScreen = () => {
  const { logout, userInfo }: any = useContext(AuthContext);

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    userInfo ? setUserRole(getUserInfo(userInfo)) : null;
  }, [userInfo]);
  return (
    <View style={styles.view}>
      {/* <Button
        title="Logout"
        onPress={() => {
          logout();
        }}
      /> */}
      <Text>{userRole}</Text>
    </View>
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
