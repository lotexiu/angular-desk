import { Component, input } from '@angular/core';
import { LxPart, track } from '@lotexiu/angular';
import type { Select } from '@lotexiu/typescript';

@Component({
	selector: 'lx-select',
	imports: [LxPart],
	template: `
		<div class="select">
			<span [lxPart]="control()" partName="label" hidden>{{ label() }}</span>
			<div class="trigger" [lxPart]="control()" partName="trigger" (click)="control().toggleOpen()" (keydown)="control().keydown($event)" (blur)="control().hide()">
				{{ selectedLabel() ?? 'Selecione…' }}
				<span aria-hidden="true">▾</span>
			</div>
			<div class="popup" [lxPart]="control()" partName="listbox">
				@for (entry of entries(); track entry.key) {
					<div class="option" [lxPart]="control()" partName="option" [partKey]="entry.key" (pointerdown)="$event.preventDefault()" (pointerenter)="control().hover(entry.key)" (click)="control().choose(entry.key)">
						{{ entry.label }}
					</div>
				}
			</div>
		</div>
	`,
})
export class SelectView {
	readonly control = input.required<Select<unknown, string>>();
	readonly label = input.required<string>();
	readonly entries = track(this.control, (select) => select.collection.entries());
	readonly selectedLabel = track(this.control, (select) => select.selectedLabel());
}
