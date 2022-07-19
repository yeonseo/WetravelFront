<template>
  <p>About</p>

  <p>
    <router-link :to="{name: 'Home'}">Home</router-link>
  </p>
  <p>
    <router-link :to="{name: 'About'}">About</router-link>
  </p>
  <p>
    <router-link :to="{name: 'Markup'}">Markup</router-link>
  </p>
</template>

<script>

export default {
  name: 'About',
  components: {
  }
}
</script>
