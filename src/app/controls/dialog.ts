import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { LxPart, track } from '@lotexiu/angular';
import { FocusUtils } from '@lotexiu/dom';
import type { Dialog } from '@lotexiu/typescript';

@Component({
	selector: 'lx-dialog',
	imports: [LxPart],
	template: `
		@if (open()) {
			<div class="backdrop" [lxPart]="control()" partName="backdrop" (pointerdown)="$event.target === $event.currentTarget && control().interactOutside()">
				<div #panel class="dialog" [lxPart]="control()" partName="content" (keydown)="control().keydown($event)">
					<strong [lxPart]="control()" partName="title">{{ title() }}</strong>
					<p [lxPart]="control()" partName="description">{{ description() }}</p>
					<div class="actions"><ng-content /></div>
				</div>
			</div>
		}
	`,
})
export class DialogView {
	readonly control = input.required<Dialog>();
	readonly title = input.required<string>();
	readonly description = input('');
	readonly open = track(this.control, (dialog) => dialog.value());
	readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

	constructor() {
		effect((onCleanup) => {
			const panel = this.panel();
			if (panel === undefined) return;
			onCleanup(FocusUtils.trap(panel.nativeElement));
		});
	}
}
