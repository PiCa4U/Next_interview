'use client'

import {type FC, useCallback, useMemo} from "react";
import {Pagination} from "@mantine/core";
import {useRouter, useSearchParams} from "next/navigation";
import qs from "qs";

import type {IMovieFilter} from "@/packages/cinema/models/services";

import classes from "@/packages/cinema/components/Elements/MovieCardList/movieCardList.module.css";

type props = {
    page: number
    total: number
}

export const PaginationBar: FC<props> = ({page, total}) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const filters = useMemo(() => qs.parse(searchParams.toString()) as unknown as IMovieFilter, [searchParams])

    const onChange = useCallback((value: number) => {
        const params = qs.stringify({...filters, page: value}, {arrayFormat: 'repeat', encodeValuesOnly: true})
        router.push(`/?${params}`)
    }, [filters, router])

    return (

        <div>
            {total !== 1?<Pagination value={page} total={total}
                         onChange={onChange}
                         boundaries={0}
                         classNames={{control: classes.control, dots: classes.paginationDots}}/>:null}
        </div>
    )
}
