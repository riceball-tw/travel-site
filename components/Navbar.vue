<template>
  <nav class="navbar">
    <NuxtLink to="/" class="logo">Travel Site</NuxtLink>
    <ul class="navbar-list">
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="/favorite">Favorite</NuxtLink></li>
    </ul>
  </nav>
</template>

<style lang="scss">
  .navbar {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-list {
    display: flex;
    gap: 1rem;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }

</style>