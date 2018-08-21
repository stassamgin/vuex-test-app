<template>
    <v-layout column class="item">
        <v-toolbar :color="getColor" dark>
            <v-toolbar-title>
                {{data.name}}
                <span class="price">
                  {{data.price}}
                </span>
                <span class="count" v-if="data.count">
                  {{data.count}}
              </span>
            </v-toolbar-title>
        </v-toolbar>
        <v-card>
            <div class="input">
                <v-text-field
                        v-model="count"
                        label="Quantity"
                ></v-text-field>
            </div>
            <v-card-actions class="action">
                <v-btn
                        :color="getColor"
                        dark
                        @click.number="handleClick"
                > {{ (this.eventType === 'sell') ? 'Sell Now' : 'Buy now' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
</template>

<script>
    export default {
        name: "stock-component",
        props: {
            data: Object,
            eventType: String,
            clickEvent: Function
        },
        data() {
            return {
                count: ''
            }
        },
        computed: {
            getColor() {
                if (this.eventType === 'sell') {
                    return 'red darken-1'
                } else {
                    return 'cyan darken-1'
                }
            }
        },
        methods: {
            handleClick() {
                this.clickEvent({
                    count: this.count,
                    data: this.data
                })
                this.count = ''
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
