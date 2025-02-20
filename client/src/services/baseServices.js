import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const  getToken =() => localStorage.getItem('idigital-bookshow-user');

export const baseAppApi = createApi({
    reducerPath: 'idigital-bookshow',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8082/api",
        headers: () => ({
            'Authorization': `Bearer ${token}`
        })
    }),
    tagTypes: ["MOVIES", "MOVIE" , "THEATRES", "THEATRE", "THEATRE-BY-OWNER", 'SHOWS', "SHOW"],
    endpoints: () => ({})
})