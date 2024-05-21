'use client'

import type {Dispatch, FC, SetStateAction} from "react";
import Image from "next/image";

import upVector from '../../../../../../public/Vector 140 up.svg'
import downVector from '../../../../../../public/Vector 140 down.svg'

import classes from "./voteVector.module.css";

type props = {
    value: number | undefined
    setValue: Dispatch<SetStateAction<number | undefined>>;
}

export const VoteVector: FC<props> = ({setValue, value}) => {
    const voteUp = () => {
        setValue((prevState: number | undefined) => {
            const newValue = prevState !== undefined ? prevState + 0.1 : 0.1;
            return parseFloat(newValue.toFixed(1));
        });

    };

    const voteDown = () => {
        setValue((prevState: number | undefined) => {
            const newValue = prevState !== undefined ? prevState - 0.1 : 0;
            return parseFloat(newValue.toFixed(1));
        });
    };

    return (
        <div className={classes.container}>
            <Image src={upVector} alt={'up vector'} onClick={voteUp}/>
            <Image src={downVector} alt={'down vector'} onClick={voteDown}/>
        </div>
    )
}
