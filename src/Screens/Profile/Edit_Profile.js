import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import lady from '../../Assets/lady.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from '../../component/Back/Back';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {login} from '../../Redux/Slice/UserSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Edit_Profile = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.user);
  const [imgUrl, setImgUrl] = useState(userData.profile_url);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [gender, setGEnder] = useState(userData.gender);
  const [position, setPosition] = useState(userData.position);
  const baseUrl = 'http://192.168.100.11/pos-backend/public/api';
  const user = useSelector(state => state.user);
  const token = user.token;
  const dispatch = useDispatch();
  console.log('token', token);
  const openCamera = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
    });

    console.log('open camera result image', result.assets[0].base64);
    setImgUrl(result.assets[0].base64);
  };

  const handleSave = async () => {
    const body = {
      user_id: userData.id,
      name: name,
      email: email,
      gender: gender,
      image: imgUrl,
    };

    console.log('body from edit', body);
    await axios
      .post(`${baseUrl}/account/editProfileApi`, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('res from axios', res.data);
        if (res.data.status === true) {
          dispatch(
            login({
              email: res.data.result[0].email,
              profile_url: res.data.result[0].image,
              id: res.data.result[0].id,
              name: res.data.result[0].name,
              position: res.data.result[0].role,
              gender: res.data.result[0].gender,
              staff_id: res.data.result[0].staff_id,
            }),
          );
        }
      })
      .then(() => navigation.goBack());
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={{flex: 1}}>
            <StatusBar barStyle={'dark-content'} backgroundColor="#FAFAFA" />
            <View>
              <Back lable={'Edit Profile'} />
            </View>

            <View style={styles.imageside}>
              <View style={styles.imageborder}>
                {imgUrl ? (
                  <Image
                    source={{
                      uri: `data:image/png;base64,${imgUrl}`,
                    }}
                    style={{height: '100%', width: '100%', borderRadius: 100}}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={lady}
                    style={{height: '100%', width: '100%'}}
                    resizeMode="contain"
                  />
                )}
              </View>
              <TouchableOpacity style={styles.camera} onPress={openCamera}>
                <Icons name="camera" size={25} color={'#fff'} />
              </TouchableOpacity>
            </View>
            <View>
              <View style={{marginBottom: hp('1%')}}>
                <Text style={styles.txt1}>User Name</Text>
                <View style={styles.box}>
                  <TextInput
                    placeholder="Enter your name"
                    placeholderTextColor="#9C9C9C"
                    style={styles.write}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>
              <View style={{marginBottom: hp('1%')}}>
                <Text style={styles.txt1}>Email</Text>
                <View style={styles.box}>
                  <TextInput
                    placeholder="example@gmail.com"
                    placeholderTextColor="#9C9C9C"
                    style={styles.write}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>
              <View style={{marginBottom: hp('1%')}}>
                <Text style={styles.txt1}>Position</Text>
                <View style={styles.box}>
                  <TextInput
                    placeholder="Enter"
                    placeholderTextColor="#9C9C9C"
                    style={styles.write}
                    value={position}
                    onChangeText={setPosition}
                    editable={false}
                  />
                </View>
              </View>
              <View style={{marginBottom: hp('1%')}}>
                <Text style={styles.txt1}>Gender</Text>
                <View style={styles.box}>
                  <TextInput
                    placeholder="Enter"
                    placeholderTextColor="#9C9C9C"
                    style={styles.write}
                    value={gender}
                    onChangeText={setGEnder}
                  />
                </View>
              </View>
            </View>

            <View style={{alignItems: 'flex-end', margin: wp('5%')}}>
              <TouchableOpacity style={styles.savebtn} onPress={handleSave}>
                <Text style={styles.txt2}>Save</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Edit_Profile;
const styles = StyleSheet.create({
  txt1: {
    fontSize: hp('2.5%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
    marginHorizontal: wp('5%'),
    padding: hp('1%'),
  },
  txt2: {
    fontSize: hp('2%'),
    fontWeight: '500',
    fontFamily: 'DMSans',
    padding: hp('1%'),
    color: '#FFF',
  },
  imageborder: {
    height: wp('30%'),
    width: wp('30%'),
    borderWidth: 1.5,
    borderColor: '#FF6D1A',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('100%'),
    overflow: 'hidden',
    // padding: wp('3%'),
  },
  write: {
    fontSize: hp('2%'),
    fontFamily: 'DMSans',
  },
  box: {
    paddingHorizontal: wp('1%'),
    marginHorizontal: wp('10%'),
    color: '#000000',
    borderBottomWidth: 1,
    borderColor: '#00000080',
  },
  savebtn: {
    width: wp('25%'),
    height: hp('5%'),
    backgroundColor: '#FF6D1A',
    borderRadius: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageside: {
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  camera: {
    backgroundColor: '#FF6D1A',
    borderRadius: hp('5%'),
    padding: hp('.9%'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 150,
  },
});
