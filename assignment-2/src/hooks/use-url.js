// import { useEffect, useMemo } from 'react';
// import { useLocation, useSearchParams } from 'react-router-dom';
// import { removeEmpty } from 'lib/utils';

// const useUrl = (initParams) => {
//   const [searchParams, setSearchPrams] = useSearchParams();

//   const location = useLocation();

//   const params = Object.fromEntries([...searchParams]);

//   const pathName = location.pathname;

//   const objQueries = useMemo(() => {
//     const result = {
//       page: 1,
//       limit: 10,
//       ...params,
//     };

//     return removeEmpty(result);
//   }, [params]);

//   const setQueries = (queries) => {
//     setSearchPrams({ ...initParams, ...objQueries, ...queries });
//   };

//   const selectOptions = (value, option, filed) => {
//     setQueries({ [filed]: value });
//   };

//   useEffect(() => {
//     setQueries({ ...initParams });
//   }, []);

//   return {
//     pathName,
//     objQueries,
//     setQueries,
//     selectOptions,
//   };
// };

// export default useUrl;
