import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import LayoutScreen from './src/screens/LayoutScreen';

const navigator = createStackNavigator({
  Home: HomeScreen,
  Layout: LayoutScreen
});

export default createAppContainer(navigator);
