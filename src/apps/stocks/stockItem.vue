<template>
    <v-layout column class="item">
        <v-toolbar color="primary"  dark>
            <v-toolbar-title>
                {{data.name}}
                <span class="price">
                  {{data.price}}
                </span>
            </v-toolbar-title>
        </v-toolbar>
        <v-card>
            <div class="input">
                <v-text-field
                    v-model.number="itemCounter"
                    type="number"
                    label="Quantity"
                >
                </v-text-field>
            </div>
            <v-card-actions class="action">
                <v-btn
                    color="primary"
                    :disabled="!(isAuth && itemCounter && portfolioCount > itemCounter * data.price)"
                    @click.number="handleClick"
                > Buy now
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex';

  import {
    BUE_PORTFOLIO_ITEM,
    BUE_PORTFOLIO_EXIST_ITEM,
    BUE_PORTFOLIO_CREATE_ITEM,
    SELL_PORTFOLIO_ITEM,
    SET_PORTFOLIO_STOCK,
    SET_PORTFOLIO_HISTORY,
    SET_PORTFOLIO_COUNT,
    FETCH_PORTFOLIO,
    SET_PORTFOLIO,
  } from '@/apps/portfolio/store/types';

  export default {
    name: "stock-item",
    props: {
      data: Object,
    },
    data() {
      return {
        itemCounter: null,
      }
    },
    computed: {
      ...mapGetters(['portfolioCount', 'isAuth']),
    },
    methods: {
      handleClick() {
        const { count, id } = this.data;
        this.$store.dispatch(BUE_PORTFOLIO_ITEM, { count, id })
        this.itemCounter = ''
      }
    }
  }
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

    .count::before {
        content: '(Count: ';
        margin-left: 5px;
    }

    .count::after {
        content: ')';
    }

    .price {
        font-size: 14px;
    }

    .price::before {
        content: '(Price: ';
        margin-left: 5px;
    }

    .price::after {
        content: ')';
    }

</style>
