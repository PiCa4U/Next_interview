export interface IMoviesResponse {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IMovie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IMovieDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: Collection;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: Country[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Language[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Collection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface Country {
    iso_3166_1: string;
    name: string;
}

export interface Language {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface IMovieVideo {
    id: number;
    results: VideoResult[];
}

export interface VideoResult {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface IId {
    id: number;
    rating: number;
    data:IMovieCard
}

export interface IMovieCard {
    id:number;
    title:string;
    poster_path?: string | null;
    vote_count: number;
    release_date?: string;
    vote_average?:number;
    genre_ids?: number[];

}



export interface IGenre {
    id: number;
    name: string;
}

export interface IGenreResponse {
    genres: IGenre[];
}

export interface IMovieFilter {
    page: number;
    with_genres?:  string[];
    'primary_release_year'?:number;
    'vote_average.gte'?:number;
    'vote_average.lte'?:number;
    sort_by?:string
}

export interface IMovieFilterUpdate {
    page?: number;
    with_genres?:  string[] | number[];
    'primary_release_year'?:number;
    'vote_average.gte'?:number;
    'vote_average.lte'?:number;
    sort_by?:string
}

