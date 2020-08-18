<template>
  <section class="w-screen h-screen">
    <div class="flex justify-center content-center h-full xl:px-40">
      <div
        class="container bg-gray-900 bg-opacity-75 px-4 md:px-16 xl:mx-16 flex flex-col space-y-12 justify-start py-24"
      >
        <h1 class="text-4xl text-gray-300">
          <slot name="headline"></slot>
        </h1>
        <slot name="body">
          
        </slot>
      </div>
    </div>
  </section>
</template>