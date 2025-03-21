<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { type BadgeVariants, badgeVariants } from '.'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
  edit?: boolean
}>()
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), props.class), { 'cursor-pointer': edit }" class="flex items-center gap-2">
    <slot />
    <Icon v-if="edit" icon="radix-icons:cross-2" width="12" />
  </div>
</template>
