<template>
  <section>
    <picture class="rand-container space-y-12 px-4">
      <img src="@/assets/svg/CloseTres.svg" :alt="data.hint" class="animate-bounce" />
      <figure>
        <p class="uppercase text-xl custom-txt">
          {{ data.hint }}
        </p>
      </figure>
    </picture>
  </section>
</template>
<script>
export default {
  props: ['data']
};
</script>
<style scoped>
.rand-container {
  @apply flex flex-col justify-center items-center max-w-xl text-complementary;
}

p.custom-txt {
  /* text-shadow: 3px 3px 20px #EC920F; */
}

.rand-container img {
  user-select: none;
  pointer-events: none;
  -webkit-filter: drop-shadow( 3px 3px 20px #EC920F);
  filter: drop-shadow( 3px 3px 20px #EC920F);
  @apply object-cover max-w-xs;
}
</style>