import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunction:()=>Promise<T>,autoFetch=true)=>{
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchData = async()=>{
        try{
            setLoading(true)
            setError(null)

            const result = await fetchFunction()
            setData(result)
        }
        catch(err){
            setError(err instanceof Error ? err : new Error("An Error Occured"))
        }
        finally{
            setLoading(false)
        }
        
    }
    // Reset State
    const reset = ()=>{
        setData(null)
        setLoading(false)
        setError(null)
    }

    // Call Function at the beginning of the program
    useEffect(()=>{
        if(autoFetch){
            fetchData()
        }
    },[])
    return {data, loading, error, refetch:fetchData, reset}

}

export default useFetch