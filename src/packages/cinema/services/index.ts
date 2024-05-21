import axios from "axios";
import {
    IMoviesResponse,
    IMovieDetails,
    IMovieVideo,
    IGenreResponse,
    IMovieFilter
} from "@/packages/cinema/models/services";
import qs from "qs";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org',
    timeout: 10000,
    headers:{
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGFmNDI2YTI0NWI4MzAwNjEzOTE1NDJjOGEzOGMyYyIsInN1YiI6IjY2MzhhOGNjY2FhNTA4MDEyYmY1YjRkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bo31ce86NT08Z4h-KTqdjBi2FmjrQIJrjrLjqyWhZT4',
    },
    params:{
        key:'a4af426a245b830061391542c8a38c2c',
    }
});

export const getMovies = async (filter:IMovieFilter) =>{
    const filterString = qs.stringify(filter, { arrayFormat: 'comma' })
   try{return await api.get<IMoviesResponse>(`/3/discover/movie?include_adult=false&include_video=false&language=en-US&${filterString}`)}
    catch(err){console.error(err)}
}

export const getMovieById = async (id:string)=>{
    try{return await api.get<IMovieDetails>(`/3/movie/${id}?language=en-US`)}
    catch(err){console.error(err)}
}

export const getMovieVideo = async (id:string)=>{
    try{return await api.get<IMovieVideo>(`/3/movie/${id}/videos?language=en-US`)}
    catch(err){console.error(err)}
}

export const getGenres = async ()=>{
    try{return await api.get<IGenreResponse>(`/3/genre/movie/list?language=en'`)}
    catch(err){console.error(err)}
}

