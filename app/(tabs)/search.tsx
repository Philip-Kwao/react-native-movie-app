import { icons } from '@/constants/icons'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import { fetchMovies } from '../services/api'
import useFetch from '../services/useFetch'

const search = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const {data:movies, loading, error, refetch:loadMovies, reset } = useFetch(()=>fetchMovies({
    query:searchQuery
  }),false)

  useEffect(()=>{
    const timeOutId = setTimeout(async ()=>{
      if(searchQuery.trim()){
        await loadMovies()
      }
      else{
        reset()
      }
    },500)

    return ()=>clearTimeout(timeOutId)
  },[searchQuery])


  return (
    <View className='flex-1 bg-primary'>
      
      <FlatList 
      data={movies}
      renderItem={({item})=> <MovieCard {...item} />}
      keyExtractor={(item)=>item.id.toString()}
      numColumns={3}
      columnWrapperStyle={{
        justifyContent:"center",
        gap:16,
        marginVertical:16
      }}
      contentContainerStyle={{paddingBottom:10}}
      ListHeaderComponent={
        <>
        <View className='w-full flex-row mt-20 justify-center items-center '>
          <Image source={icons.logo} className='' />
        </View>
        <View className='mt-10'>
          <SearchBar placeholder='Search For Movies' value={searchQuery} onChangeText={(text:string)=>setSearchQuery(text)}  />

          {loading && (
            <ActivityIndicator size={"large"} className='my-20' color={"#ffffff"} />
          )}

          {error && (
            <Text className='text-red-500'>
              Error: {error?.message}
            </Text>
          )}

          {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
            <Text className='text-white font-bold uppercase text-center'>Searching For: {searchQuery}</Text>
          )}
        </View>
        </>
      }

      ListEmptyComponent={
        <>
        {
          !loading && !error ? (
            <Text className='mt-20 text-gray-500'>
              {searchQuery.trim() ? "Movie Not Found":"Search For A Movie"}
            </Text>
          ):null
        }
        
        </>
      }
      />
    </View>
  )
}

export default search

const styles = StyleSheet.create({})