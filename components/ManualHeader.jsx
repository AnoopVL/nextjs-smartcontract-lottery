import {useMoralis} from "react-moralis"

export default function ManualHeader(){
    const {enableweb3} = useMoralis()
    return (
        <>
        <div>
            This is the header part !!
        </div>
        </>
    )
}

