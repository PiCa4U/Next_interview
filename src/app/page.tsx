import {SideBar} from "@/packages/shared/components/Elements/SideBar/SideBar";
import {PaginationBar} from "@/packages/shared/components/Elements/Pagination";

import type {IMovieFilter} from "@/packages/cinema/models/services";
import {MovieCard} from "@/packages/cinema/components/Elements/MovieCard/MovieCard";
import {Filters} from "@/packages/cinema/components/Elements/Filters";
import {getGenres, getMovies} from "@/packages/cinema/services";

import classes from "./page.module.css";

export default async function Home(props: { searchParams: IMovieFilter }) {
    const filters = props.searchParams

    const res = await getMovies({...filters, page: props.searchParams?.page ?? 1});
    const genresData = await getGenres();

    const totalPages = (res?.data.total_pages ?? 0) < 500 ? res?.data.total_pages ?? 0 : 500;
    const page = Number(props.searchParams?.page ?? 1)
    const genres = genresData?.data.genres ?? []

    return (
        <div className={classes.page}>
            <SideBar movies={true} ratedMovies={false}/>
            <main className={classes.main}>
                <Filters genres={genres}/>
                <div className={classes.moviesList}>
                    {res?.data.results.map(item => (<MovieCard key={item.id} data={{
                        id: item.id,
                        release_date: item.release_date,
                        poster_path: item.poster_path,
                        genre_ids: item.genre_ids,
                        vote_average: item.vote_average,
                        vote_count: item.vote_count,
                        title: item.title
                    }} genres={genres}/>))}
                </div>
                <div className={classes.paginationContainer}>
                    <PaginationBar total={totalPages} page={page}/>
                </div>
            </main>
        </div>
    );
}
