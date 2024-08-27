import axios from 'axios';
import {useSelector} from 'react-redux';
const baseUrl = 'https://staging.aggademo.me/pos-backend/public/api';
export const fetchProducts = async () => {
  const user = useSelector(state => state.user);
  const token = user.token;
  const productResponse = await axios.get(`${baseUrl}/product/getProductData`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('prudct api resp', productResponse);
  // return productResponse.data[0];
};
