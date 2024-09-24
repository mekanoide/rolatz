<script setup lang="ts">
definePageMeta({
  name: 'concordia'
})
import concordia from '@/config/Concordia'

const props = defineProps({
  sheet: {
    type: Object,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:sheet', value: any): void
}>()

const initialData = {
  mainTraits: props.sheet.mainTraits ?? [{ description: '', level: 0 }],
  secondaryTraits: props.sheet.secondaryTraits ?? [''],
  flaws: props.sheet.flaws ?? [''],
  states: props.sheet.states ?? [{ description: '', positive: null }],
  gear: props.sheet.gear ?? ['']
}
// Data
const sheetData = ref({ ...initialData })

console.log('sheet', sheetData.value)
const nullMainTrait: MainTrait = { description: '', level: 0 }
const mainTraits = ref<MainTrait[]>(
  props.sheet.mainTraits ?? [{ ...nullMainTrait }]
)

const secondaryTraits = ref<string[]>(props.sheet.secondaryTraits ?? [''])

const flaws = ref<string[]>(props.sheet.flaws ?? [''])
const consequences = ref<Consequences>(
  props.sheet.consequences ?? {
    light: ['', ''],
    severe: ''
  }
)

function onAddMainTrait() {
  console.log('add main trait', nullMainTrait)
  sheetData.value.mainTraits.push({ ...nullMainTrait })
}
function onBlurMainTrait(index: number) {
  console.log('blur main trait', index)
  if (sheetData.value.mainTraits[index].description === '') {
    sheetData.value.mainTraits.splice(index, 1)
  }
}

function onAddSecondaryTrait() {
  secondaryTraits.value.push('')
}

function onBlurSecondaryTrait(index: number) {
  if (secondaryTraits.value[index] === '') {
    secondaryTraits.value.splice(index, 1)
  }
}

function onAddFlaw() {
  sheetData.value.flaws.push('')
}

function onBlurFlaw(index: number) {
  if (sheetData.value.flaws[index] === '') {
    sheetData.value.flaws.splice(index, 1)
  }
}

function onAddState() {
  sheetData.value.states.push({ description: '', positive: null })
}

function onBlurState(index: number) {
  if (sheetData.value.states[index].description === '') {
    sheetData.value.states.splice(index, 1)
  }
}

function onAddGear() {
  sheetData.value.gear.push('')
}

function onBlurGear(index: number) {
  if (sheetData.value.gear[index] === '') {
    sheetData.value.gear.splice(index, 1)
  }
}

watch(
  sheetData,
  (newData) => {
    console.log('newData', newData)
    emit('update:sheet', newData)
  },
  { deep: true }
)
</script>

<template>
  <div>
    <Section title="Rasgos principales">
      <FieldTrait
        v-for="(trait, index) in sheetData.mainTraits"
        :key="trait"
        v-model="sheetData.mainTraits[index].description"
        placeholder="Escribe un rasgo"
        :fixed="index < 2"
        @blur="onBlurMainTrait(index)">
        <FieldTrackDice
          v-model="sheetData.mainTraits[index].level"
          :max="3"
          :min="0" />
      </FieldTrait>
      <ButtonAdd
        v-if="sheetData.mainTraits.length < concordia.MAX_MAIN_TRAITS"
        @click="onAddMainTrait"
        label="Añadir rasgo principal" />
    </Section>
    <Section title="Debilidades">
      <FieldTrait
        v-for="(flaw, index) in sheetData.flaws"
        :key="index"
        v-model="sheetData.flaws[index]"
        placeholder="Escribe una debilidad"
        :fixed="index < 1"
        @blur="onBlurFlaw(index)" />
      <ButtonAdd
        v-if="sheetData.flaws.length < concordia.MAX_FLAWS"
        @click="onAddFlaw"
        label="Añadir debilidad" />
    </Section>
    <Section title="Rasgos secundarios">
      <FieldTrait
        v-for="(trait, index) in sheetData.secondaryTraits"
        :key="index"
        v-model="sheetData.secondaryTraits[index]"
        placeholder="Escribe un rasgo secundario"
        :fixed="index < 1"
        @blur="onBlurSecondaryTrait(index)"></FieldTrait>
      <ButtonAdd
        v-if="secondaryTraits.length < concordia.MAX_SECONDARY_TRAITS"
        @click="onAddSecondaryTrait"
        label="Añadir rasgo secundario" />
    </Section>
    <Section title="Consecuencias">
      <FieldTrait
        v-for="(state, index) in sheetData.states"
        v-model="sheetData.states[index].description"
        placeholder="Escribe una consecuencia leve"
        :fixed="index < 1"
        @blur="onBlurState(index)">
      </FieldTrait>
      <ButtonAdd
        v-if="sheetData.states.length < concordia.MAX_STATES"
        @click="onAddState"
        label="Añadir estado" />
    </Section>
    <Section title="Posesiones">
      <FieldTrait
        v-for="(item, index) in sheet.gear"
        v-model="sheet.gear[index]"
        placeholder="Escribe una posesión significativa"
        :fixed="index < 1"
        @blur="onBlurGear(index)"></FieldTrait>
      <ButtonAdd
        v-if="sheetData.gear.length < concordia.MAX_GEAR"
        @click="onAddGear"
        label="Añadir posesión" />
    </Section>
  </div>
</template>
