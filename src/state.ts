import { createDummyStore } from "./dummy/utils";
import { atom, selector } from "recoil";
import {
  Address,
  HeaderType,
  StoreOrder,
  Product,
  ProductInfoPicked,
  Store,
  Category,
} from "./models";
import { getRandomInt } from "./utils";
import { filter } from "./constants/referrence";

export const storeState = selector<Store>({
  key: "store",
  get: () => {
    return createDummyStore();
  },
});

// export const productState = selector<Product[]>({
//   key: "product",
//   get: ({ get }) => {
//     const store = get(storeState);
//     return store.listProducts;
//   },
// });


export const categoryState = atom<Category[]>({
  key: "category",
  default: [],
});


export const productState = atom<Product[]>({
  key: "product",
  default: [],
});

export const cartState = atom<StoreOrder>({
  key: "cart",
  default: {
    status: "pending",
    listOrder: [],
    date: new Date(),
  },
});

export const cartTotalPriceState = selector<number>({
  key: "cartTotalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    const products = get(productState);
    const result = cart.listOrder.reduce(
      (total, item) =>
        total +
        Number(item.order.quantity) *
          Number(products.find((product) => product.id === item.id)?.salePrice),
      0
    );
    return result;
  },
});

export const headerState = atom<HeaderType>({
  key: "header",
  default: {},
});

export const searchProductState = atom<string>({
  key: "searchProduct",
  default: "",
});

export const activeCategoryState = atom<number>({
  key: "activeCategory",
  default: 0,
});

export const activeCateState = atom<number>({
  key: "activeCate",
  default: 0,
});

export const activeFilterState = atom<string>({
  key: "activeFilter",
  default: filter[0].key,
});


export const storeProductsResultState = selector<Product[]>({
  key: "storeProductsResult",
  get: ({ get }) => {

    console.log('storeProductResultState');

    get(activeCategoryState);
    get(activeCateState);
    get(searchProductState);


    
    const store = get(storeState);
    const pos = getRandomInt(store.listProducts.length - 122, 0);
    const num = getRandomInt(120, 50);

console.log(store.listProducts);

const products = get(productState);

    const categoryId = get(activeCategoryState);
    return [...products].filter((item) => item.categoryId === categoryId);
    // return [...products];
  },
});

export const storeProductResultState = selector<Product[]>({
  key: "storeProductResult",
  get: ({ get }) => {

    console.log('storeProductResultState');

    get(activeCateState);
    get(searchProductState);


    
    const store = get(storeState);
    const pos = getRandomInt(store.listProducts.length - 122, 0);
    const num = getRandomInt(120, 50);

console.log(store.listProducts);


    return [...store.listProducts.slice(pos, pos + num)];
  },
});

// export const storeProductResultState = selector<Product[]>({
//   key: "storeProductResult",
//   get: ({ get }) => {
//     get(activeCateState);
//     get(searchProductState);
//     const store = get(storeState);
//     const pos = getRandomInt(store.listProducts.length - 122, 0);
//     const num = getRandomInt(120, 50);
//     return [...store.listProducts.slice(pos, pos + num)];
//   },
// });

export const addressState = atom<Address>({
  key: "address",
  default: {
    city: "",
    district: "",
    ward: "",
    detail: "",
  },
});

export const openProductPickerState = atom<boolean>({
  key: "openProductPicker",
  default: false,
});

export const initialProductInfoPickedState = {
  productId: -1,
  isUpdate: false,
};

export const productInfoPickedState = atom<ProductInfoPicked>({
  key: "productInfoPicked",
  default: initialProductInfoPickedState,
});
