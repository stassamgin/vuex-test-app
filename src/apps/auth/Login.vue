<template>
  <v-content>
    <v-dialog
      :value="value"
      persistent
      max-width="450"
    >
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ createUser ? 'Create account' : 'Login form' }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :prepend-icon="createUser ? null : 'person'"
              :rules="emailRules"
              name="email"
              label="Email"
              type="text"></v-text-field>
            <v-text-field
              v-model="password"
              :prepend-icon="createUser ? null : 'lock'"
              :rules="passwordRules"
              :counter="6"
              name="password"
              label="Password"
              type="password"></v-text-field>
            <v-text-field
              v-if="createUser"
              v-model="passwordConfirm"
              :rules="passwordConfirmRules"
              :counter="6"
              name="password"
              label="Password"
              type="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions row>
          <v-btn
            flat
            small
            left
            color="primary"
            v-if="!createUser"
            @click ="formTransfer"
          >
            Registration
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-actions row class="pb-4">
          <v-spacer></v-spacer>
          <v-btn
            flat
            right
            @click ="cancelForm"
          >
            Cancel
          </v-btn>
          <v-btn
            right
            color="primary"
            :disabled="!valid"
            :loading="isLoading"
            @click="finishForm"
          >
            {{ createUser ? 'Create account' : 'Login' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-content>
</template>

<script>

import { mapMutations, mapGetters, mapActions } from 'vuex';
import {
  SHOW_MODAL
} from '@/store/types';
import {
  CREATE_USER,
  LOGIN_USER,
} from '@/apps/auth/store/types';


  export default {
    name: "login",
    data() {
      return {
        valid: null,
        email: null,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        password: null,
        passwordRules: [
          v => !!v || 'Password is required',
          v => v && v.length >= 6 || 'Password must be more 6 characters'
        ],
        passwordConfirm: null,
        passwordConfirmRules: [
          v => !!v || 'Password Confirm is required',
          v => v === this.password || 'Passwords not the same'
        ],
        createUser: false,
      }
    },
    computed: {
      ...mapGetters(['isLoading']),

      value: {
        get() {
          return this.$store.getters.isShowModal
        },
        set() {
          this.SHOW_MODAL(false)
        },
      }
    },
    methods: {
      ...mapMutations([ SHOW_MODAL ]),
      ...mapActions([ CREATE_USER, LOGIN_USER ]),

      formTransfer() {
        this.email = null;
        this.password = null;
        this.passwordConfirm = null;
        this.createUser = true;
      },

      cancelForm() {
        this.email = null;
        this.password = null;
        this.passwordConfirm = null;
        this.createUser = false;
        this.SHOW_MODAL(false)
      },

      finishForm() {
        [CREATE_USER](this.email, this.password)
        console.log('TYTYTTY')
      }
    },
  }
</script>

<style scoped>

</style>
