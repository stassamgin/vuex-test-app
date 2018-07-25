<template>
  <v-layout>
        <div class="wrapp">
          <input v-model="inputForm" type="text">
          <h1 class="headline mb-0">Trade or view your portfolio</h1>
          <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          <div class="title">You have {{getTotalCounter}}</div>
          <div>
            TEXT: {{ inputForm }}
          </div>
        </div>

  </v-layout>
</template>

<script>
  export default {
    name: "dashboard",
    computed: {
        getTotalCounter() {
            return this.$store.getters.getTotalCounter
        },

      inputForm: {
        get() {
          return this.$store.getters.getInput
        },
        set(value) {
          this.$store.commit('getInputMutate', value)
        },
      },
    },
    watch: {
      inputForm:(e) => {
        console.log('form change', e)
      },
      getTotalCounter:(e) => {
        console.log('counter change', e)
      },
    },
  }
</script>

<style scoped>

  .wrapp {
    padding: 20px 40px;
  }

  .title {
    font-size: 15px;
    margin-top: 20px;
  }

</style>
