import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cartSlice';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const baseUrl = 'http://192.168.100.11/pos-backend/public/api';

const BarcodeScanner = () => {
  const [products, setProducts] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const token = user.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(`${baseUrl}/product/getProductData`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(productResponse.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
    Alert.alert('Add Item', `Barcode: ${data}`, [{ text: 'OK', onPress: () => setScanned(false) }]);
  };

  const addToCartHandler = (barcode) => {
    const product = products.find(p => p.barcode === barcode);
    if (product) {
      dispatch(addItemToCart(product));
      console.log('Added product to cart:', product);
    } else {
      console.log('Product not found for barcode:', barcode);
      Alert.alert('Error', 'Product not found');
    }
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
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity
        style={styles.scannerFrame}
        onPress={() => addToCartHandler(barcodeData)}
      >
        <Text style={styles.barcodeText}>Barcode: {barcodeData}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodeText: {
    position: 'absolute',
    bottom: 200,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(255, 148, 112, 0.7)',
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
