import { Component, input } from '@angular/core';
import { LxPart } from '@lotexiu/angular';
import type { Checkbox, Switch } from '@lotexiu/typescript';

@Component({
	selector: 'lx-switch',
	imports: [LxPart],
	template: `<div class="switch" [lxPart]="control()" partName="root" [attr.aria-label]="label()" (click)="control().toggle()" (keydown)="control().keydown($event)"><span class="knob"></span></div>`,
})
export class SwitchView {
	readonly control = input.required<Switch>();
	readonly label = input.required<string>();
}

@Component({
	selector: 'lx-checkbox',
	imports: [LxPart],
	template: `<div class="checkbox" [lxPart]="control()" partName="root" [attr.aria-label]="label()" (click)="control().toggle()" (keydown)="control().keydown($event)"><span class="mark">✓</span></div>`,
})
export class CheckboxView {
	readonly control = input.required<Checkbox>();
	readonly label = input.required<string>();
}
