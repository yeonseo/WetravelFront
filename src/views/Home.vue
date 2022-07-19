<template>
  <div>
    <p>Home</p>

    <p>
      <router-link :to="{name: 'Home'}">Home</router-link>
    </p>
    <p>
      <router-link :to="{name: 'About'}">About</router-link>
    </p>
    <p>
      <router-link :to="{name: 'Markup'}">Markup</router-link>
    </p>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
