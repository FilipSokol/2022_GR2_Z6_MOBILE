import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authModel';
import { getUserInfo } from './HomeScreen';

const HomeDrawer = () => {
  const { userInfo }: any = useContext(AuthContext);

  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    userInfo ? setUserRole(getUserInfo(userInfo)) : null;
    userInfo
      ? setUserName(
          userInfo[
            `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`
          ],
        )
      : null;
    console.log(userInfo);
  }, [userInfo]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>{userName}</Text>
      <Text>{userRole}</Text>
      {/* <Button
        title="Logout"
        onPress={() => {
          logout();
        }}
      /> */}
    </View>
  );
};

export default HomeDrawer;
