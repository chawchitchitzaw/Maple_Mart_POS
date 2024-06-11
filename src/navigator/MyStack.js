import {createStackNavigator} from '@react-navigation/stack';
import Bottomnavigator from './Bottomnavigator';
import Login from '../Screens/Login/Login';
import Profile from '../Screens/Profile/Profile';
import View_Profile from '../Screens/Profile/View_Profile';
import Change_Password from '../Screens/Profile/Change_Password';
import Edit_Profile from '../Screens/Profile/Edit_Profile';
import Back from '../component/Back/Back';
import Doo from '../Screens/Profile/Doo';
import category from '../Screens/category';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Bottomnavigator" component={Bottomnavigator} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="View_Profile" component={View_Profile} />
      <Stack.Screen name="Change_Password" component={Change_Password} />
      <Stack.Screen name="Edit_Profile" component={Edit_Profile} />
      <Stack.Screen name="Back" component={Back} />
      <Stack.Screen name="Doo" component={Doo} />
      <Stack.Screen name="category" component={category} />
    </Stack.Navigator>
  );
}
export default MyStack;
