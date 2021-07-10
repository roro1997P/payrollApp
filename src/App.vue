<template>
  <template v-if="user">
    <router-view/>
  </template>
  <div v-else>
    <Auth /> 
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { auth } from './utils/firebase';
import Auth from './views/Auth';

export default {
  name: "App",
  components: {
    Auth,
  },
  setup(){ 
    // useStore nos llama a todo nuestro archivo store
    const store = useStore();
    // computed sirve para que se actualicé una variable cada vez que cambia algo, en este caso el estado
    const user = computed( () => store.state.user );

    onMounted( () => {
      auth.onAuthStateChanged( (user) => {
        store.commit("setUser", user)
      });
    });

    return {
      user,
    }
  },
}
</script>