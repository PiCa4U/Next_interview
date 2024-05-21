'use client'

import type {PropsWithChildren} from "react";
import {MantineProvider} from "@mantine/core";


const AppProvider=({children}:PropsWithChildren)=>{
    return(
        <MantineProvider >
            {children}
        </MantineProvider>
    )

}

export default AppProvider
