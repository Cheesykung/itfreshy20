<template>
  <div
    class="bg-primary-1000 bg-opacity-75 flex flex-col justify-center py-16 md:py-24 space-y-16 md:space-y-20 flex-wrap px-6 md:px-24 md:mx-48 rounded-md"
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
  @apply bg-transparent py-2 px-2 text-primary-250 bg-opacity-25 rounded-none border-t-0 border-l-0 border-r-0;
  caret-color: #524cb6;
  border-bottom: 1px solid #1f1983;
}

.base-input:focus {
  outline: 0;
  box-shadow: none;
}

</style>