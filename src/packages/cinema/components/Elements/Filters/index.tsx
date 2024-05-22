'use client'

import React, {type FC, useCallback, useEffect, useMemo, useState} from "react";
import qs from 'qs'
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Select, Text, TextInput} from "@mantine/core";
import {YearPickerInput} from "@mantine/dates";

import {Genre, IMovieFilter, IMovieFilterUpdate} from "@/packages/cinema/models/services";

import {VoteVector} from "@/packages/shared/components/Elements/VoteVector";
import {MultiSelectCustom} from "@/packages/shared/components/Elements/MultiSelect/MultiSelect";

import chevronDown from '..//../../../../../public/ChevronDown.svg'
import classes from "./filters.module.css";


type props = {
    genres: Genre[],
    filter: IMovieFilter,
}

const sortOptions = [
    {"label": "Most Popular", "value": "popularity.desc"},
    {"label": "Least Popular", "value": "popularity.asc"},
    {"label": "Least Revenue", "value": "revenue.asc"},
    {"label": "Highest Revenue", "value": "revenue.desc"},
    {"label": "Release Date", "value": "primary_release_date.desc"},
    {"label": "Title", "value": "original_title.desc"},
    {"label": "Most Rated", "value": "vote_average.desc"},
    {"label": "Least Rated", "value": "vote_average.asc"},
    {"label": "Least Voted", "value": "vote_count.asc"},
    {"label": "Most Voted", "value": "vote_count.desc"}
]

export const Filters: FC<props> = ({genres, filter}) => {
    const router = useRouter()

    const year = useMemo(() => filter?.primary_release_year, [filter])
    const selected = useMemo(() => genres.filter(genre => filter?.with_genres?.includes(String(genre.id))).map(item => item.name), [filter, genres])
    const [gte, setGte] = useState<number | undefined>(filter?.["vote_average.gte"])
    const [lte, setLte] = useState<number | undefined>(filter?.["vote_average.lte"])
    const sort = useMemo(() => sortOptions.find(item => item.value === filter?.sort_by)?.value ?? sortOptions[0].value, [filter])


    const queryUpdate = useCallback(({page = 1, ...updFilter}: IMovieFilterUpdate) => {
        const params = qs.stringify({
                ...filter,
                ...updFilter,
                page,
            },
            {arrayFormat: 'repeat', encodeValuesOnly: true})
        router.replace(`/?${params}`)
    }, [filter, router])

    useEffect(() => {
        if (lte === filter?.["vote_average.lte"]) {
            return;
        }
        queryUpdate({'vote_average.lte': lte})
    }, [lte]);

    useEffect(() => {
        if (gte === filter?.["vote_average.gte"]) {
            return;
        }
        queryUpdate({'vote_average.gte': gte})
    }, [gte]);

    const onSortChange = useCallback((value: string | null) => {
        queryUpdate({sort_by: value ?? undefined})
    }, [queryUpdate])

    const gteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        const numberValue = Number(value);
        setGte(!isNaN(numberValue) ? numberValue : undefined);
    }

    const lteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        const numberValue = Number(value);
        setLte(!isNaN(numberValue) ? numberValue : undefined);
    }

    const yearChange = (date: Date | null) => {
        if (date) {
            const selectedYear = date.getFullYear();
            queryUpdate({primary_release_year: selectedYear});
        } else {
            queryUpdate({primary_release_year: undefined});
        }
    };

    const onGenresUpdate = useCallback((list: string[]) => {
        const keys = genres.filter(item => list.includes(item.name)).map(item => item.id)
        queryUpdate({with_genres: keys})
    }, [queryUpdate, genres])

    const resetFilters = () => {

        router.replace('/');
    }

    return (
        <div>
            <div className={classes.container}>
                <div>
                    <Text className={classes.label}>Genres</Text>
                    <MultiSelectCustom genres={genres} selectedItems={selected} setSelectedItems={onGenresUpdate}/>
                </div>

                <YearPickerInput
                    placeholder="Select year"
                    rightSection={<Image src={chevronDown} alt={'chevronDown'}/>}
                    label='Year'
                    value={year ? new Date(year, 0, 1) : null}
                    onChange={yearChange}
                    classNames={{label: classes.label, input: classes.yearPicker, yearsListControl: classes.yearItem}}
                />
                <div className={classes.rateContainer}>
                    <TextInput
                        label='Ratings'
                        placeholder={'From'}
                        rightSection={<VoteVector setValue={setGte}/>}
                        value={gte !== undefined ? gte.toString() : ''}
                        onChange={gteChange}
                        classNames={{label: classes.label, input: classes.rateInput}}
                    />
                    <TextInput
                        label=' '
                        placeholder={'To'}
                        rightSection={<VoteVector setValue={setLte}/>}
                        value={lte !== undefined ? lte.toString() : ''}
                        onChange={lteChange}
                        classNames={{label: classes.label, input: classes.rateInput, root: classes.rateRoot}}
                    />
                </div>

                <div onClick={resetFilters} className={classes.resetButton}>Reset filters</div>
            </div>
            <div className={classes.sortContainer}>
                <Select
                    label={'Sort by'}
                    data={sortOptions}
                    value={sort}
                    onChange={onSortChange}
                    rightSection={<Image src={chevronDown} alt={'chevronDown'}/>}
                    withCheckIcon={false}
                    classNames={{
                        label: classes.label,
                        root: classes.sortRoot,
                        input: classes.sortInput,
                        option: classes.sortOption
                    }}
                />
            </div>
        </div>
    )
}
