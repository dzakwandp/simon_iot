<template>
    <div>
        <v-card class="ma-4 pb-6 white--text" color="grey lighten-4">
            <router-link to="/node" class="text-decoration-none">
                <v-btn plain class="ml-10 mt-6">
                    <v-icon>mdi-chevron-left</v-icon>
                    Kembali
                </v-btn>
            </router-link>
            <v-card-title>
                <h2 class="green--text mx-auto font-weight-light">Tambak: {{ node.name }}</h2>
            </v-card-title>
            <v-card class="mx-16 my-6 px-12 py-6">
                <v-tabs v-model="tab" color="green lighten-1">
                    <v-tab v-for="item in table" :key="item"
                        @click="changeTab(item.kode); changeUnit(item.unit); clearChart();">
                        <v-icon>{{ item.icon }}</v-icon>
                        {{ item.text }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab" class="mt-6">
                    <v-tab-item v-for="item in table" :key="item" class="pb-4">
                        <template v-if="item.kode == 'info'">
                            <info></info>
                        </template>
                        <template v-if="item.kode == 'pH'">
                            <DatePicker :dateStart="dateStart" :dateEnd="dateEnd" :showChart="showChart" :showThisDayChart="showThisDayChart"
                                @updateStart="updateStartDate" @updateEnd="updateEndDate"></DatePicker>
                            <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData"
                                :chart-id="chartId" :dataset-id-key="datasetIdKey" :plugins="plugins"
                                :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
                            <template>
                                <v-alert dense type="error">
                                    Jika nilai {{ item.kode }} ada diatas garis merah, berarti nilai {{ item.kode }}
                                    terlalu
                                    tinggi
                                </v-alert>
                                <v-alert dense type="warning">
                                    Jika nilai {{ item.kode }} ada dibawah garis kuning, berarti nilai {{ item.kode }}
                                    terlalu rendah
                                </v-alert>
                            </template>
                        </template>
                        <template v-if="item.kode == 'Suhu'">
                            <DatePicker :dateStart="dateStart" :dateEnd="dateEnd" :showChart="showChart" :showThisDayChart="showThisDayChart"
                                @updateStart="updateStartDate" @updateEnd="updateEndDate"></DatePicker>
                            <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData"
                                :chart-id="chartId" :dataset-id-key="datasetIdKey" :plugins="plugins"
                                :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
                            <template>
                                <v-alert dense type="error">
                                    Jika nilai {{ item.kode }} ada diatas garis merah, berarti nilai {{ item.kode }}
                                    terlalu
                                    tinggi
                                </v-alert>
                                <v-alert dense type="warning">
                                    Jika nilai {{ item.kode }} ada dibawah garis kuning, berarti nilai {{ item.kode }}
                                    terlalu rendah
                                </v-alert>
                            </template>
                        </template>
                        <template v-if="item.kode == 'TDS'">
                            <DatePicker :dateStart="dateStart" :dateEnd="dateEnd" :showChart="showChart" :showThisDayChart="showThisDayChart"
                                @updateStart="updateStartDate" @updateEnd="updateEndDate"></DatePicker>
                            <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData"
                                :chart-id="chartId" :dataset-id-key="datasetIdKey" :plugins="plugins"
                                :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
                            <template>
                                <v-alert dense type="error">
                                    Jika nilai {{ item.kode }} ada diatas garis merah, berarti nilai {{ item.kode }}
                                    terlalu
                                    tinggi
                                </v-alert>
                                <v-alert dense type="warning">
                                    Jika nilai {{ item.kode }} ada dibawah garis kuning, berarti nilai {{ item.kode }}
                                    terlalu rendah
                                </v-alert>
                            </template>
                        </template>
                        <!-- <template v-if="item.kode == 'Ketinggian'">
                            <DatePicker :dateStart="dateStart" :dateEnd="dateEnd" :showChart="showChart"
                                @updateStart="updateStartDate" @updateEnd="updateEndDate"></DatePicker>
                            <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData"
                                :chart-id="chartId" :dataset-id-key="datasetIdKey" :plugins="plugins"
                                :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
                            <template>
                                <v-alert dense type="error">
                                    Jika nilai {{ item.kode }} ada diatas garis merah, berarti nilai {{ item.kode }}
                                    terlalu
                                    tinggi
                                </v-alert>
                                <v-alert dense type="warning">
                                    Jika nilai {{ item.kode }} ada dibawah garis kuning, berarti nilai {{ item.kode }}
                                    terlalu rendah
                                </v-alert>
                            </template>
                        </template> -->
                        <template v-if="item.kode == 'Oksigen'">
                            <DatePicker :dateStart="dateStart" :dateEnd="dateEnd" :showChart="showChart" :showThisDayChart="showThisDayChart"
                                @updateStart="updateStartDate" @updateEnd="updateEndDate"></DatePicker>
                            <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData"
                                :chart-id="chartId" :dataset-id-key="datasetIdKey" :plugins="plugins"
                                :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
                            <template>
                                <v-alert dense type="error">
                                    Jika nilai {{ item.kode }} ada diatas garis merah, berarti nilai {{ item.kode }}
                                    terlalu
                                    tinggi
                                </v-alert>
                                <v-alert dense type="warning">
                                    Jika nilai {{ item.kode }} ada dibawah garis kuning, berarti nilai {{ item.kode }}
                                    terlalu rendah
                                </v-alert>
                            </template>
                        </template>
                        <template v-if="item.kode == 'Kekeruhan'">
                            <DatePicker :dateStart="dateStart" :dateEnd="dateEnd" :showChart="showChart" :showThisDayChart="showThisDayChart"
                                @updateStart="updateStartDate" @updateEnd="updateEndDate"></DatePicker>
                            <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData"
                                :chart-id="chartId" :dataset-id-key="datasetIdKey" :plugins="plugins"
                                :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
                            <template>
                                <v-alert dense type="error">
                                    Jika nilai {{ item.kode }} ada diatas garis merah, berarti nilai {{ item.kode }}
                                    terlalu
                                    tinggi
                                </v-alert>
                                <v-alert dense type="warning">
                                    Jika nilai {{ item.kode }} ada dibawah garis kuning, berarti nilai {{ item.kode }}
                                    terlalu rendah
                                </v-alert>
                            </template>
                        </template>
                    </v-tab-item>
                </v-tabs-items>
                <v-tabs-items v-model="tab" class="mt-6">
                </v-tabs-items>
            </v-card>
        </v-card>
    </div>
</template>

<script>
import moment from 'moment'
import Info from '@/views/Node/InfoNode.vue'
import DatePicker from '@/views/Node/DatePicker.vue'
import { Line as LineChartGenerator } from 'vue-chartjs'
import annotationPlugin from 'chartjs-plugin-annotation'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement,
    annotationPlugin,
)
import axios from "axios";
export default {
    name: 'LineChart',
    components: {
        LineChartGenerator,
        'info': Info,
        DatePicker
    },
    props: {
        chartId: {
            type: String,
            default: 'line-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            config:'',
            selectedUnit: "",
            selectedKode: "",
            dateStart: null,
            dateEnd: null,
            headTitle: {},
            timer:'',
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    autocolors: false,
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                yMin: 15,
                                yMax: 15,
                                borderColor: 'orange',
                                borderWidth: 2,
                            },
                            line2: {
                                type: 'line',
                                yMin: 0,
                                yMax: 0,
                                borderColor: 'red',
                                borderWidth: 2,
                            }
                        }
                    }
                }
            },
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Data',
                        backgroundColor: 'green',
                        data: []
                    }
                ]
            },
            tab: null,
            table: [
                { icon: 'mdi-information-outline', text: 'Info', kode: 'info' },
                { icon: 'mdi-ph', text: 'PH', kode: 'pH', unit: 'pH' },
                { icon: 'mdi-thermometer', text: 'Suhu', kode: 'Suhu', unit: '°C' },
                { icon: 'mdi-shaker-outline', text: 'TDS', kode: 'TDS', unit: 'ppm' },
                // { icon: 'mdi-diameter-outline', text: 'Ketinggian', kode: 'Ketinggian', unit: 'cm' },
                { icon: 'mdi-gas-cylinder', text: 'Oksigen', kode: 'Oksigen', unit: 'ppm' },
                { icon: 'mdi-water-percent', text: 'Kekeruhan', kode: 'Kekeruhan', unit: 'NTU' },
            ],
            node: []
        }
    },
    methods: {
        clearChart() {
            this.chartData = []
        },
        changeUnit(val) {
            this.selectedUnit = val
        },
        changeTab(val) {
            this.selectedKode = val
            // console.log("changetab",val)
        },
        updateStartDate(val) {
            this.dateStart = val
            // console.log("opo 2",val)
        },
        updateEndDate(val) {
            this.dateEnd = val
            // console.log("opo kek",val)
        },
        showChart() {
            // console.log(this.item)
            // console.log("iki fungsi",this.dateStart, this.dateEnd)
            axios
                // .get('http://localhost:2727/public/api/tambak/between/1?from=' + this.dateStart + '&to=' + this.dateEnd + '&column=' + this.selectedKode)
                .get('http://182.255.0.149/API_Tambak/public/api/tambak/between/'+this.$route.params.id+'?from=' + this.dateStart + '&to=' + this.dateEnd + '&column=' + this.selectedKode, this.config)
                .then(response => {
                    const dataLine = response.data.data
                    this.setAnnotationValue(this.selectedKode)
                    this.chartData = {
                        labels: dataLine.map(item => item.waktu),
                        datasets: [
                            {
                                label: this.selectedKode + ' (' + this.selectedUnit + ')',
                                backgroundColor: 'green',
                                data: dataLine.map(item => item[this.selectedKode]),
                            }
                        ]
                    },
                        console.log(this.chartData)
                        console.log("coba refresh")
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
                // this.timer = setInterval(this.showChart, 3000);
        },
        showThisDayChart() {
            // console.log(this.item)
            // console.log("iki fungsi",this.dateStart, this.dateEnd)
            const thisDay= moment().format("YYYY-MM-DD");
            const tomDay = moment().add(1, 'days').format("YYYY-MM-DD");
            axios
                // .get('http://localhost:2727/public/api/tambak/between/1?from=' + this.dateStart + '&to=' + this.dateEnd + '&column=' + this.selectedKode)
                .get('http://182.255.0.149/API_Tambak/public/api/tambak/between/'+this.$route.params.id+'?from=' + thisDay + '&to=' + tomDay + '&column=' + this.selectedKode, this.config)
                .then(response => {
                    const dataLine = response.data.data
                    this.setAnnotationValue(this.selectedKode)
                    this.chartData = {
                        labels: dataLine.map(item => item.waktu),
                        datasets: [
                            {
                                label: this.selectedKode + ' (' + this.selectedUnit + ')',
                                backgroundColor: 'green',
                                data: dataLine.map(item => item[this.selectedKode]),
                            }
                        ]
                    },
                        console.log(this.chartData)
                        console.log(thisDay, tomDay)
                        console.log("data hari ini")
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
                // this.timer = setInterval(this.showChart, 3000);
        },
        //  'pH' => [7, 9],
        // 'Salinitas' => [15, 25],
        // 'Suhu' => [26, 30],
        // 'Ketinggian' => [25, 40],
        // 'Oksigen' => [4, 8],
        // 'Kekeruhan' => [25, 40],
        setAnnotationValue(selectedKode) {
            let arrValue = [];
            switch (selectedKode) {
                case 'pH':
                    arrValue = [7, 9]
                    break;
                case 'TDS':
                    arrValue = [1000, 3000]
                    break;
                case 'Suhu':
                    arrValue = [26, 30]
                    break;
                // case 'Ketinggian':
                //     arrValue = [25, 40]
                //     break;
                case 'Oksigen':
                    arrValue = [4, 8]
                    break;
                case 'Kekeruhan':
                    arrValue = [25, 40]
                    break;
                default:
                    arrValue = [10, 10]
                    break;
            }
            this.chartOptions.plugins.annotation.annotations.line1.yMin = arrValue[0]
            this.chartOptions.plugins.annotation.annotations.line1.yMax = arrValue[0]
            this.chartOptions.plugins.annotation.annotations.line2.yMin = arrValue[1]
            this.chartOptions.plugins.annotation.annotations.line2.yMax = arrValue[1]
        },
    },
    mounted() {
        let config={
        headers:{
            token:sessionStorage.getItem('token')
        }
    }
    this.config=config
        axios
            // .get('http://localhost:2727/public/api/tambak/' + this.$route.params.id)
            .get('http://182.255.0.149/API_Tambak/public/api/tambak/' + this.$route.params.id, config)
            .then(response => {
                this.node = response.data.data
                console.log(this.node.name)
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
    }
}
</script>