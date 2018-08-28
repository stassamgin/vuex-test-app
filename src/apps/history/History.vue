<template>
  <v-data-table
    :headers="headers"
    :items="portfolioHistory"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.side }}</td>
      <td>{{ props.item.count }}</td>
      <td>{{ props.item.price }}</td>
      <td>{{ props.item.sellPrice }}</td>
      <td>{{ props.item.sellPrice ? props.item.price - props.item.sellPrice : null }}</td>
      <td>{{ dateFormatter(props.item.date) }}</td>
    </template>
  </v-data-table>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: "history",
    metaInfo: {
      title: 'v-stock - History',
    },
    data () {
      return {
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Sell/Buy', value: 'side', align: 'center', },
          { text: 'Count', value: 'count', align: 'center', },
          { text: 'Bue price', value: 'price', align: 'center', },
          { text: 'Sell price', value: 'sellPrice', align: 'center', },
          { text: 'Profit', align: 'center', },
          { text: 'Date', value: 'date', align: 'center', }
        ],
      }
    },
    computed: {
      ...mapGetters(['portfolioHistory']),
    },
    methods: {
      dateFormatter(date) {
        if(!date) return;
        const noFormatDate = new Date(JSON.parse(date));
        const fullYear = `${noFormatDate.getDate()}.${noFormatDate.getMonth()}.${noFormatDate.getFullYear()}`
        const time = `${noFormatDate.getHours()}:${noFormatDate.getMinutes()}`

        return fullYear + ' / ' + time;
      }
    },
    watch: {
      portfolioHistory(val) {
        console.log('SDFSDFSDF')
        console.log(val)
      }
    }
  }
</script>

<style scoped>

</style>
