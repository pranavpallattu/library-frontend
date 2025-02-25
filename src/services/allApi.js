import { serverurl } from './serverurl';
import { commonApi } from './commonApi';




export const addBookApi=async(reqBody)=>{
    return await commonApi("POST",`${serverurl}/books`,reqBody)
 }

 export const getBookDetailsApi=async()=>{
    return await commonApi("GET",`${serverurl}/books`,"")
 }

 export const deleteBookApi=async(id)=>{
    return await commonApi("DELETE",`${serverurl}/books/${id}`,{})
 }

 export const getUserDetailsApi = async (userId) => {
   return await commonApi("GET", `${serverurl}/Users/${userId}`, "");
}

 export const updateUserBorrowedBooksApi = async (userId, updatedUserData) => {
   return await commonApi("PUT", `${serverurl}/Users/${userId}`, updatedUserData);
}
// Update a specific book by ID
export const editBookApi = async (id, updatedBookData) => {
   return await commonApi("PUT", `${serverurl}/books/${id}`, updatedBookData);
 };
 
