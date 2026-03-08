import { ReactNode } from "react"

type GuardedProps = {
    permission: boolean,
    children: ReactNode
}
export const Guarded = ({permission, children}: GuardedProps) => {
    return <>{permission ? children : null}</>
}