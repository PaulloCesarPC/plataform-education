import React from 'react'
import { useCan } from './../hooks/useCan';

export default function Can({ children, permissions, roles }) {
    const useCanSeeComponent = useCan({ permissions, roles })

    if (!useCanSeeComponent) {
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}
