<template>
  <div
    class="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-p-8 tw-bg-mistyRose-600"
  >
    <div
      class="tw-w-100 tw-bg-mistyRose-600 tw-rounded-3xl tw-shadow-md tw-p-4 neumorph"
    >
      <div class="tw-h-full tw-flex tw-flex-col tw-items-center">
        <slot />
      </div>
    </div>
    <AlertBox />
  </div>
</template>
