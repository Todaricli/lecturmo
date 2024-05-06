// import { useContext, useState, useEffect, useCallback} from "react";
// import { AuthContext } from "../contexts/AuthContextProvider";

// export const useFetchUserDetails = () => {
//   const { user, fetchUserDetails, isUpdateUserLoading } =
//     useContext(AuthContext);
//   const [fetchedUserDetails, setFetchedUserDetails] = useState(false);

//   const checkUser = useCallback(async () => {
//     await fetchUserDetails();
//     setFetchedUserDetails(true);
//   }, [fetchUserDetails]);

//   useEffect(() => {
//     checkUser();
//   }, [checkUser]);

//   useEffect(() => {
//     if (fetchedUserDetails && !isUpdateUserLoading) {
//       return { user };
//     }
//   }, [user, isUpdateUserLoading, fetchedUserDetails]);
//   return { user: null };

// };