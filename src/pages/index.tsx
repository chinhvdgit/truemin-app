import React, { useEffect, useMemo, useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Input, Page } from "zmp-ui";
import ButtonFixed from "../components/button-fixed/button-fixed";
import ButtonPriceFixed from "../components/button-fixed/button-price-fixed";
import CategoriesStore from "../components/categories-store";
import CardProductHorizontal from "../components/custom-card/card-product-horizontal";
import CardShop from "../components/custom-card/card-shop";

import { filter } from "../constants/referrence";
import { Category, Product } from "../models";
import {
  activeCategoryState,
  activeCateState,
  activeFilterState, 
  cartState,
  cartTotalPriceState,
  categoryState,
  productState,
  searchProductState,
  storeProductResultState,
  storeProductsResultState,
  storeState,
} from "../state";
import { useNavigate } from "react-router-dom";
import useSetHeader from "../hooks/useSetHeader";
import { changeStatusBarColor } from "../services";
import { getConfig } from "../components/config-provider";
import ProductService from "../services/ProductService";
import AccountService from "../services/AccountService";
import { LoginModel } from "../models/LoginModel";

const HomePage: React.FunctionComponent = () => {
  const store = useRecoilValue(storeState);
  const cart = useRecoilValue(cartState);
  const totalPrice = useRecoilValue(cartTotalPriceState);

  const [activeCate, setActiveCate] = useRecoilState<number>(activeCateState);
  const [activeFilter, setActiveFilter] =
    useRecoilState<string>(activeFilterState);
  const storeProductResult = useRecoilValue<Product[]>(storeProductResultState);
  const setSearchProduct = useSetRecoilState(searchProductState);

  const [categories, setCategories] = useRecoilState<Category[]>(categoryState);
  const [activeCategory, setActiveCategory] = useRecoilState<number>(activeCategoryState);
  
  const productsStoreResult = useRecoilValue<Product[]>(storeProductsResultState);
  const setProductsState = useSetRecoilState(productState);

  const navigate = useNavigate();
  const setHeader = useSetHeader();

  const handleInputSearch = useCallback((text: string) => {
    setSearchProduct(text);
  }, []);

  const searchBar = useMemo(
    () => (
      <Input.Search
        placeholder="Tìm kiếm sản phẩm"
        onSearch={handleInputSearch}
        className="cus-input-search" 
      />
    ),
    []
  );

  useEffect(() => {
    setHeader({
      customTitle: getConfig((c) => c.template.searchBar) ? searchBar : "",
      hasLeftIcon: false,
      type: "secondary",
    });
    changeStatusBarColor("secondary");

    loadCategories();
    loadData();
  }, []);

  const loadData = () => {
    
    const service = new ProductService();
    service.getProducts().then(json => {
      setProductsState(json);
    })
    .catch(error => {
      console.log(error);
    });

    // const service = new AccountService();
    // const login: LoginModel = {email: 'superadmin@gmail.com', password: '123Pa$$word!'}; 
    // service.getToken(login);

    // localStorage.setItem('token','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcmFkbWluIiwianRpIjoiZTdmN2VmODUtM2Y5Ni00YmQ3LTk3ZmUtMmVlMTc0MjU1YWVmIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInVpZCI6ImJlMzllYzQzLTRjMTEtNDdkYS05NWE5LTJkZTBlYWNlNGRlYiIsImZpcnN0X25hbWUiOiJNdWtlc2giLCJsYXN0X25hbWUiOiJNdXJ1Z2FuIiwiZnVsbF9uYW1lIjoiTXVrZXNoIE11cnVnYW4iLCJpcCI6IjAuMC4wLjEiLCJyb2xlcyI6WyJBZG1pbiIsIk1vZGVyYXRvciIsIlN1cGVyQWRtaW4iLCJCYXNpYyJdLCJuYmYiOjE2ODY5NzgwODUsImV4cCI6MTY4Njk4MTY4NSwiaXNzIjoiQXNwTmV0Q29yZUhlcm8uQm9pbGVycGxhdGUuQXBpIiwiYXVkIjoiQXNwTmV0Q29yZUhlcm8uQm9pbGVycGxhdGUuQXBpLlVzZXIifQ.ClHIOWg55nlTC9omnv3gQNmN1hGcs1Lr-a0KZiqX9xM');
    // const API_URL = `https://localhost:5003/api/v1/Product?pageNumber=1&pageSize=200`;
    // fetch(API_URL, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Authorization': localStorage.getItem('token') as string
    //     },
    //     body: null
    // })
    // .then(response => response.json())
    // .then(json => {
    //   console.log(json.data);
    //   setProductsState(json.data);
    //   return json;
    // })
    // .catch(error => {
    //   console.log(error);
    // })
    // ;         
    
  }

  
  const loadCategories = () => {
    localStorage.setItem('token','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcmFkbWluIiwianRpIjoiZTdmN2VmODUtM2Y5Ni00YmQ3LTk3ZmUtMmVlMTc0MjU1YWVmIiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInVpZCI6ImJlMzllYzQzLTRjMTEtNDdkYS05NWE5LTJkZTBlYWNlNGRlYiIsImZpcnN0X25hbWUiOiJNdWtlc2giLCJsYXN0X25hbWUiOiJNdXJ1Z2FuIiwiZnVsbF9uYW1lIjoiTXVrZXNoIE11cnVnYW4iLCJpcCI6IjAuMC4wLjEiLCJyb2xlcyI6WyJBZG1pbiIsIk1vZGVyYXRvciIsIlN1cGVyQWRtaW4iLCJCYXNpYyJdLCJuYmYiOjE2ODY5NzgwODUsImV4cCI6MTY4Njk4MTY4NSwiaXNzIjoiQXNwTmV0Q29yZUhlcm8uQm9pbGVycGxhdGUuQXBpIiwiYXVkIjoiQXNwTmV0Q29yZUhlcm8uQm9pbGVycGxhdGUuQXBpLlVzZXIifQ.ClHIOWg55nlTC9omnv3gQNmN1hGcs1Lr-a0KZiqX9xM');
    const API_URL = `https://localhost:5003/api/v1/Category?pageNumber=1&pageSize=200`;
    fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token') as string
        },
        body: null
    })
    .then(response => response.json())
    .then(json => {
      setCategories(json.data);
      return json;
    })
    .catch(error => {
      console.log(error);
    })
    ;                                 

  }

  return (
    <Page>
      {store && storeProductResult && (
        <>
          <div className="bg-primary">
            <CardShop storeInfo={store} />
            <CategoriesStore
              // categories={store.categories!}
              categories={categories}
              activeCate={activeCate}
              setActiveCate={(index) => setActiveCate(index)}
              setActiveCategory={(id) => setActiveCategory(id)}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              filter={filter}
              quantity={storeProductResult.length}
            />
          </div>
          <div className="bg-gray-100 h-3" />
          <div
            className="bg-white p-3"
            style={{ marginBottom: totalPrice > 0 ? "120px" : "0px" }}
          >
            {productsStoreResult.map((product) => (
              <div className=" mb-2 w-full" key={product.id}>
                <CardProductHorizontal
                  pathImg={product.productImg}
                  nameProduct={product.name}
                  salePrice={product.salePrice}
                  retailPrice={product.retailPrice}
                  productId={product.id}
                />
              </div>
            ))}
          </div>
          {totalPrice > 0 && (
            <>
              <ButtonPriceFixed
                quantity={cart.listOrder.length}
                totalPrice={totalPrice}
                handleOnClick={() => {
                  navigate("/finish-order");
                }}
              />
              <ButtonFixed
                listBtn={[
                  {
                    id: 1,
                    content: "Hoàn tất đơn hàng",
                    type: "primary",
                    onClick: () => {
                      navigate("/finish-order");
                    },
                  },
                ]}
                zIndex={99}
              />
            </>
          )}
        </>
      )}
    </Page>
  );
};

export default HomePage;
