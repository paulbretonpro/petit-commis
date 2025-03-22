import { useBreakpoints } from '@vueuse/core'

export default function () {
  const breakpoints = useBreakpoints({
    mobile: 0,
    tablet: 640,
    desktop: 900
  })
  const active = breakpoints.active()

  const isMobile = computed(() => active.value === 'mobile' || active.value === 'tablet')
  
  return {
    active,
    isMobile
  }
}
