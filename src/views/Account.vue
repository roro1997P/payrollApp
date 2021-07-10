<template>
    <div class="account">
        <BasicLayout>
            <h1>Bienvenido a los ajustes</h1>
            <div class="account__section">
                <p class="title">Cambiar nombre <span v-if="user.displayName">( {{ user.displayName }} )</span></p>
                <ChangeName />
            </div>
            <div class="account__section">
                <p class="title">Cambiar email <span>( {{ user.email }} )</span></p>
                <ChangeEmail />
            </div>
            <div class="account__section">
                <p class="title">Cambiar contraseña</p>
                <ChangePassword />
            </div>
        </BasicLayout>
    </div>
</template>

<script>
import BasicLayout from '../layouts/BasicLayout';
import { computed } from 'vue';
import { useStore } from 'vuex';
import ChangeName from '../components/Account/ChangeName';
import ChangeEmail from '../components/Account/ChangeEmail';
import ChangePassword from '../components/Account/ChangePassword';

export default {
    name: "Account",
    components: {
        BasicLayout,
        ChangeName,
        ChangeEmail,
        ChangePassword
    },
    setup(){
        const store = useStore();
        const user = computed( () => store.state.user );

        return {
            user,
        }
    }
}
</script>

<style scoped>
.account h1 {
    margin: 50px 0px;
    text-align: center;
}
.account__section {
    position: relative;
    padding: 10px;
    border: 1px solid #16212B;
    padding-top: 25px;
    margin-top: 40px;
}

.account__section .title {
    position: absolute;
    top: -12px;
    background-color: #16212B;
    color: #fff;
    padding: 2px 10px;
}
</style>