'use client'

import Image from "next/image";
import {useRouter} from "next/navigation";

import {Button, Text} from "@mantine/core";

import error from '../../public/404.svg'
import siteLogo from '../../public/siteLogo.svg'

import classes from "./page.module.css";





export default function ErrorPage(){
    const router = useRouter()

    const backHome = () => {
        location.reload();
        router.replace('/');
    };

    return(
        <div className={classes.errorPage}>
            <div className={classes.errorLogo}>
                <Image src={siteLogo} alt={'siteLogo'}/>
            </div>
            <div className={classes.errorContainer}>
                <Image src={error} alt={'error'}/>
                <div className={classes.errorButtonContainer}>
                    <Text className={classes.errorText}>We can’t find the page you are looking for</Text>
                    <Button onClick={backHome} className={classes.errorButton}>Go Home</Button>
                </div>
            </div>
        </div>
    )
}
