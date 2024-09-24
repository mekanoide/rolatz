type MainTrait = {
  description: string
  level: number
}

type Consequences = {
  light: [string, string]
  severe: string
}

type ConcordiaSheet = {
  mainTraits: MainTrait[]
  flaws: string[]
  secondaryTraits: string[]
  consequences: Consequences
  gear: string[]
}

type ConcordiaCharacter = Character & {
  sheet: ConcordiaSheet
}
