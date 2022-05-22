import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { validateUserPermissions } from './../utils/validateUserPermissions';

export function useCan({ permissions, roles }) {
    const { user, isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated)
        return false

    const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles
    })
    return userHasValidPermissions

}