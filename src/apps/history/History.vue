<template>
  <v-data-table
    :headers="headers"
    :items="portfolioHistory"
    hide-actions
    class="elevation-1">
    <template
      slot="items"
      slot-scope="props">
      <td class="strong">{{ props.item.name }}</td>
      <td>{{ props.item.side }}</td>
      <td>{{ props.item.count }}</td>
      <td>{{ props.item.price }}</td>
      <td>{{ props.item.sellPrice }}</td>
      <td :class="getColor(props.item)">
        {{ props.item.sellPrice ? props.item.sellPrice - props.item.price : null }}
      </td>
      <td>{{ dateFormatter(props.item.date) }}</td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'History',
  metaInfo: {
    title: 'v-stock - History',
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Sell/Buy', value: 'side', align: 'center' },
        { text: 'Count', value: 'count', align: 'center' },
        { text: 'Bue price', value: 'price', align: 'center' },
        { text: 'Sell price', value: 'sellPrice', align: 'center' },
        { text: 'Profit', align: 'center' },
        { text: 'Date', value: 'date', align: 'center' },
      ],
    };
  },
  computed: {
    ...mapGetters(['portfolioHistory']),
  },
  methods: {
    dateFormatter(date) {
      if (!date) return;
      const noFormatDate = new Date(JSON.parse(date));
      const fullYear = `${noFormatDate.getDate()}.${noFormatDate.getMonth()}.${noFormatDate.getFullYear()}`;
      const time = `${noFormatDate.getHours()}:${noFormatDate.getMinutes()}`;

      return `${fullYear} / ${time}`;
    },

    getColor({ sellPrice, price }) {
      if (!sellPrice) return null;

      return sellPrice - price > 0 ? 'colorGreen' : 'colorRed';
    },
  },
};
</script>

<style scoped>

  .strong {
    font-weight: bold;
    text-align: left;
  }

  .colorRed {
    color: tomato;
  }

  .colorGreen {
    color: limegreen;
  }

</style>
