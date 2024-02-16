<template>
  <div
    class="tw-absolute tw-right-6 tw-top-6 tw-min-w-60 tw-max-w-100 tw-flex tw-flex-col tw-items-end"
  >
    <el-alert
      v-for="alert in alerts"
      :title="alert.text"
      :type="alert.type"
      show-icon
      :closable="false"
      class="!tw-mb-1 tw-flex"
    />
  </div>
</template>

<script setup lang="ts">
const alertStore = useAlertsStore();
const { alerts } = storeToRefs(alertStore);
</script>
