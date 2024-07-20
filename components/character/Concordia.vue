<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ data: ConcordiaCharacter }>()

const nullMainTrait: MainTrait = { description: '', level: 0 }

const mainTraits = computed(() => {
  return props.data.mainTraits.length > 0
    ? props.data.mainTraits
    : [nullMainTrait]
})

function onAddMainTrait() {
  mainTraits.value.push(nullMainTrait)
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[repeat(auto-fit,minmax(512px,1fr))]">
    <section>
      <h2 class="mb-4">Rasgos principales</h2>
      <Card>
        <FieldTrait
          v-for="trait in mainTraits"
          :description="trait.description"
          placeholder="Escribe un rasgo">
          <FieldTrackDice
            v-model="trait.level"
            :max="3"
            :min="0" />
        </FieldTrait>
        <Button @click="onAddMainTrait">Añadir rasgo principal</Button>
      </Card>
    </section>
    <section>
      <h2 class="mb-4">Debilidades</h2>
      <Card>
        <FieldTrait
          v-for="flaw in data.flaws"
          :description="flaw"
          placeholder="Escribe una debilidad"></FieldTrait>
      </Card>
    </section>
    <section>
      <h2 class="mb-4">Rasgos secundarios</h2>
      <Card>
        <FieldTrait
          v-for="trait in data.secondaryTraits"
          :description="trait"
          placeholder="Escribe un rasgo secundario"></FieldTrait>
      </Card>
    </section>
    <section>
      <h2 class="mb-4">Consecuencias</h2>
      <Card>
        <h3>Consecuencias leves</h3>
        <FieldTrait
          v-for="skill in data.consequences.light"
          :description="skill"
          placeholder="Escribe una consecuencia leve"></FieldTrait>
        <h3 class="mt-6">Consecuencia grave</h3>
        <FieldTrait
          :description="data.consequences.severe"
          placeholder="Escribe una consecuencia grave"></FieldTrait>
      </Card>
    </section>
    <section>
      <h2 class="mb-4">Posesiones significativas</h2>
      <Card>
        <FieldTrait
          v-for="item in data.gear"
          :description="item"
          placeholder="Escribe una posesión significativa"></FieldTrait>
      </Card>
    </section>
    <section>
      <h2 class="mb-4">Notas</h2>
      <Card>
        <textarea
          v-model="data.notes"
          rows="6"
          placeholder="Escribe una nota"></textarea>
      </Card>
    </section>
  </div>
</template>

<style scoped>
section {
  @apply mt-4;
}
</style>
