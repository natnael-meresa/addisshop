import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_SUCCESS,
} from "../constants/productConstants.js";

export const listProducts = (keyword = '', pageNumber = '', price, category, rating, brand, sort= 'datefield') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    let link = `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}&sort=${sort}`
    
    if (category) {
      link = `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
    }

    if (brand){
      link = `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}&brand=${brand}`
    }
    const { data } = await axios.get(link);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const homeProducts = () => async (dispatch) =>{
//   try{
//     dispatch({type: PRODUCT_HOME_REQUEST});
//     const {data} = await axios.get(`/api/products`)
//   }catch (error) {
//     dispatch({
//       type: PRODUCT_HOME_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }

export const listProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/products/${id}`);
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
     await axios.delete(`/api/products/${id}`, config);
  
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const createProduct = (name, price, image, brand, category, description, countInStock) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
     const {data} = await axios.post(`/api/products`,{
      name, price, image, brand, category, description, countInStock
     }, config);
  
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
 
  export const reviewProduct = (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_REVIEW_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
     await axios.post(`/api/products/${productId}/reviews`, review, config);
  
      dispatch({
        type: PRODUCT_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const listTopProducts = () => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_TOP_REQUEST });
  
      const { data } = await axios.get('/api/products/top');
  
      dispatch({
        type: PRODUCT_TOP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_TOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };