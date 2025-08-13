<script setup lang="ts">
interface IRectangle {
  x: number
  y: number
  w: number
  h: number
}

const canvasRef = useTemplateRef('canvasRef')

const { elementX, elementY } = useMouseInElement(canvasRef)

const rect = ref<IRectangle>()
const rectIsInitialised = ref(false)
const rectIsCreated = ref(false)

const image = ref<File>()

const handleSelect = (file: File) => {
  image.value = file

  const imageToCanvas = new Image()

  imageToCanvas.src = image.value.
}

const handleKeydown = () => {
  let newRect: IRectangle
  if (rectIsInitialised.value) {
    rectIsCreated.value = true
  } else {
    newRect = {
      x: elementX.value,
      y: elementY.value,
      w: 10,
      h: 10,
    }
    draw(newRect)

    rectIsCreated.value = false
  }

  rectIsInitialised.value = !rectIsInitialised.value
}

const handleMouseMove = ({ x, y }: MouseEvent) => {
  if (!rect.value || rectIsCreated.value) return

  draw({
    ...rect.value,
    w: elementX.value - rect.value.x,
    h: elementY.value - rect.value.y,
  })
}

const draw = ({ x, y, w, h }: IRectangle) => {
  const ctx = canvasRef.value?.getContext('2d')

  if (!ctx) return

  if (rect.value) {
    ctx.clearRect(rect.value.x, rect.value.y, rect.value.w, rect.value.h)
  }

  ctx.fillRect(x, y, w, h)

  rect.value = {
    x,
    y,
    w,
    h,
  }
}
</script>

<template>
  <div>
    <UFileUpload :model-value="image" @update:model-value="handleSelect" />

    <canvas
      ref="canvasRef"
      width="500"
      height="500"
      class="border dark:border-neutral-800 rounded-lg"
      @mousedown="handleKeydown"
      @mousemove="handleMouseMove"
    />
  </div>
</template>
