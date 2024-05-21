import {getMovieById, getMovieVideo} from "@/packages/cinema/services";

import Image from "next/image";
import Link from "next/link";

import {convertMinutes, formatBudget, formatDate, formatNumber} from "@/packages/cinema/utills";

import {RaitingStar} from "@/packages/shared/components/Elements/RaitingStar/RaitingStar";
import {SideBar} from "@/packages/shared/components/Elements/SideBar/SideBar";

import voteStar from "../../../../public/voteStar.svg";
import companyLogoUndefind from '../../../../public/companyLogoUndefind.svg'
import classes from "./movie.module.css";
import {Text, Title} from "@mantine/core";

export default async function Movie({params}: { params: { id: string } }) {
    const res = await getMovieById(params.id);
    const video = await getMovieVideo(params.id)


    if (!res?.data || !video) {
        //TODO: link 404
        return null;
    }

    const trailer = video.data.results.find(item => item.type.toLowerCase() === "trailer" || item.type.toLowerCase() === "teaser") ?? video.data.results[0];
    const embedUrl = `https://www.youtube.com/embed/${trailer?.key}`;
    const voteCount = formatNumber(res.data?.vote_count ?? 0)
    const voteAverage = res.data.vote_average.toFixed(1)
    const realeaseDate=res.data.release_date ? (formatDate(res.data.release_date)) : 'No information'
    const runtime = convertMinutes(res.data.runtime)
    const budget = formatBudget(res.data.budget)
    const revenue = formatBudget(res.data.revenue)
    const genres = res.data.genres.map(item => item.name).join(', ')
    const description = res.data.overview

    return (
        <main className={classes.page}>
            <SideBar movies={true} ratedMovies={false}/>
            <div className={classes.main}>
                <div className={classes.navigationButtons}>
                    <Link href={`/`}>
                        <Text className={classes.navigationButton}>Movies</Text>
                    </Link>
                    <div>/</div>
                    <Text className={classes.navigationButton}>{res.data.title}</Text>
                </div>
                <div className={classes.raitingMovie}>
                    <div className={classes.container}>
                        <Image src={`https://image.tmdb.org/t/p/original/${res.data.poster_path}`}
                               alt='poster'
                               width={250}
                               height={352}
                        />
                        <div className={classes.movieAllInfo}>
                            <div className={classes.textInfo}>
                                <Title className={classes.title}>{res.data.title}</Title>
                                <Text className={classes.date}>{realeaseDate}</Text>
                                <Text className={classes.votes}>
                                    <Image src={voteStar} alt={'voteStar'}/>
                                    <Text className={classes.voteAverage}>{voteAverage}</Text>
                                    <Text className={classes.voteCount}>({voteCount})</Text>
                                </Text>
                            </div>
                            <div className={classes.movieInfoContainer}>
                                <div className={classes.movieInfoTitle}>
                                    <Text>Duration</Text>
                                    <Text>Premiere</Text>
                                    <Text>Budget</Text>
                                    <Text>Gross worldwide</Text>
                                    <Text>Genres</Text>
                                </div>
                                <div className={classes.movieInfoCounts}>
                                    <Text>{runtime}</Text>
                                    <Text>{realeaseDate}</Text>
                                    <Text>{budget}</Text>
                                    <Text>{revenue}</Text>
                                    <Text>{genres}</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <RaitingStar data={{...res.data, genre_ids:res.data.genres.map(item => item.id)}} />
                    </div>
                </div>
                <div className={classes.movieVideoInfo}>
                    {trailer ? (<div>
                        <Title className={classes.trailerTitle}>Trailer</Title>

                            <iframe
                                src={embedUrl}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                    borderRadius: 9,
                                    width: '100%',
                                    maxWidth: 500,
                                    aspectRatio: 1.6
                                }}
                                title={trailer?.key}
                            />

                    </div>) : null}
                    {res.data.overview ? (
                        <div>
                            <div className={classes.divider}/>
                            <div>
                                <Title className={classes.trailerTitle}>Description</Title>
                                <Text>{description}</Text>
                            </div>
                        </div>) : null
                    }
                    {res.data.production_companies ? (
                        <div>
                            <div className={classes.divider}/>
                            <div>
                                <div className={classes.trailerTitle}>Production</div>
                                {res.data.production_companies.map((item) => (
                                    <div className={classes.companyInfo} key={item.id}>
                                        <div className={classes.companyLogos}>
                                            {item.logo_path ? (
                                                <Image src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                                                       alt='Company'
                                                       layout="responsive"
                                                       width={40}
                                                       height={40}/>) : (
                                                <Image src={companyLogoUndefind} alt='logo'/>)}
                                        </div>
                                        <Text className={classes.companyTitle}>{item.name}</Text>
                                    </div>
                                ))}
                            </div>
                        </div>) : null}
                </div>
            </div>
        </main>


    )
}
