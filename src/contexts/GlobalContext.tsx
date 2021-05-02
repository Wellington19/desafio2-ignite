import { createContext, ReactNode, useState, useEffect } from 'react'
import { api } from '../services/api'

interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}

interface MovieProps {
  imdbID: string
  Title: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Runtime: string
}

interface GlobalContextData {
  selectedGenreId: number
  selectedGenre: GenreResponseProps
  genres: GenreResponseProps[]
  movies: MovieProps[]
  handleClickButton: (id: number) => void
}

interface GlobalProviderProps {
  children: ReactNode
}

export const GlobalContext = createContext({} as GlobalContextData)

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps)
  const [genres, setGenres] = useState<GenreResponseProps[]>([])
  const [movies, setMovies] = useState<MovieProps[]>([])

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    })
  }, [])

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data)
    })

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data)
    })
  }, [selectedGenreId])

  function handleClickButton(id: number) {
    setSelectedGenreId(id)
  }

  return (
    <GlobalContext.Provider
      value={{
        selectedGenreId,
        selectedGenre,
        genres,
        movies,
        handleClickButton
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}