<script setup>
import { computed, onMounted, ref } from 'vue'

const formForSubmit = ref({
    fio: null,
    birthday: null,
    address: null,
    email: null,
    cardNumber: null,
    approve: false
})

const rules = {
    required: value => !!value || 'Обязательное поле',
    card: value => value.length == 16 || 'Введите 16 цифр номера карты',
    email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Некорректный e-mail'
    },
}

const status = ref(null)
const formCard = ref(null);

const formSubmit = async function () {
    const { valid } = await formCard.value.validate()
    if (valid && cart.value.length > 0) {
        formForSubmit.value["order"] = cart.value
        fetch("https://httpbin.org/post", {
            method: "POST",
            body: JSON.stringify(formForSubmit.value)
        }).then((res) => status.value = res.status)
    }
}

const cart = ref([])

const clearCart = function () {
    cart.value = []
    localStorage.setItem('cart', JSON.stringify({}))
}


onMounted(() => {
    const cartData = JSON.parse(localStorage.getItem('cart'))
    cart.value = Object.entries(cartData).map((el) => el[1])
})

const totalCost = computed(() => {
    return cart.value.reduce((accumulator, currValue) => accumulator + currValue.amount * currValue.price, 0).toFixed(2)
})
</script>

<template>
    <v-container fluid>
        <AppHeader />
        <v-row>
            <v-col cols="6">
                <v-card prepend-icon="mdi-account-box-edit-outline" title="Офомление заказа">
                    <v-card-text>
                        <v-form @submit.prevent="formSubmit" ref="formCard">
                            <v-text-field v-model="formForSubmit.fio" :rules="[rules.required,]"
                                label="ФИО покупателя"></v-text-field>
                            <v-text-field v-model="formForSubmit.birthday" :rules="[rules.required,]"
                                label="Дата рождения" type="date"></v-text-field>
                            <v-text-field v-model="formForSubmit.address" :rules="[rules.required,]"
                                label="Адрес доставки"></v-text-field>
                            <v-text-field v-model="formForSubmit.email" :rules="[rules.required, rules.email]"
                                label="Email"></v-text-field>
                            <v-text-field v-model="formForSubmit.cardNumber" :rules="[rules.required, rules.card]"
                                label="Номер банковской карты" type="number"></v-text-field>
                            <v-checkbox label="Согласие с правилами работы магазина" v-model="formForSubmit.approve"
                                :rules="[rules.required,]"></v-checkbox>
                            <v-btn class="mt-2" type="submit" block>Отправить</v-btn>
                        </v-form>
                        <v-alert v-if="status === 200" class="mt-4" type="success"
                            text="Заказ успешно отправлен"></v-alert>
                        <v-alert v-if="status !== 200 && status" class="mt-4" type="warning"
                            text="Что-то пошло не так"></v-alert>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card prepend-icon="mdi-cart-check" title="Корзина">
                    <v-card-text v-if="cart">
                        <v-table>
                            <thead>
                                <tr>
                                    <th>Наименование</th>
                                    <th>Количество</th>
                                    <th>Стоимость</th>
                                    <th>Итого</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cart">
                                    <th>{{ item.title }}</th>
                                    <th>{{ item.amount }}</th>
                                    <th>{{ item.price }}</th>
                                    <th>{{ item.amount * item.price }}</th>
                                </tr>
                            </tbody>
                        </v-table>
                        <p class="mt-3 text-subtitle-2">Итого к оплате: {{ totalCost }} тубрика</p>
                        <v-btn class="mt-3" @click="clearCart">Очистить корзину</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
