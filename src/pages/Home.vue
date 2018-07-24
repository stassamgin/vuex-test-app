<template>
  <v-layout>
    <appDashboard />
  </v-layout>
</template>

<script>
  import Dashboard from './dashboard/Dashboard'

  export default {
    name: "home",
    components: {
      appDashboard: Dashboard,
    }
  }
</script>

<style scoped>

</style>
