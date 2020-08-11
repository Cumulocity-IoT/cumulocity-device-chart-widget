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


import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-gp-device-chart-widget-config',
  templateUrl: './gp-lib-device-chart.config.html',
  styleUrls: ['./gp-lib-device-chart.config.css']
})
// tslint:disable-next-line: component-class-suffix
export class GpDeviceChartWidgetConfig implements OnInit {
    @Input() config: any = {};
    isOpenCP = false;
    borderCP = false;
  constructor() { }

  ngOnInit() {
  }

/** Opens the color picker if it is not already open */
  openColorPicker() {
    if (!this.isOpenCP) {
      this.isOpenCP = true;
    }
  }
/** Opens the border color picker on click of input field  */
  openBorderColorPicker() {
    if (!this.borderCP) {
      this.borderCP = true;
    }
  }
  /** Closes the color picker on click of cancel  */
  closeColorPicker() {
    if (this.isOpenCP) {
      this.isOpenCP = false;
    }
  }
   /** Closes the border color picker on click of cancel  */
  closeBorderColorPicker() {
    if (this.borderCP) {
      this.borderCP = false;
    }
  }
  /** on click of save button it adds the selected color to semi colon separated string */
  setSelectedColor(value) {
    if (this.config.color) {
      this.config.color = this.config.color + ';' + value;
    } else {
      this.config.color = value;
    }
  }
   /** on click of save button it adds the selected border color to semi colon separated string */
  setSelectedBorderColor(value) {
    if (this.config.borderColor) {
      this.config.borderColor = this.config.borderColor + ';' + value;
    } else {
      this.config.borderColor = value;
    }
  }
}
