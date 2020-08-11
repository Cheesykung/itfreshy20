<template>
  <nav class="flex flex-row justify-between items-center w-screen py-8 px-6 md:px-12 bg-dark text-gray-200">
    <div class="flex flex-row justify-center items-center text-2xl">
    <div class="hidden lg:visible ">
      <router-link to="/dashboard" class="px-6 py-2 text-sm font-semibold hover:shadow-outline bg-blue-500 rounded-full">DASHBOARD</router-link>
      <router-link to="/leaderboard" class="px-6 py-2 text-sm font-semibold hover:shadow-outline bg-blue-500 rounded-full">LEADER BOARD</router-link>
    </div>
    <i class="fas fa-bars text-gray-300"></i>
    </div>
    <div class="flex flex-row justify-center items-center space-x-8 text-2xl">
      <i class="fas fa-cog text-gray-300"></i>
    </div>
  </nav>
</template>