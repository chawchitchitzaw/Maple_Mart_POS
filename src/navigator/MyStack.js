import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login/Login';
import Bottomnavigator from './Bottomnavigator';
import Home from '../Screens/Home';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Bottomnavigator" component={Bottomnavigator} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
export default MyStack;
