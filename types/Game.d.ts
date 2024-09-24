type Game = {
  id: string
  name: string
  description: string
  imageUrl?: string
  system?: string
  owner_id: string
  players: Profile[]
  characters: Character[]
}
