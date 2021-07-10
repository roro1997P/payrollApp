<template>
    <form class="ui form change-name" @submit.prevent="onChangeName">
        <input type="text" placeholder="Nombre y apellidos" v-model="name" :class="{ error: formError }"/>
        <button class="ui button primary" type="submit" :class="{loading}">Actualizar</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import * as yup from 'yup';
import { auth } from '../../utils/firebase';
import { useStore } from 'vuex';

export default {
    name: "ChangeName",
    setup() {
        let name = ref("");
        let formError = ref(false);
        let loading = ref(false);

        const store = useStore();

        const schemaForm = yup.object().shape({
            name: yup.string().min(6, true).required(true),
        });

        const onChangeName = async () => {
            loading.value = true;
            formError.value = false;
            try {
                await schemaForm.validate({ name: name.value }, { abortEarly: false });
                try {
                    await auth.currentUser.updateProfile({
                        displayName: name.value
                    });
                    store.dispatch("reloadUser");
                } catch (error) {
                    console.log(error);
                }
            } catch (err) {
                err.inner.forEach( (error) => {
                    formError.value = error.message;
                });
            }
            loading.value = false;
        };

        return {
            name,
            onChangeName,
            formError,
            loading
        }
    },
}
</script>

<style scoped>
.ui.form.change-name {
    text-align: center;
}
.ui.form.change-name input.error {
    border-color: #faa;
    background-color: #ffeded;
}
.ui.button {
    margin-top: 20px;
}
</style>