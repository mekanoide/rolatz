type MainTrait = {
  description: string
  level: number
}

type Consequences = {
  light: [string, string]
  severe: string
}

declare type ConcordiaCharacter = Character & {
  mainTraits: MainTrait[]
  flaws: string[]
  secondaryTraits: string[]
  consequences: Consequences
  gear: string[]
  notes: string
}