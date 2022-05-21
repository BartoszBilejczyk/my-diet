<template>
  <h1>Login to Your Account</h1>
  <div class="flex flex-col m-auto w-64">
    <input class="border block m-2" type="text" placeholder="Email" v-model="email" />
    <input class="border block m-2" type="password" placeholder="Password" v-model="password" />
    <button @click="login">Submit</button>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import firebase from 'firebase';
  import { useRouter } from 'vue-router';

  const email = ref('');
  const password = ref('');
  const router = useRouter();

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        router.push({ name: 'home' });
      });
  };
</script>
