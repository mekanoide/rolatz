export const characterPreviewList: Character[] = [
  {
    id: 1,
    system: 'Concordia',
    game: 'Terra Australis Ignota',
    name: 'Maldonado Rajoy',
    player: 'Carlos',
    description: 'Recaudador de impuestos corrupto',
    imageUrl: '/images/Maldonado Rajoy.png'
  },
  {
    id: 2,
    system: 'Concordia',
    game: 'Terra Australis Ignota',
    name: 'Diego Montoya',
    player: 'Joss',
    description: 'Hidalgo veterano de los tercios'
  },
  {
    id: 3,
    system: 'Concordia',
    game: 'Terra Australis Ignota',
    name: 'Lupercio Bohorques de la Cruz',
    player: 'Joshua Insua Ayuso',
    description: 'Viejo alquimista mundano',
    imageUrl: '/images/Lupercio.png'
  },
  {
    id: 4,
    system: 'Concordia',
    game: 'Terra Australis Ignota',
    name: 'Ramón Rodríguez',
    player: 'Manu',
    description: 'Experto en corridas'
  },
  {
    id: 5,
    system: 'Concordia',
    game: 'Terra Australis Ignota',
    name: 'Rubiales',
    player: '-',
    description: 'Soldado turbio. Un figura'
  }
]

export const gameList: GamePreview[] = [
  {
    id: '1',
    name: 'Concordia',
    description: 'Juego de rol',
    imageUrl: '/images/Concordia.png'
  }
]

export const characterList: ConcordiaCharacter[] = [
  {
    id: 1,
    system: 'Concordia',
    name: 'Maldonado Rajoy',
    player: 'Carlos',
    description: 'Recaudador de impuestos corrupto',
    imageUrl: '/images/Maldonado Rajoy.png',
    mainTraits: [
      {
        description: 'Funcionario corrupto',
        level: 2
      },
      {
        description: 'Jugador',
        level: 1
      },
      {
        description: 'Camorrista',
        level: 1
      }
    ],
    flaws: [],
    secondaryTraits: [],
    consequences: {
      light: ['', ''],
      severe: ''
    },
    gear: [],
    notes: ''
  },
  {
    id: 2,
    system: 'Concordia',
    name: 'Diego Montoya',
    player: 'Joss',
    description: 'Hidalgo veterano de los tercios',
    mainTraits: [
      {
        description: 'Funcionario corrupto',
        level: 2
      },
      {
        description: 'Jugador',
        level: 1
      }
    ],
    flaws: [],
    secondaryTraits: [],
    consequences: {
      light: ['', ''],
      severe: ''
    },
    gear: ['Daga'],
    notes: ''
  },
  {
    id: 3,
    system: 'Concordia',
    name: 'Lupercio Bohorques de la Cruz',
    player: 'Joshua',
    description: 'Alquimista mundano',
    imageUrl: '/images/Lupercio.png',
    mainTraits: [
      {
        description: 'Alquimista mundano',
        level: 3
      },
      {
        description: 'Licenciado en la universidad de Salamanca',
        level: 1
      }
    ],
    flaws: [],
    secondaryTraits: [],
    consequences: {
      light: ['Le faltan los dientes', ''],
      severe: ''
    },
    gear: [],
    notes: ''
  }
]
