// BarcodeScanner.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../store/cartSlice';
import { getProducts } from '../../store/productSlice';
const BarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState('');
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(getProducts());
    }
  }, [dispatch, productStatus]);

  const addToCartHandler = () => {
    console.log("selected Proudcts", product)
    dispatch(addItemToCart([product]));
  };
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcodeData(data);
    Alert.alert('Add Item', `Barcode: ${data}`, [{ text: 'OK', onPress: () => addToCartHandler() }]);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
      // showFrame={true}
      //     scanBarcode={true}
        //   laserColor={'#FF3D00'}
        //   frameColor={'#00C853'}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.scannerFrame}>
      <Text style={styles.barcodeText}>Barcode : {barcodeData}</Text>
      {scanned && <Button title="" onPress={() => setScanned(false)} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    //width: '100%',
  },
  barcodeText: {
    position: 'absolute',
    bottom: 200,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    padding:10,
    backgroundColor:'rgba(255, 148, 112, 0.7)',
    
  },
  scannerFrame: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
    borderWidth: 8,
    borderColor: '#FF6D1A',
    borderRadius: 10,
  },
});

export default BarcodeScanner;
