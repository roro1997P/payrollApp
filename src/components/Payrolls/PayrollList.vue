<template>
    <div class="payroll-list">
        <p class="payroll-list__not-found" v-if="payrolls?.lenght === 0">No tienes ninguna nomina</p>
        <div class="payroll-list__payroll" v-for="payroll in payrolls" :key="payroll.id">
            <p>{{ formatDate(payroll.dateString) }}</p>
            <div class="action">
                <a :href="payroll.payrollUrl" target="_blank" class="ui button positive">Descargar</a>
                <button class="ui button red" @click="deletePayroll(payroll.id)">Eliminar</button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/es';
import { db, auth } from '../../utils/firebase';

export default {
    name: "PayrollList",
    props: {
        payrolls: Array,
        getPayrolls: Function,
    },
    setup(props) {

        const formatDate = (date) => {
            return moment(date).format("MMMM [del] YYYY");
        };

        const deletePayroll = async (id) => {
            try {
                await db.collection(auth.currentUser.uid).doc(id).delete();
                props.getPayrolls();
            } catch (error) {
                console.log(error);
            }
        };

        return {
            formatDate,
            deletePayroll,
        }
    },
}
</script>

<style scoped>
.payroll-list__not-found {
    text-align: center;
    font-size: 20px;
}
.payroll-list__payroll {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0px;
}
.payroll-list__payroll p {
    margin: 0px;
    text-transform: uppercase;
    font-weight: bold;
}
</style>