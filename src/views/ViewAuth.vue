<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="!isRegister && 'is-active'" @click="isRegister = false">
          <a>Login</a>
        </li>
        <li :class="isRegister && 'is-active'" @click="isRegister = true">
          <a>Sign up</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">
          {{ formTitle }}
        </div>

        <form action="" @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="credentials.email" class="input" type="email" placeholder="e.g. alexsmith@gmail.com">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-model="credentials.password" class="input" type="password" placeholder="Enter a password">
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary" :disabled="!isSubmitValid">
                {{ formTitle }}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth';

const storeAuth = useStoreAuth()

const isRegister = ref(false)

const formTitle = computed(() => {
  return isRegister.value ? 'Register' : 'Login'
})

const credentials = reactive({
  email: '',
  password: ''
})

const isSubmitValid = computed(() => {
  if (!credentials.email || !credentials.password) {
    return false
  }
  return true
})

const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert('Please enter email and password')
    return
  }

  if (isRegister.value) {
    storeAuth.registerUser(credentials.email, credentials.password)
  } else {
    storeAuth.loginUser(credentials.email, credentials.password)
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
