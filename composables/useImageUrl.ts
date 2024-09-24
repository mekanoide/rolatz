export function useImageUrl(path: string): string {
  const config = useRuntimeConfig()

  if (!path) {
    return ''
  }
  return `${config.public.storageUrl}/${path}`
}
