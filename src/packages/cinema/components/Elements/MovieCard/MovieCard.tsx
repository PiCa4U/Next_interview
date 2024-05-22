'use client'

import {type FC, useMemo} from "react";
import Image from "next/image";
import Link from 'next/link'

import type {IGenreResponse, IMovieCard} from "@/packages/cinema/models/services";
import {formatNumber} from "@/packages/cinema/utills";

import {RaitingStar} from "@/packages/shared/components/Elements/RaitingStar/RaitingStar";

import posterUndefind from '../../../../../../public/posterUndefind.svg'
import voteStar from '../../../../../../public/voteStar.svg';

import classes from "./moviecard.module.css";
import {Text, Title} from "@mantine/core";


type MovieCardProps = {
    data: IMovieCard;
    genres: IGenreResponse['genres'];
}

export const MovieCard: FC<MovieCardProps> = ({data, genres}) => {
    const voteCount = useMemo(() => formatNumber(data.vote_count), [data.vote_count])

    return (
        <div className={classes.container}>
            <div className={classes.cardInfo}>
                {data.poster_path ?
                    <Image src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                                           alt='poster'
                                           width={119}
                                           height={170}
                    /> :
                    <div className={classes.posterUndefind}>
                        <Image src={posterUndefind}
                               alt={'posterUndefind'}
                               width={57}
                               height={44}
                        />
                    </div>
                }
                <div className={classes.votesInfo}>
                    <div className={classes.textInfo}>
                        <Link href={`/movie/${data.id}`}>
                            <Title className={classes.title}>{data.title}</Title>
                        </Link>
                        <Text className={classes.date}>{data.release_date?.slice(0, 4) ?? null}</Text>
                        <div className={classes.votes}>
                            <Image src={voteStar} alt={'voteStar'}/>
                            <Text className={classes.voteAverage}>{data.vote_average?.toFixed(1) ?? 0}</Text>
                            <Text className={classes.voteCount}>({voteCount})</Text>
                        </div>
                    </div>
                    <div className={classes.genresContainer}>
                        <Text className={classes.genres}>Genres</Text>
                        <Text
                            className={classes.genresMain}>{genres.filter(item => data.genre_ids?.some(id => id == item.id)).slice(0, 2).map(item => item.name).join(', ')}
                        </Text>
                    </div>
                </div>
            </div>
            <RaitingStar data={data}/>
        </div>
    )
}
