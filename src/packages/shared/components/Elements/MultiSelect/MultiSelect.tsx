'use client'

import {type Dispatch, type FC, type SetStateAction, useState} from 'react';
import {Combobox, Group, Text, useCombobox} from '@mantine/core';
import {Genre} from "@/packages/cinema/models/services";
import classes from "./multiSelectCustom.module.css";


type props = {
    genres: Genre[],
    selectedItems: string[];
    setSelectedItems: Dispatch<SetStateAction<string[]>>;
}

export const MultiSelectCustom: FC<props> = ({genres, selectedItems, setSelectedItems}) => {
    const [pressed, setPressed] = useState(false)

    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption()
            setPressed(false)
        },
    });

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
                positionDependencies={[selectedItems]}
                onOptionSubmit={(val) => {
                    setSelectedItems((current) =>
                        current.includes(val) ? current.filter((item) => item !== val) : [...current, val]
                    );
                }}
            >
                <Combobox.Target>
                    <div onClick={() => {
                        combobox.toggleDropdown()
                        setPressed(true)
                    }}>
                        {!pressed ? (<div className={classes.multiSelectInput}>
                                {selectedItems.length > 0 ? (<Text>{selectedItems.join(', ')}</Text>) : (
                                    <Text className={classes.placeHolder}>Select genres</Text>)}
                            </div>)
                            :
                            (<div className={classes.multiSelectInputOn}>
                                    {selectedItems.length > 0 ? (<Text>{selectedItems.join(', ')}</Text>) : (
                                        <Text className={classes.placeHolder}>Select genres</Text>)}
                                </div>
                            )}
                    </div>
                </Combobox.Target>

                <Combobox.Dropdown style={{borderRadius: 8}}>
                    <Combobox.Options className={classes.dropdown}>{options}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}
