<template>
  <div>
    <nav class="flex justify-center my-8">
      <router-link to="/">Home</router-link>
      <span class="block mx-3">|</span>
      <router-link to="/stats">Stats</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup></script>

<style></style>
