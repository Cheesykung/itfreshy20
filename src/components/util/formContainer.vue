<template>
  <div
    class="bg-gray-900 bg-opacity-75 flex flex-col justify-center py-16 md:py-24 space-y-8 md:space-y-20 flex-wrap px-10 md:px-24 md:mx-48 rounded-sm"
  >
    <slot name="content"></slot>
  </div>
</template>
<script>
export default {
  name: "formContain"
};
</script>
<style scoped>
/*** Form base styles ***/
.base-input {
  @apply bg-gray-800 py-2 px-3 text-gray-500 bg-opacity-50 rounded-sm;
  caret-color: #a0aec0;
}

.base-input:focus {
  outline: 0;
  box-shadow: none;
}
</style>