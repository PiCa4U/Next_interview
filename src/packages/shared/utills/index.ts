export const onArraySlice = <T>(page: number, ratedIds: T[]) => {
    let arr: T[]
    if (page === 1) {
        arr = ratedIds.slice(0, 4)
        return arr
    }
    arr = ratedIds.slice(((page - 1) * 4), 4 + ((page - 1) * 4))
    return arr
}
