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


import { NgModule } from '@angular/core';
import { GpLibDeviceChartComponent } from './gp-lib-device-chart.component';
import { GpDeviceChartWidgetConfig } from './gp-lib-device-chart.config';
import { CoreModule, HOOK_COMPONENTS } from '@c8y/ngx-components';
import { ChartsModule } from 'ng2-charts';
import { GpLibDeviceChartService } from './gp-lib-device-chart.service';
import * as preview from './preview-image';
import { ColorPickerComponent } from './color-picker/color-picker-component';
import { ColorSliderComponent } from './color-picker/color-slider/color-slider-component';
import { ColorPaletteComponent } from './color-picker/color-palette/color-palette-component';

@NgModule({
  declarations: [GpLibDeviceChartComponent, GpDeviceChartWidgetConfig, ColorPickerComponent, ColorSliderComponent, ColorPaletteComponent],
  imports: [
    CoreModule,
    ChartsModule
  ],
  exports: [GpLibDeviceChartComponent, GpDeviceChartWidgetConfig, ColorPickerComponent],
  entryComponents: [GpLibDeviceChartComponent, GpDeviceChartWidgetConfig, ColorPickerComponent],
  providers: [
    GpLibDeviceChartService,
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: {
          id: 'device-chart.widget',
          label: 'Device Chart',
          description: 'Current Firmware Charts',
          previewImage: preview.previewImage,
          component: GpLibDeviceChartComponent,
          configComponent: GpDeviceChartWidgetConfig,
          data: {
              ng1: {
                  options: {
                  noDeviceTarget: false,
                  noNewWidgets: false,
                  deviceTargetNotRequired: false,
                  groupsSelectable: true
                  }
              }
          }
      }
    }
  ]
})
export class GpLibDeviceChartModule { }
