<template>
  <v-layout
    column
    class="item">
    <v-toolbar
      color="secondary"
      dark>
      <v-toolbar-title>
        {{ data.name }}
        <span class="price">
          (Bue price: {{ data.price }} |
        </span>
        <span class="price">
          Current price: {{ data.currentPrice }} |
        </span>
        <span class="count">
          Count: {{ data.count }} )
        </span>
      </v-toolbar-title>
    </v-toolbar>
    <v-card>
      <div class="input">
        <v-text-field
          v-model.number="count"
          type="number"
          label="Quantity" />
      </div>
      <v-card-actions class="action">
        <v-btn
          :disabled="count > data.count || !count"
          color="secondary"
          @click="handleClick">
          Sell Now
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import {
  SELL_PORTFOLIO_ITEM,
} from '@/apps/portfolio/store/types';

export default {
  name: 'PortfolioItem',
  props: {
    data: Object,
  },
  data() {
    return {
      count: '',
    };
  },
  methods: {
    handleClick() {
      this.$store.dispatch(SELL_PORTFOLIO_ITEM, { item: this.data, sellItemCount: this.count });
      this.count = '';
    },
  },
};
</script>

<style scoped>
.item {
  width: 50%;
  max-width: 50%;
  padding: 15px 30px;
}

.action {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}

.input {
  padding: 20px 30px 0;
  max-width: 600px;
}

.count {
  font-size: 14px;
}

.price {
  font-size: 14px;
}

</style>
