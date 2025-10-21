<script setup lang="ts">
const open = defineModel<boolean>()

defineProps<{
  title?: string
}>()
</script>

<template>
  <UCollapsible v-model:open="open" unmount-on-hide class="flex flex-col">
    <button
      type="button"
      :aria-expanded="open ? 'true' : 'false'"
      :data-state="open ? 'open' : 'closed'"
      class="transition-all duration-200 font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 cursor-pointer px-3 py-3 text-base gap-2 w-full justify-center ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted group rounded-t-lg"
      :class="open ? 'rounded-t-md' : 'rounded-md'"
    >
      <span class="truncate">{{ title }}</span>
      <span
        class="iconify i-lucide:chevron-down shrink-0 size-6 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200"
        aria-hidden="true"
      />
    </button>

    <template #content>
      <div
        class="border-b border-r border-l rounded-b-lg dark:border-neutral-800 px-4 py-6"
      >
        <slot name="content" />
      </div>
    </template>
  </UCollapsible>
</template>
