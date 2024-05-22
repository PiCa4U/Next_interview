'use client'

import {type FC, useMemo, useRef, useState, useEffect} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useLocalStorage} from "usehooks-ts";
import {Button, Pagination, Text, TextInput, Title} from "@mantine/core";

import {IGenre, IId} from "@/packages/cinema/models/services";
import {MovieCard} from "@/packages/cinema/components/Elements/MovieCard/MovieCard";

import {onArraySlice} from "@/packages/shared/utills";

import ratedIcon from '../../../../../../public/pic 2.svg'
import searchIcon from '../../../../../../public/Search.svg'
import classes from "./movieCardList.module.css";

type props = {
    genres: IGenre[]
}

export const MovieCardList: FC<props> = ({genres}) => {
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)
    const [rated] = useLocalStorage('rated movies', [])
    const [page, setPage] = useState<number>(1)
    const [text, setText] = useState('')
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const backHome=()=>{
        router.replace('/')
    }

    const onGetMovieInfo = (id: number) => {
        if (!isMounted) return null;
        const res: IId = (JSON.parse(localStorage.getItem('rated' + id) || '{}'))
        return res.data
    }

    const movies = useMemo(() => (isMounted ? (rated.map(item => onGetMovieInfo(item)) ?? []).filter(movie => movie?.title.toLowerCase().includes(text.toLowerCase())) : []), [text, rated])

    const totalPages = useMemo(() => {
        if (movies.length % 4) {
            return (Math.floor(movies.length / 4) + 1)
        }
        return (movies.length / 4)
    }, [movies])

    const pageMovies = useMemo(() =>
            onArraySlice(page, movies) ?? []
        , [page, movies])

    const onSubmit = () => {
        inputRef.current?.value && setText(inputRef.current?.value)
    }

    if (!isMounted) {
        return null
    }

    return (
        <div className={classes.main}>
            <div className={classes.headerContainer}>
                <Title className={classes.title}>Rated movies</Title>
                <TextInput
                    ref={inputRef}
                    placeholder='Search movie title'
                    leftSectionPointerEvents="none"
                    onSubmit={onSubmit}
                    leftSection={<Image src={searchIcon} alt={'searchIcon'} className={classes.image}/>}
                    classNames={{wrapper: classes.wrapper, input: classes.input}}
                    rightSection={<Button className={classes.button} onClick={onSubmit}>Search</Button>}
                    rightSectionWidth={104}
                />
            </div>
            {rated.length ?
                <div className={classes.container}>
                    <div className={classes.moviesList}>
                        {pageMovies.map((item) => item && <MovieCard data={item} key={item.id} genres={genres}/>)}
                    </div>
                    <div className={classes.paginationContainer}>
                        {totalPages !== 1?<Pagination value={page} total={totalPages}
                                                onChange={setPage}
                                                boundaries={0}
                                                classNames={{control: classes.control, dots: classes.paginationDots}}/>:null}
                    </div>
                </div> :
                <div className={classes.ratedUndefind}>
                    <Image src={ratedIcon} alt={'ratedIcon'} width={400} height={300}/>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <Text className={classes.textRated}>You haven't rated any films yet</Text>
                    <Button onClick={backHome} className={classes.ratedButton}>Find movies</Button>
                </div>
            }
        </div>
    )
}
