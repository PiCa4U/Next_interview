import {SideBar} from "@/packages/shared/components/Elements/SideBar/SideBar";

import {getGenres} from "@/packages/cinema/services";
import {MovieCardList} from "@/packages/cinema/components/Elements/MovieCardList/MovieCardList";

import classes from "./ratedMovies.module.css";



export default async function ratedMovies() {
    const genresData = await getGenres();

    const genres = genresData?.data.genres ?? []

    return (
        <main className={classes.page}>
            <div className={classes.main}>
                <SideBar ratedMovies={true} movies={false}/>
                <MovieCardList genres={genres}/>
            </div>
        </main>
    )
}

