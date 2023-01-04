import { View, Text, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, responseProps } from '../context/authModel';
import HorizontalCard from '../components/HorizontalCard';
import CalendarBlank from '../assets/images/CalendarBlank.svg';
import CaretLeft from '../assets/images/CaretLeft.svg';
import CaretRight from '../assets/images/CaretRight.svg';
import PaperPlane from '../assets/images/PaperPlaneTilt.svg';
import HomeInfoCard from '../components/HomeInfoCard';
import HomeDepartmentInfo from '../components/HomeDepratmentInfo';
import { ScrollView } from 'react-native-gesture-handler';

const getUserInfo = (userInfo: responseProps) => {
  const info =
    userInfo[`http://schemas.microsoft.com/ws/2008/06/identity/claims/role`];
  return info;
};

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
        backgroundColor: '#FDFDFD',
      }}
    >
      <HomeDepartmentInfo />
      <View style={{ margin: 10 }} />
      <HomeInfoCard props={{ name: userName, role: userRole }} />
      <View style={{ margin: 10 }} />
      <HorizontalCard
        props={{
          text: 'Check your Schedule!',
          nav: 'TabOne',
          LeftIcon: CaretLeft,
          RightIcon: CalendarBlank,
        }}
      />
      <View style={{ margin: 10 }} />
      <HorizontalCard
        props={{
          text:
            userRole == 'Student' ? 'Check your Grades!' : 'Check your Groups!',
          nav: 'TabThree',
          LeftIcon: PaperPlane,
          RightIcon: CaretRight,
        }}
      />
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
