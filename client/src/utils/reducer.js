export const initialState = {
  cart: [],
  list: [],
  address: {},
};

export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      let newCart = [...state.cart];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) because it's not in the cart.`
        );
      }

      return {
        ...state,
        cart: newCart,
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        list: [...state.list, action.item],
      };

    case "REMOVE_FROM_WISHLIST":
      const i = state.list.findIndex((listItem) => listItem.id === action.id);
      let newWishlist = [...state.list];
      if (i >= 0) {
        newWishlist.splice(i, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) because it's not in the cart.`
        );
      }

      return {
        ...state,
        list: newWishlist,
      };

    case "SET_ADDRESS":
      return {
        ...state,
        address: { ...action.item },
      };

      // case "SET_USER":
      // return {
      //   ...state,
      //   user: action.user,
      // };

    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default reducer;
