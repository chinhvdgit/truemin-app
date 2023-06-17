// const ROOT_URL = process.env.ROOT_API

// export const ROOT_URL = 'https://172.16.4.163:5001';
export const ROOT_URL = 'https://localhost:5003';
export const ROOT_API = `${ROOT_URL}${'/api'}`;

// account
export const API_IDENTITY_AUTHENTICATE ='identity/authenticate';
export const API_IDENTITY_REVOKE_TOKEN ='identity/revoke-token';
export const API_IDENTITY_REFRESH_TOKEN ='identity/refresh-token';
export const API_IDENTITY_GET_TOKEN ='identity/token';
export const API_IDENTITY_VERIFY_TOKEN ='identity/verify-token';

//product
export const API_PRODUCT ='v1/Product';
export const API_PRODUCT_GET = `${API_PRODUCT}`;

// dictionary
export const API_DICTIONARY ='dictionary';
export const API_DICTIONARY_GET_INFO =`${API_DICTIONARY}/getDictionaryInfo`;
export const API_DICTIONARY_SEARCH =`${API_DICTIONARY}/search`;
export const API_DICTIONARY_DELETE =`${API_DICTIONARY}/delete`;
export const API_DICTIONARY_LOOKUP =`${API_DICTIONARY}/lookup`;
export const API_DICTIONARY_VALID_LOOKUP =`${API_DICTIONARY}/validLookup`;
export const API_DICTIONARY_UPDATE =`${API_DICTIONARY}/update`;

// voucher
export const API_VOUCHER ='voucher';
export const API_VOUCHER_GET_INFO =`${API_VOUCHER}/getVoucherInfo`;
export const API_VOUCHER_SEARCH =`${API_VOUCHER}/search`;
export const API_VOUCHER_DELETE =`${API_VOUCHER}/delete`;
export const API_VOUCHER_LOOKUP =`${API_VOUCHER}/lookup`;
export const API_VOUCHER_GET =`${API_VOUCHER}/get`;
export const API_VOUCHER_GET_VOUCHER_NUMBER =`${API_VOUCHER}/getVoucherNumber`;
export const API_VOUCHER_GET_DM_TRANG_THAI =`${API_VOUCHER}/getDmTrangThai`;
export const API_VOUCHER_CHECK_VOUCHER_NUMBER =`${API_VOUCHER}/checkVoucherNumber`;


// common
export const API_COMMON ='common';
export const API_COMMON_CHECK_DATA_LOCK_DATE =`${API_COMMON}/checkDataLockDate`;
export const API_COMMON_GET_SYSTEM_SETUP =`${API_COMMON}/getSiSetup`;
export const API_COMMON_GET_SYSTEM_VOUCHER_SETUP =`${API_COMMON}/getSiDmCt`;
export const API_COMMON_GET_CUSTOMER_SALE_ORDER_INFO =`${API_COMMON}/getCustomerSaleOrderInfo`;
export const API_COMMON_GET_GIA_BAN =`${API_COMMON}/getGiaBan`;
export const API_COMMON_GET_TON_KHO_TUC_THOI_ALL =`${API_COMMON}/getTonKhoTucThoiAll`;

// system
export const API_SYSTEM ='system';
export const API_SYSTEM_GET_COMPANY_RIGHT =`${API_SYSTEM}/getCompanyRight`;
export const API_SYSTEM_GET_COMPANY_INFO =`${API_SYSTEM}/getCompanyInfo`;
