import { Pressable } from 'react-native';
import HamburgerMenu from '../assets/images/HamburgerMenu.svg';
import { toggleDrawer } from '../navigation';

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
