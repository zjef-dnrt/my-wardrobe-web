<template>
  <div class="tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center">
    <p
      v-if="type === 'spinner'"
      class="tw-inline-block tw-w-4 tw-h-4 tw-border-2 tw-rounded-full tw-border-darkSienna-200 tw-border-t-darkSienna-500 tw-animate-spin"
    ></p>
    <div v-else class="tw-flex tw-flex-col tw-justify-center tw-items-center">
      <div class="cube">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      Laden...
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'spinner',
  },
})
</script>

<style scoped>
@-webkit-keyframes cube {
  0% {
    -webkit-transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
    transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
  }
  50% {
    -webkit-transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
    transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
  }
  100% {
    -webkit-transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
    transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
  }
}
@keyframes cube {
  0% {
    -webkit-transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
    transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
  }
  50% {
    -webkit-transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
    transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
  }
  100% {
    -webkit-transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
    transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
  }
}

.cube {
  -webkit-animation: cube 2s infinite ease;
  animation: cube 2s infinite ease;
  height: 40px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  width: 40px;
  margin: 1rem;
}
.cube div {
  background-color: rgba(75, 69, 77, 0.25);
  height: 100%;
  position: absolute;
  width: 100%;
  border: 2px solid rgb(255, 255, 255, 0.5);
}
.cube div:nth-of-type(1) {
  -webkit-transform: translateZ(-20px) rotateY(180deg);
  transform: translateZ(-20px) rotateY(180deg);
}
.cube div:nth-of-type(2) {
  -webkit-transform: rotateY(-270deg) translateX(50%);
  transform: rotateY(-270deg) translateX(50%);
  -webkit-transform-origin: top right;
  transform-origin: top right;
}
.cube div:nth-of-type(3) {
  -webkit-transform: rotateY(270deg) translateX(-50%);
  transform: rotateY(270deg) translateX(-50%);
  -webkit-transform-origin: center left;
  transform-origin: center left;
}
.cube div:nth-of-type(4) {
  -webkit-transform: rotateX(90deg) translateY(-50%);
  transform: rotateX(90deg) translateY(-50%);
  -webkit-transform-origin: top center;
  transform-origin: top center;
}
.cube div:nth-of-type(5) {
  -webkit-transform: rotateX(-90deg) translateY(50%);
  transform: rotateX(-90deg) translateY(50%);
  -webkit-transform-origin: bottom center;
  transform-origin: bottom center;
}
.cube div:nth-of-type(6) {
  -webkit-transform: translateZ(20px);
  transform: translateZ(20px);
}
</style>
