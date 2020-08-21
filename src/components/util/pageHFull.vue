<template>
  <section class="w-screen min-h-screen">
    <div class="flex justify-center content-center h-full xl:px-40">
      <div
        class="container bg-primary-1100 bg-opacity-75 px-4 md:px-16 xl:mx-16 flex flex-col space-y-16 justify-start py-20"
      >
        <h1 class="text-4xl text-primary-200 uppercase">
          <slot name="headline"></slot>
        </h1>
        <slot name="body">
          
        </slot>
      </div>
    </div>
  </section>
</template>