<template>
  <div class="bg-gray-900 flex flex-col justify-center py-16 space-y-10 px-8 md:px-16 md:mx-8">
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
  @apply bg-gray-700 py-1 px-3 text-gray-400; 
}

.base-input:focus {
  outline: 0;
}
</style>