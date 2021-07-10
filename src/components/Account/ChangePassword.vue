<template>
    <form class="ui form change-password" @submit.prevent="onChangePassword">
        <div class="three fields">
            <div class="field">
                <input 
                    type="password" 
                    placeholder="Contraseña actual" 
                    v-model="formData.password" 
                    :class="{ error: formError.password }"
                />
            </div>
            <div class="field">
                <input 
                    type="password" 
                    placeholder="Nueva contraseña" 
                    v-model="formData.newPassword" 
                    :class="{ error: formError.newPassword }"
                />
            </div>
            <div class="field">
                <input 
                    type="password" 
                    placeholder="Repite la nueva contraseña" 
                    v-model="formData.newPasswordRepeat" 
                    :class="{ error: formError.newPasswordRepeat }"
                />
            </div>
        </div>
        <p v-if="messageError">{{ messageError }}</p>
        <button type="submit" class="ui button primary" :class="{ loading }">Actualizar</button>
    </form>
</template>

<script>
import * as yup from 'yup';
import { ref } from 'vue';
import { reauthenticate } from '../../utils/firebaseFunctions';
import { auth } from '../../utils/firebase';

export default {
    name: "ChangePassword",
    setup(){
        let formData = {};
        let formError = ref({});
        let loading = ref(false);
        let messageError = ref("");

        const schemaForm = yup.object().shape({
            password: yup.string().required(true),
            newPassword: yup.string().required(true),
            newPasswordRepeat: yup.string().required(true).oneOf([yup.ref("newPassword")], true),
        });

        const onChangePassword = async () => {
            formError.value = {};
            messageError.value = "";
            loading.value = true;

            try {
                await schemaForm.validate(formData, { abortEarly: false });
                try {
                    const { password, newPassword } = formData;
                    await reauthenticate(password);
                    await auth.currentUser.updatePassword(newPassword);
                    auth.signOut();
                } catch (error) {
                    console.log(error);
                    messageError.value = error.message;
                }
            } catch (err) {
                err.inner.forEach((error) => {
                    formError.value[ error.path ] = error.message;
                });
            }
            loading.value = false;
        };

        return {
            formData,
            formError,
            loading,
            messageError,
            onChangePassword,
        }
    }
}
</script>

<style scoped>
.ui.form.change-password {
    text-align: center;
}
.ui.form.change-password input.error {
    border-color: #faa;
    background-color: #ffeded;
}
.ui.button {
    margin-top: 5px;
}
</style>