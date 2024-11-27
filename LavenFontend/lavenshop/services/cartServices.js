import axios from "axios";

export const addToCart = async (
    productItemId,
    productId,
    quantity
) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Auth-User-Id", "1");

    const raw = JSON.stringify({
        productItemId: productItemId,
        productId: productId,
        quantity: quantity,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        const response = await fetch(
          "http://localhost:8080/api/v1/carts",
          requestOptions
        );
    
        const successText = response.text();
        return successText;
      } catch (error) {
        const errorText = error.text();
        return errorText;
      }
};

export const getCart = async () => {
    let config = {
        maxBodyLength: Infinity,
        headers: {
            "X-Auth-User-Id": "1",  
        },
    };

    try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/carts`,
            config
        );

        if (response && response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateCart = async (
    productId,
    productItemId,
    delta
) => {
    let data = JSON.stringify({
        productItemId: productItemId,
        productId: productId,
        delta: delta,
    });

    let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v1/carts",
        headers: {
            "Content-Type": "application/json",
            "X-Auth-User-Id": "1",  
        },
        data: data,
    };

    axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
};

export const deleteCart = async (productId, productItemId) => {
    let data = JSON.stringify({
        productItemId: productItemId,
        productId: productId,
    });

    let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v1/carts",
        headers: {
            "Content-Type": "application/json",
            "X-Auth-User-Id": "1",  
        },
        data: data,
    };
    axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
};
export const deleteAllCart = async () => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/v1/carts/all",
      headers: {
        "X-Auth-User-Id": "1",  
    },
      
    };
    try {
      const response = axios.request(config);
  
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  };