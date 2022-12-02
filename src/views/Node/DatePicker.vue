<template>
    <div>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-menu v-model="menu_start" :close-on-content-click="false"
                    transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs1 }">
                        <v-text-field v-model="date_start" label="Tanggal Mulai" prepend-icon="mdi-calendar" readonly
                            v-bind="attrs1" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date_start" @input="menu_start=false" @change="updateDateStart">
                        <v-spacer></v-spacer>
                    </v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-menu v-model="menu_end" :close-on-content-click="false"
                    transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs2 }">
                        <v-text-field v-model="date_end" label="Tanggal Akhir" prepend-icon="mdi-calendar" readonly
                            v-bind="attrs2" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date_end" @input="menu_end=false" @change="updateDateEnd">
                        <v-spacer></v-spacer>
                    </v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-btn outlined color="green lighten-1" class="mr-4" @click="showChart">Lihat</v-btn>
                <v-btn outlined color="blue lighten-1"  @click="showThisDayChart">Lihat Data Hari Ini</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: ['dateStart','dateEnd','showChart','showThisDayChart'],
    name: 'DatePicker',
    data() {
        return {
            menu_start: false,
            menu_end: false,
            date_start: null,
            date_end: null,
        }
    },
    methods:{
        updateDateStart(event){
            this.$emit('updateStart', event)
        },
        updateDateEnd(event){
            this.$emit('updateEnd', event)
        }
    },
    created: function(){
        this.date_start=this.dateStart;
        this.date_end=this.dateEnd;
    }
}
</script>