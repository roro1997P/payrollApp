<template>
    <div class="upload-payroll">
        <button class="ui button primary" @click="showCloseForm">Nueva nomina</button>
        <form class="ui form upload-payroll__form" :class="{ open: showForm }" @submit.prevent="handleSubmit">
            <div class="field">
                <label for="file" class="ui icon button">
                    <i class="file icon" />
                    Seleccionar nomina
                    <span v-if="file">( {{ file.name }} )</span>
                </label>
                <input type="file" id="file" style="display: none" @change="uploadFile"/>
            </div>
            <div class="field">
                <div class="ui calendar">
                    <div class="ui input left icon">
                        <input type="date" @change="changeDate" :value="date"/>
                    </div>
                </div>
            </div>
            <button class="ui button positive" :class="{ loading }" >
                Subir nomina
            </button>
            <p v-if="error" >{{ error }}</p>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { auth, storage, db } from '../../utils/firebase';

export default {
    name: "UploadPayroll",
    props: {
        getPayrolls: Function,
    },
    setup(props) {
        let showForm = ref(false);
        let file = ref(null);
        let date = ref(null);
        let loading = ref(false);
        let error = ref(null);

        const showCloseForm = () => {
            showForm.value = !showForm.value;
        };

        const uploadFile = (e) => {
            error.value = null;
            const fileTemp = e.target.files[0];

            if( fileTemp.type === "application/pdf" ) {
                file.value = fileTemp;
            } else {
                error.value = "Sólo se admiten ficheros .pdf"
            };
        };

        const changeDate = (e) => {
            date.value = e.target.value;
        };


        const handleSubmit = async () => {
            if( file.value && date.value ) {
                loading.value = true;
                try {
                    const nameFile = uuidv4();
                    await storage.ref(auth.currentUser.uid).child(`${nameFile}.pdf`).put(file.value);
                    const payrollUrl = await storage.ref(`${auth.currentUser.uid}/${nameFile}.pdf`).getDownloadURL();
                    await db.collection(auth.currentUser.uid).add({
                        payrollUrl,
                        date: new Date(date.value),
                        dateString: date.value,
                    });
                    props.getPayrolls();
                } catch (error) {
                    console.log(error);
                }

                loading.value = false;
                file.value = null;
                date.value = null;
                showForm.value = false;
                error.value = null;
            } else {
                error.value = "Sube una nomina y selecciona la fecha de la nomina";
            }

        };

        return {
            showForm,
            file,
            date,
            loading,
            error,
            showCloseForm,
            uploadFile,
            handleSubmit,
            changeDate,
        }
    },
}
</script>

<style scoped>
.upload-payroll__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    height: 0px;
    overflow: hidden;
    transition: height 0.3s ease;
}

.open {
    height: 200px;
}
</style>