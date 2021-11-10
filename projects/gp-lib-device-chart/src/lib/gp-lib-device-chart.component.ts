/**
 * Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input, OnDestroy, isDevMode } from '@angular/core';
import { GpLibDeviceChartService } from './gp-lib-device-chart.service';
import { InventoryService, Realtime } from '@c8y/client';

@Component({
  selector: 'lib-gp-lib-device-chart',
  templateUrl: './gp-lib-device-chart.component.html',
  styleUrls: []
})
export class GpLibDeviceChartComponent implements OnInit, OnDestroy {
  chartwidgettitle = 'Chart Widget';
  response: any;
  result: any;
  devicesAll: any;
  dataLoaded: Promise<boolean>;
  dataValues: [];
  deviceList = [];
  oldDataset = {};
  realTimeDeviceSub: any[] = [];
  realtimeState = true;
  @Input() config;

  constructor(private deviceChartService: GpLibDeviceChartService, public inventory: InventoryService, public realtimeService: Realtime) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: 'top',
    }
  };
  public barChartType = '';
  public barChartData = [];
  public barChartLabels = [];
  public barChartColors = [];

  /** recalls the create chart function  */
  reloadData() {
    this.createChart();
  }

  /** toggles the realtime state and if the realtime state is turned on the create chart function is called once again */
  toggle() {
    this.realtimeState = !this.realtimeState;
    if (this.realtimeState) {
      this.createChart();
    }
  }
  /** Fetches all the device ids and then subscribe for the realtime data  */
  async handleRealtime() {
    const response = await this.inventory.detail(this.config.device.id);
    const device = response.data;
    if (device.hasOwnProperty('c8y_IsDevice')) {
      this.deviceList.push(device.id);
    } else {
      const promises = device.childAssets.references.map(async (singleDevice) => {
        this.deviceList.push(singleDevice.managedObject.id);
        if (this.config.innerChild) {
          const { data, res, paging } = await this.inventory.childDevicesList(singleDevice.managedObject.id);
          const innerPromises = data.map(childDevice => {
            this.deviceList.push(childDevice.id);
          });
          await Promise.all(innerPromises);
        }
      });
      await Promise.all(promises);
    }

    this.deviceList.map(singleDevice => {
      const deviceUrl = '/managedobjects/' + singleDevice;
      const realtimeData = this.realtimeService.subscribe(deviceUrl, () => {
        if (this.realtimeState) {
          this.createChart();
        }
      });
      this.realTimeDeviceSub.push(realtimeData);
    });
  }

  ngOnInit() {
    if (isDevMode()) {
      // // configuration for sandbox-ar.eu-latest.cumulocity.com
      // this.config = {
      //   "legend": "left",
      //   "groupby": "c8y_ActiveAlarmsStatus",
      //   "type": "bar",
      //   "device": {
      //     "name": "Tracking Assets",
      //     "id": "4390938"
      //   },
      //   innerChild: true
      // }
    }

    if (this.config.type === 'line' || this.config.type === 'horizontalBar' || this.config.type === 'bar') {
      // tslint:disable-next-line: no-string-literal
      this.barChartOptions['scales'] = {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      };
    }
    this.createChart();
    this.handleRealtime();
  }
  /** Fetches the device data from device chart service and populates chart data */
  async createChart() {
    let changeOccured = false;
    this.result = await this.deviceChartService.getDeviceData(this.config);
    const result = Object.keys(this.result)
      .sort()
      .reduce((acc, key) => {
        acc[key] = this.result[key];
        if (this.oldDataset[key] !== acc[key]) {
          changeOccured = true;
        }
        return acc;
      }, {});
    if (changeOccured) {
      this.barChartData = [];
      this.oldDataset = result;
      this.barChartType = this.config.type;
      this.barChartOptions.legend.position = this.config.legend;
      const dataValues = [];
      this.barChartLabels.length = 0;
      this.barChartData.length = 0;
      // tslint:disable-next-line: forin
      for (const k in result) {
        dataValues.push(result[k]);
        this.barChartLabels.push(k);
      }
      let SeriesLabel = '';
      if (this.config.value === undefined || this.config.value === '') {
        SeriesLabel = 'Count';
      } else {
        SeriesLabel = this.config.value;
      }
      this.barChartData = [{ data: dataValues, label: SeriesLabel }];
      this.dataLoaded = Promise.resolve(true);
      this.setChartColors();
    }

  }

  /** set the charts border and background color based on the inputs from color picker */
  setChartColors() {
    let borderColor = [];
    if (this.config.color !== undefined) {
      const colorsArr = this.config.color.split(';');
      if (
        this.config.borderColor === undefined ||
        this.config.borderColor === ''
      ) {
        borderColor = [];
      } else {
        borderColor = this.config.borderColor.split(';');
      }

      if (this.config.color === '') {
        this.barChartColors = [];
      } else if (
        this.barChartType !== 'pie' &&
        this.barChartType !== 'doughnut' &&
        this.barChartType !== 'polarArea'
      ) {
        this.barChartColors = [
          {
            backgroundColor: colorsArr[0],
            borderColor: borderColor.length > 0 ? borderColor[0] : borderColor,
          },
        ];
      } else if (this.barChartData[0].data.length <= colorsArr.length) {
        if (borderColor.length < this.barChartData[0].data.length) {
          borderColor = [];
        }
        this.barChartColors = [
          {
            backgroundColor: colorsArr,
            borderColor,
          },
        ];
      } else {
        this.barChartColors = [];
      }
    } else {
      this.barChartColors = [];
    }
  }
  /** unsubscribes the realtime subscription subject */
  ngOnDestroy() {

    this.realTimeDeviceSub.forEach(realtimeElem => {
      this.realtimeService.unsubscribe(realtimeElem);

    });
  }
}
