<script setup lang="ts">
import type { EditorToolbarItem } from '@nuxt/ui'
import { TextAlign } from '@tiptap/extension-text-align'
import type { TRecipeFormCreate } from '~/utils/types/recipes'

const form = defineModel<TRecipeFormCreate>('form', { required: true })

const items: EditorToolbarItem[] = [
  { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold' },
  { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic' },
  { kind: 'heading', level: 3, icon: 'i-lucide-heading-3' },
  { kind: 'heading', level: 4, icon: 'i-lucide-heading-4' },
  { kind: 'textAlign', align: 'left', icon: 'i-lucide-align-left' },
  { kind: 'textAlign', align: 'center', icon: 'i-lucide-align-center' },
  { kind: 'bulletList', icon: 'i-lucide-list' },
  { kind: 'orderedList', icon: 'i-lucide-list-ordered' },
  { kind: 'blockquote', icon: 'i-lucide-quote' },
  { kind: 'link', icon: 'i-lucide-link' },
]

onMounted(() => {
  if (!form.value.content) {
    form.value.content = `
### Ingrédients :

*

### Étapes :

`
  }
})
</script>

<template>
  <div
    class="border border-gray-200 dark:border-neutral-800 rounded-lg overflow-hidden focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
  >
    <UEditor
      v-slot="{ editor }"
      v-model="form.content"
      :extensions="[
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ]"
      :placeholder="{
        placeholder: 'Décris ta meilleure recette...',
        mode: 'everyLine',
      }"
      :ui="{
        content: 'px-4 pb-4',
      }"
      content-type="markdown"
    >
      <UEditorToolbar
        :editor="editor"
        :items="items"
        class="border-b border-gray-200 dark:border-neutral-800 p-2 mb-4 bg-white dark:bg-neutral-900"
      />
    </UEditor>
  </div>
</template>
