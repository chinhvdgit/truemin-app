import { createDummyStore } from "./dummy/utils";
import { atom, selector } from "recoil";
import {
  Address,
  HeaderType,
  StoreOrder,
  Product,
  ProductInfoPicked,
  Store,
} from "./models";
import { getRandomInt } from "./utils";
import { filter } from "./constants/referrence";

export const storeState = selector<Store>({
  key: "store",
  get: () => {
    return createDummyStore();
  },
});

export const productState = selector<Product[]>({
  key: "product",
  get: ({ get }) => {
    const store = get(storeState);
    return store.listProducts;
  },
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

export const activeCateState = atom<number>({
  key: "activeCate",
  default: 0,
});

export const activeFilterState = atom<string>({
  key: "activeFilter",
  default: filter[0].key,
});

export const storeProductResultState = selector<Product[]>({
  key: "storeProductResult",
  get: ({ get }) => {
    get(activeCateState);
    get(searchProductState);


    const API_URL = `https://localhost:5003/api/v1/Product?pageNumber=1&pageSize=1`;
    fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcmFkbWluIiwianRpIjoiNzE4ZGYxOTQtYmMyNC00N2JkLTg5NDQtY2M2YWIxOGE5ZDFmIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInVpZCI6ImJlMzllYzQzLTRjMTEtNDdkYS05NWE5LTJkZTBlYWNlNGRlYiIsImZpcnN0X25hbWUiOiJNdWtlc2giLCJsYXN0X25hbWUiOiJNdXJ1Z2FuIiwiZnVsbF9uYW1lIjoiTXVrZXNoIE11cnVnYW4iLCJpcCI6IjAuMC4wLjEiLCJyb2xlcyI6WyJBZG1pbiIsIk1vZGVyYXRvciIsIlN1cGVyQWRtaW4iLCJCYXNpYyJdLCJuYmYiOjE2ODY1NjAyMTgsImV4cCI6MTY4NjU2MzgxOCwiaXNzIjoiQXNwTmV0Q29yZUhlcm8uQm9pbGVycGxhdGUuQXBpIiwiYXVkIjoiQXNwTmV0Q29yZUhlcm8uQm9pbGVycGxhdGUuQXBpLlVzZXIifQ.jDADEXpix37oOym9OVUQFVjMeJVSPdoIKndZCoF8vis'
        },
        body: null
    });                                 


    const store = get(storeState);
    const pos = getRandomInt(store.listProducts.length - 122, 0);
    const num = getRandomInt(120, 50);
    return [...store.listProducts.slice(pos, pos + num)];
  },
});

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
