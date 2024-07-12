import {createStackNavigator} from '@react-navigation/stack';
import Bottomnavigator from './Bottomnavigator';
import Login from '../Screens/Login/Login';
import Profile from '../Screens/Profile/Profile';
import View_Profile from '../Screens/Profile/View_Profile';
import Change_Password from '../Screens/Profile/Change_Password';
import Edit_Profile from '../Screens/Profile/Edit_Profile';
import Back from '../component/Back/Back';
import Amount from '../Screens/Amount/Amount';
import Checkout from '../Screens/Amount/Checkout';
import CashBtn from '../component/Product/CashBtn';
import {useSelector} from 'react-redux';
import category from '../Screens/Items/category';
import Itemdetail from '../Screens/Items/Itemdetail';
import barcode from '../Screens/barcode/barcode';

const Stack = createStackNavigator();

const MyStack = () => {
  const user = useSelector(state => state.user);
  const token = user.token;
  console.log('is there token', token);

  return (
    <Stack.Navigator
      initialRouteName="Bottomnavigator"
      screenOptions={{headerShown: false}}>
      {token == null ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <>
          <Stack.Screen name="Bottomnavigator" component={Bottomnavigator} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="View_Profile" component={View_Profile} />
          <Stack.Screen name="Change_Password" component={Change_Password} />
          <Stack.Screen name="Edit_Profile" component={Edit_Profile} />
          <Stack.Screen name="Back" component={Back} />
          <Stack.Screen name="category" component={category} />
          <Stack.Screen name="Itemdetail" component={Itemdetail} />
          <Stack.Screen name="barcode" component={barcode} />
          <Stack.Screen name="Amount" component={Amount} />
          <Stack.Screen name="CashBtn" component={CashBtn} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </>
      )}
    </Stack.Navigator>
  );
};
export default MyStack;
