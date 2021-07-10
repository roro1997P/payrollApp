<template>
  <div class="login">
      <h2>Iniciar sesión</h2>
      <form class="ui form" @submit.prevent="onLogin">
          <div class="field">
              <input 
                    type="text" 
                    placeholder="Correo electrónico"
                    v-model="formData.email"
                    :class="{ error: formError.email }"
                >
          </div>
          <div class="field">
              <input 
                    type="password" 
                    placeholder="Constraseña"
                    v-model="formData.password"
                    :class="{ error: formError.password }"
                >
          </div>
          <button type="submit" class="ui button positive fluid" :class="{ loading }">Entrar</button>
          <p @click="changeForm">Crear nueva cuenta</p>
      </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import * as yup from 'yup';
import { auth } from '../../utils/firebase';

export default {
    name: "Login",
    props: {
        changeForm: Function,
    },
    setup() {
        let formData = {};
        let formError = ref({});
        let loading = ref(false);

        const schemaForm = yup.object().shape({
            email: yup.string().email(true).required(),
            password: yup.string().required(),
        });

        const onLogin = async () => {
            loading.value = true;
            formError.value = {};

            try {
                await schemaForm.validate(formData, { abortEarly: false });
                try {
                    const { email, password } = formData;
                    await auth.signInWithEmailAndPassword(email, password);
                } catch (error) {
                    console.log(error);
                }
            } catch (err) {
                err.inner.forEach((error) => {
                    formError.value[error.path] = error.message;
                });
            }
            loading.value = false;
        };

        return {
            formData,
            onLogin,
            formError,
            loading
        }
    }
}
</script>

<style scoped>
.login {
    background-color: #fff;
    padding: 30px;
    box-shadow: 0px 0px 38px -5px rgba(0,0,0,0.45);
    width: 300px;
    border-radius: 10px;
}
.login h1 {
    text-align: center;
    margin-bottom: 30px;
}
.login form input.error{
    border-color: #faa;
    background-color: #ffeded;
}
.login p {
    text-align: center;
    margin-top: 30px;
}
.login p:hover {
    cursor: pointer;
    opacity: 0.6;
}
</style>