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
import lady from '../../Assets/lady.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import {userData} from './View_Profile';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from '../../component/Back/Back';

const Edit_Profile = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [gender, setGEnder] = useState(userData.gender);
  const [position, setPosition] = useState(userData.position);

  const openCamera = async () => {
    const result = await launchImageLibrary();

    console.log('resp image', result);
    setImgUrl(result.assets[0].uri);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
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
                  source={{uri: imgUrl}}
                  style={{height: '100%', width: '100%'}}
                  resizeMode="contain"
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
              <Icons name="camera" size={30} color={'black'} />
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
                  onChange={setName}
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
                  onChange={setEmail}
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
                  onChange={setPosition}
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
                  onChange={setGEnder}
                />
              </View>
            </View>
          </View>

          <View style={{alignItems: 'flex-end', margin: wp('5%')}}>
            <TouchableOpacity style={styles.savebtn}>
              <Text style={styles.txt2}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
    color: '#000000',
  },
  imageborder: {
    height: wp('30%'),
    width: wp('30%'),
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('100%'),
    overflow: 'hidden',
    padding:wp('3%')
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
    backgroundColor: '#FED8B1',
    borderRadius: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageside: {
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  camera: {
    backgroundColor: '#FED8B1',
    borderRadius: hp('5%'),
    padding: hp('0.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 150,
  },
});
