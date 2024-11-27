import axios from "axios";

const getListProduct = async (pageNo, pageSize = 24, sortBy, sortDir) => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1/products", {
      params: {
        pageNo,
        pageSize,
        sortBy,
        sortDir,
      },
    });
    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    
  }
};

const getProductById = async (productId) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/products/${productId}`
    );
    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};



const createProduct = async (product) => {
  let data = product;
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/products",
      data
    );
    if (res && res.data) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};

const updateProductById = async (product, id) => {
  let data = product;

  

  try {
    const res = await axios.put(
      `http://localhost:8080/api/v1/products/${id}`,
      data
    );
    if (res && res.data) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};
const deleteProductById = async (id) => {
  
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/v1/products/${id}`
    );
    if (res && res.data) {
      return res;
    }
  } catch (error) {
    return error.response;
  }
};
const searchProductByName = async (name, pageNo, pageSize) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/products/search?name=${name}`,
      {
        params: {
          pageNo,
          pageSize,
        },
      }
    );
    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export { getListProduct, getProductById,createProduct,updateProductById,deleteProductById,searchProductByName };
