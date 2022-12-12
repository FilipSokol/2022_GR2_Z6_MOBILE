import { DrawerActions } from '@react-navigation/native';
import { Pressable } from 'react-native';
import HamburgerMenu from '../assets/images/HamburgerMenu.svg';
import { navigationRef } from '../navigation/helper';

export function toggleDrawer() {
  navigationRef.current.dispatch(DrawerActions.toggleDrawer());
}

const DrawerButton = () => {
  return (
    <Pressable>
      <HamburgerMenu
        style={{ margin: 20 }}
        onPress={() => {
          //console.log(navigation);
          toggleDrawer();
        }}
      />
    </Pressable>
  );
};

export default DrawerButton;
