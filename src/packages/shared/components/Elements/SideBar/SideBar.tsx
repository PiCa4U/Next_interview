'use client'

import type{FC} from "react";
import {Burger} from "@mantine/core";
import Image from "next/image";
import {useDisclosure} from "@mantine/hooks";

import siteLogo from '../../../../../../public/siteLogo.svg'

import classes from "./sideBar.module.css";

type props={
    movies:boolean
    ratedMovies:boolean
}

export const SideBar:FC<props>=({movies,ratedMovies})=>{
    const [opened, { toggle }] = useDisclosure();


    return(
        <>
            <Burger
                className={classes.burger}
                opened={opened}
                onClick={toggle}
                styles={{
                    root: {
                        '--burger-color': '#9854F6'
                    }
                }}
            />
            <div className={classes.container} style={opened?{display:"flex"}:undefined}>
                <Image src={siteLogo} alt={'siteLogo'}/>
                <div className={classes.buttonContainer}>
                    <a href={`/`}>
                        <div className={movies ? classes.onButton : classes.button}>Movies</div>
                    </a>
                    <a href={`/ratedMovies`}>
                        {ratedMovies ? (<div className={classes.onButton}>Rated movies</div>) :
                            (<div className={classes.button}>Rated movies</div>)}
                    </a>
                </div>
            </div>
        </>
    )
}
