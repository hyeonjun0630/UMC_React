const get = async (endpoint) => {
  return await fetch(
    `https://api.themoviedb.org/3${endpoint}`,
    {
      method: 'GET',
      headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_API_JWT}`
      }
    }
  )
}

export const TMDB = {
  get
};