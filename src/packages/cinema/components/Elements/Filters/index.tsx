'use client'

import React, {type FC, useEffect, useMemo, useState} from "react";
import qs from 'qs'
import {useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import {Select, Text, TextInput} from "@mantine/core";
import {YearPickerInput} from "@mantine/dates";

import {Genre, IMovieFilter} from "@/packages/cinema/models/services";

import {VoteVector} from "@/packages/shared/components/Elements/VoteVector";
import {MultiSelectCustom} from "@/packages/shared/components/Elements/MultiSelect/MultiSelect";

import chevronDown from '..//../../../../../public/ChevronDown.svg'
import classes from "./filters.module.css";



type props = {
    genres: Genre[],
}

const sortArray = [
    'popularity.asc',
    'popularity.desc',
    'revenue.asc',
    'revenue.desc',
    'primary_release_date.desc',
    'original_title.desc',
    'vote_average.desc',
    'vote_average.asc',
    'vote_count.asc',
    'vote_count.desc'
]
const sortArr = [
    'Least Popular',
    'Most Popular',
    'Least Revenue',
    'Highest Revenue',
    'Release Date',
    'Title',
    'Most Rated',
    'Least Rated',
    'Least Voted',
    'Most Voted'
]

export const Filters: FC<props> = ({genres}) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const filter = useMemo(() => qs.parse(searchParams.toString()) as unknown as IMovieFilter, [searchParams])
    const [year, setYear] = useState<number | undefined>(filter?.year)
    const [selected, setSelected] = useState<string[]>(filter?.genres ?? [])
    const [gte, setGte] = useState<number | undefined>(filter?.gte)
    const [lte, setLte] = useState<number | undefined>(filter?.lte)
    const [sort, setSort] = useState<string | null>('Most Popular')


    useEffect(() => {
        const params = qs.stringify({
                with_genres: genres.filter(item => selected.includes(item.name)).map(item => item.id),
                'primary_release_year': year,
                'vote_average.gte': gte,
                'vote_average.lte': lte,
                sort_by: sortArray[sortArr.findIndex(item => item === sort)]
            },
            {arrayFormat: 'repeat', encodeValuesOnly: true})
        router.replace(`/?${params}`)
    }, [router, selected, year, gte, lte, sort])

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
            setYear(selectedYear);
        } else {
            setYear(undefined);
        }
    };

    const resetFilters = () => {
        setYear(undefined);
        setSelected([]);
        setGte(undefined);
        setLte(undefined);
        setSort('Most Popular');

        router.replace('/');
    }

    return (
        <div>
            <div className={classes.container}>
                <div>
                    <Text className={classes.label}>Genres</Text>
                    <MultiSelectCustom genres={genres} selectedItems={selected} setSelectedItems={setSelected}/>
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
                        rightSection={<VoteVector setValue={setGte} value={gte}/>}
                        value={gte !== undefined ? gte.toString() : ''}
                        onChange={gteChange}
                        classNames={{label: classes.label, input: classes.rateInput}}
                    />
                    <TextInput
                        label=' '
                        placeholder={'To'}
                        rightSection={<VoteVector setValue={setLte} value={lte}/>}
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
                    data={sortArr}
                    value={sort}
                    onChange={setSort}
                    rightSection={<Image src={chevronDown} alt={'chevronDown'}/>}
                    withCheckIcon={false}
                    classNames={{label: classes.label, root: classes.sortRoot, input: classes.sortInput, option:classes.sortOption}}
                />
            </div>
        </div>
    )
}
