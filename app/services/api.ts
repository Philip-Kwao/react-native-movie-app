export const TMDB_CONFIG={
    base_url:"https://api.themoviedb.org/3",
    api_key:process.env.EXPO_PUBLIC_API_KEY,
    headers:{
        accept:"application/json",
        Authorization:`Bearer ${process.env.EXPO_PUBLIC_API_KEY}`
    }

}

const fetchMovies = async({query}:{query:string})=>{
     const endpoint = query ? `${TMDB_CONFIG.base_url}/search/movie?query=${encodeURIComponent(query)}`:`${TMDB_CONFIG.base_url}/discover/movie?sort_by=popularity.desc`

     const response = await fetch(endpoint,{
        method:"GET",
        headers:TMDB_CONFIG.headers
     })

     if (!response.ok){
        throw new Error(`Failed to Fetch Movies: ${response.statusText}`)
     }

     const data = await response.json()
     return data.results
    }














// const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Mjg3NWFkZjM1Nzc3OWVhOTRiNTE5OGIyODE2ZTI1OSIsIm5iZiI6MTYyMDEyNDkzMS45LCJzdWIiOiI2MDkxMjUwMzNmZTc5NzAwNTcxNDY4YTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OZWIezJ-voBr8NNybQ7k97iJF_b93MrHTt-n-1ISwXo'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));