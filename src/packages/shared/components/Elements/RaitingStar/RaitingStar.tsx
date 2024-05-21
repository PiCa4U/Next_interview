'use client'

import {FC, useEffect} from "react";
import Image from "next/image";
import {useDisclosure} from '@mantine/hooks';
import {Button, Modal, Title} from "@mantine/core";
import {useLocalStorage} from "usehooks-ts";

import {IId, IMovie, IMovieCard, IMovieDetails} from "@/packages/cinema/models/services";

import voteStarGrey from '../../../../../../public/voteStarGrey.svg'
import voteStarPurple from '../../../../../../public/voteStarPurple.svg'
import voteStar from '../../../../../../public/voteStar.svg'
import classes from "./RaitingStart.module.css";


const starArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]


type props = {
    data: IMovieCard
}

export const RaitingStar: FC<props> = ({data}) => {
    const [opened, {open, close}] = useDisclosure(false);
    const [value, setValue] = useLocalStorage<null | IId>('rated' + data.id, null)
    const [ratedMovies, setRatedMovies] = useLocalStorage<number[]>('rated movies', [])


    const remove = () => {
        localStorage.removeItem('rated' + data.id);
        const arr = ratedMovies.filter(item => (item !== data.id))
        setRatedMovies(arr)
        setValue(null)
        close();
    }

    const onPress = (item: number) => {
        setValue({id: data.id, rating: item, data: data})
        const arr = ratedMovies.filter(item => (item !== data.id))
        arr?.push(data.id)
        setRatedMovies(arr)
    }

    return (
        <div>
            {value?.rating ?
                <div onClick={open} className={classes.ratingStar}>
                    <Image src={voteStarPurple} alt={'voteStarPurple'}/>
                    <div className={classes.rating}>{value?.rating}</div>
                </div> : <Image onClick={open} src={voteStarGrey} alt={'voteStarGrey'}/>
            }
            <Modal opened={opened} onClose={close}
                   title="Your rating"
                   radius={8}
                   styles={{
                       root: {
                           overflow: 'hidden',
                       },
                       inner: {
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           maxHeight: '100vh',
                           overflow: 'hidden',
                       },
                       content: {
                           maxHeight: '80vh',
                           overflowY: 'auto',
                       },
                   }}
            >
                <div className={classes.modal}>
                    <Title className={classes.title}>{data.title}</Title>
                    <div className={classes.starList}>
                        {starArray.map((item, index) => (
                            item <= (value?.rating ?? -1) ?
                                <Image key={index}
                                       onClick={() => onPress(item)}
                                       src={voteStar}
                                       alt={'voteStar'}/>
                                :
                                <Image key={index}
                                       onClick={() => onPress(item)}
                                       src={voteStarGrey}
                                       alt={'voteStarGrey'}/>
                        ))}
                    </div>
                    <div>
                        <Button onClick={close} className={classes.saveButton}>Save</Button>
                        <Button onClick={remove} className={classes.removeButton}>Remove rating</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
