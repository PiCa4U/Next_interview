import type {Dispatch, FC, SetStateAction} from "react";
import Image from "next/image";

import upVector from '../../../../../../public/Vector 140 up.svg'
import downVector from '../../../../../../public/Vector 140 down.svg'

import classes from "./voteVector.module.css";
import {voteDown, voteUp} from "@/packages/cinema/utills";

type props = {
    setValue: Dispatch<SetStateAction<number | undefined>>;
}

export const VoteVector: FC<props> = ({setValue}) => {

    const onVoteUp = () => {
        setValue((prevState) => voteUp(prevState));

    };

    const onVoteDown = () => {
        setValue((prevState) =>
            voteDown(prevState)
        );
    };

    return (
        <div className={classes.container}>
            <Image src={upVector} alt={'up vector'} onClick={onVoteUp}/>
            <Image src={downVector} alt={'down vector'} onClick={onVoteDown}/>
        </div>
    )
}
