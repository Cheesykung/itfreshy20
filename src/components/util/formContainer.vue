<template>
  <div
    class="bg-primary-1000 bg-opacity-75 flex flex-col justify-center py-16 md:py-24 space-y-16 md:space-y-20 flex-wrap px-10 md:px-24 lg:mx-48"
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
  caret-color: #524cb6;
  border-bottom: 1px solid #1f1983;
  padding: 0.25rem;
  font-size: .9rem;
  @apply bg-transparent text-primary-250 bg-opacity-25 rounded-none border-t-0 border-l-0 border-r-0;
}

.base-input:focus {
  outline: 0;
  box-shadow: none;
}

option {
  @apply bg-primary-900 text-primary-300;
}

select {
  @apply border-0;
}
</style>