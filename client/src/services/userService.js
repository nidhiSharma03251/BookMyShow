import { baseAppApi } from "./baseServices";

export const userServices = baseAppApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (payLoad) => ({
                url: '/users/login',
                method: "POST",
                body: payload
            })
        }),
        registerUser: build.mutation({
            query: (payLoad) => ({
                url: '/users/register',
                method: "POST",
                body: payload
            })
        }),
        getAllUsers: build.query({
            query: () => '/users/all-users',
            transformResponse: (apiResponse) => apiResponse.data
        }),
        getUserInfo: build.query({
            query: () => '/users/get-current-user',
            transformResponse: (apiResponse) => apiResponse.data
        }),
    }),
    overrideExisting: false
})

export const {useGetAllUsersQuery, useGetUserInfoQuery, useLoginUserMutation, useRegisterUserMutation} = userServices;