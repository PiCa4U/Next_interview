import { type FC, useCallback, useState} from 'react';
import {Combobox, Group, Text, useCombobox} from '@mantine/core';
import Image from "next/image";

import type {Genre} from "@/packages/cinema/models/services";

import classes from "./multiSelectCustom.module.css";
import chevronDown from '..//../../../../../public/ChevronDown.svg'


type props = {
    genres: Genre[],
    selectedItems: string[];
    setSelectedItems: (value: string[]) => void;
}

export const MultiSelectCustom: FC<props> = ({genres, selectedItems, setSelectedItems}) => {
    const [pressed, setPressed] = useState(false)

    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption()
            setPressed(false)
        },
    });

    const onSubmit = useCallback((val:string)=>{
        if(selectedItems.includes(val)){
            setSelectedItems(selectedItems.filter((item) => item !== val))
            return;
        }

        const add = [...selectedItems, val]

        setSelectedItems(add)
    },[selectedItems, setSelectedItems])

    const options = genres.map((item) => (
        <Combobox.Option value={item.name} key={item.id} className={classes.item}>
            <Group>
                <span>{item.name}</span>
            </Group>
        </Combobox.Option>
    ));

    return (
        <>
            <Combobox
                store={combobox}
                width={280}
                positionDependencies={selectedItems}
                onOptionSubmit={onSubmit}
            >
                <Combobox.Target>
                    <div onClick={() => {
                        combobox.toggleDropdown()
                        setPressed(true)
                    }}>
                        <div className={!pressed ? classes.multiSelectInput : classes.multiSelectInputOn}>
                            {selectedItems.length > 0 ? (<Text>{selectedItems.join(', ').slice(0,27)}</Text>) : (
                                <Text className={classes.placeHolder}>Select genres</Text>)}
                            <Image src={chevronDown} alt={'chevronDown'}/>
                        </div>
                    </div>
                </Combobox.Target>

                <Combobox.Dropdown style={{borderRadius: 8}}>
                    <Combobox.Options className={classes.dropdown}>{options}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}
