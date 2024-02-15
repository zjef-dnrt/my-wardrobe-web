<template>
  <div
    class="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-p-8 tw-bg-mistyRose-600"
  >
    <div
      class="tw-w-100 tw-h-96 tw-bg-mistyRose-600 tw-rounded-3xl tw-shadow-md tw-p-4 neumorph"
    >
      <div class="tw-h-full tw-flex tw-flex-col tw-items-center">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.neumorph {
  box-shadow: 18px 18px 36px #b5a7a7, -18px -18px 36px #cdbdbd;
}
</style>