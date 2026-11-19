import { Component, effect, ElementRef, inject, input } from '@angular/core';
import { LxPart, track } from '@lotexiu/angular';
import type { RadioGroup } from '@lotexiu/typescript';

@Component({
	selector: 'lx-radio-group',
	imports: [LxPart],
	template: `
		<div class="segmented" [lxPart]="control()" partName="root" [attr.aria-label]="label()" (keydown)="control().keydown($event)">
			@for (entry of entries(); track entry.key) {
				<div class="segment" [lxPart]="control()" partName="item" [partKey]="entry.key" (click)="control().choose(entry.key)">{{ entry.label }}</div>
			}
		</div>
	`,
})
export class RadioGroupView {
	readonly control = input.required<RadioGroup<unknown, string>>();
	readonly label = input.required<string>();
	readonly entries = track(this.control, (group) => group.collection.entries());
	readonly active = track(this.control, (group) => group.navigation.active());
	readonly #host: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

	constructor() {
		effect(() => {
			const id = this.control().itemId(this.active());
			if (id === undefined || !this.#host.contains(document.activeElement)) return;
			document.getElementById(id)?.focus();
		});
	}
}
