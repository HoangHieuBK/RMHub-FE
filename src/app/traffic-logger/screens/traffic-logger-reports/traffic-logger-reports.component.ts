import 'chartjs-plugin-zoom';

import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
    selector: 'rmhub-traffic-logger-reports',
    templateUrl: './traffic-logger-reports.component.html',
    styleUrls: ['./traffic-logger-reports.component.scss']
})
export class TrafficLoggerReportsComponent implements OnInit {
        LineChart: any;
    form: FormGroup;
    constructor(private fb: FormBuilder) { }
    dataVehicle: number[] = [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
    ];
    // [239, 318, 200, 110, 260, 405, 160, 200, 340, 700, 112, 132, 668];
    dataOccupation: number[] = [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
    ];
    // [66, 90, 150, 30, 58, 85, 76, 100, 124, 174];
    dataAverage: number[] = [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
    ];
    // [81, 100, 132, 63, 6, 75, 32, 80, 113, 149];
    dataLabels: string[] = []; // ['03:17', '03:42', '03:56', '04:00', '04:11', '04:24', '04:42', '04:58', '05:25', '05:44'];
    max = this.MaxValue();
    min = this.MinValue();
    i: number;
    j: number;

    today = new Date();
    time = '';

    randomScalingFactor() {
        return Math.round(Math.random() * 100 * (Math.random() > 0.5 ? 1 : 1));
    }
    getTime(timezone: string): any {
        return formatDate(this.today, 'HH:mm', 'en-US', '+' + timezone);
    }

    // Max, Min value
    MaxValue(): any {
        const maxArr = [Math.max(...this.dataVehicle), Math.max(...this.dataOccupation), Math.max(...this.dataAverage)];
        return Math.max(...maxArr);
    }
    MinValue(): any {
        const minArr = [Math.min(...this.dataVehicle), Math.min(...this.dataOccupation), Math.min(...this.dataAverage)];
        return Math.max(...minArr);
    }
    averageValue(): any {
        return (this.MaxValue() + this.MinValue()) / 2;
    }
    ngOnInit() {
        this.dataLabels = [this.getTime('700'), this.getTime('720'), this.getTime('750'), this.getTime('825'), this.getTime('855'), this.getTime('909'),
        this.getTime('930'), this.getTime('953'), this.getTime('1012'), this.getTime('1035')];
        this.form = this.fb.group({});
        this.LineChart = new Chart('lineChart', {
            type: 'line',
            data: {
                labels: this.dataLabels,
                datasets: [
                    {
                        data: this.dataVehicle,
                        borderColor: 'red',
                        fill: false,
                        lineTension: 0,
                        borderWidth: 1,
                        pointStyle: 'rect'
                    },
                    {
                        data: this.dataOccupation,
                        borderColor: 'green',
                        fill: false,
                        lineTension: 0,
                        borderWidth: 1,
                        pointStyle: 'rect'
                    },
                    {
                        data: this.dataAverage,
                        borderColor: 'blue',
                        fill: false,
                        lineTension: 0,
                        borderWidth: 1,
                        pointStyle: 'rect'
                    },
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            maxRotation: 100,
                            autoSkip: true
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
                    }]
                },
                pan: {
                    enabled: true,
                    mode: 'xy'
                },
                zoom: {
                    enabled: true,
                    mode: 'xy',
                }
            }
        });
        this.getXScales();
    }
    onSubmit() {
    }

    getXScales() {
        this.i = 0;
        this.j = this.dataLabels.length - 1;
    }

    rSetZoom() {
        this.getXScales();
        this.max = this.MaxValue();
        this.min = this.MinValue();
        this.LineChart.resetZoom();
    }
    zoom() {
        this.max = this.max - this.averageValue() * 0.25;
        this.min = this.min + this.averageValue() * 0.25;
        this.LineChart.options.scales = {
            xAxes: [{
                display: true,
                unitStepSize: 1,
                ticks: {
                    min: this.dataLabels[++this.i],
                    max: this.dataLabels[--this.j]
                }
            }],
            yAxes: [
                {
                    ticks: {
                        min: this.min,
                        max: this.max
                    }
                }
            ],
        };
        this.LineChart.resetZoom();
    }
    pan() {
        this.max = this.max + this.averageValue() * 0.25;
        this.min = this.min - this.averageValue() * 0.25;
        this.LineChart.options.scales = {
            xAxes: [{
                display: true,
                unitStepSize: 1,
                ticks: {
                    min: this.dataLabels[--this.i],
                    max: this.dataLabels[++this.j]
                }
            }],
            yAxes: [
                {
                    ticks: {
                        min: this.min,
                        max: this.max
                    }
                }
            ]
        };
        this.LineChart.resetZoom();
    }

}
