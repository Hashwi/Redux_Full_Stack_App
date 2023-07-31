import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

//Action creator fuction
//This one is an alternative to useEffect

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-379a1-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could Not Fetch Cart Data!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData))
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!...",
          message: "Sending Cart Data is Failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart Data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-379a1-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending Cart Data is Failed");
      }
    };

    try {
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!...",
          message: "Sent Cart Data Successfully!",
        })
      );

      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!...",
          message: "Sending Cart Data is Failed!",
        })
      );
    }
  };
};
