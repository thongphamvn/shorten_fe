const url = new URL(import.meta.env.VITE_API_SERVER_URL)

export const buildShortUrl = (path: string) => {
  return `${url.host}/${path}`
}
