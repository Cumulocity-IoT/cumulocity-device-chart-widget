/**
 * Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  Component,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-color-picker',
  templateUrl: './color-picker-component.html',
  styleUrls: ['./color-picker-component.css'],
})
export class ColorPickerComponent {
  @Output() colorSet: EventEmitter<string> = new EventEmitter(true);
  @Output() closeColorPicker: EventEmitter<boolean> = new EventEmitter();
  public hue: string;
  public color: string;
  public colorType: any;
  constructor(private eRef: ElementRef) {}
  applyColorClicked() {
    if (this.color !== undefined) {
      if (this.colorType === 'hexa') {
        this.colorSet.emit(this.RGBAToHexA(this.color));
      } else {
        this.colorSet.emit(this.color);
      }
    }
  }

  RGBAToHexA(rgba) {
    const sep = rgba.indexOf(',') > -1 ? ',' : ' ';
    rgba = rgba.substr(5).split(')')[0].split(sep);

    // Strip the slash if using space-separated syntax
    if (rgba.indexOf('/') > -1) {
      rgba.splice(3, 1);
    }
    let r = (+rgba[0]).toString(16);
    let g = (+rgba[1]).toString(16);
    let b = (+rgba[2]).toString(16);
    let a = Math.round(+rgba[3] * 255).toString(16);

    if (r.length === 1) { r = '0' + r; }
    if (g.length === 1) { g = '0' + g; }
    if (b.length === 1) { b = '0' + b; }
    if (a.length === 1) { a = '0' + a; }

    return '#' + r + g + b + a;
  }

  changeType(e: any) {
    this.colorType = e.target.value;

  }
}
