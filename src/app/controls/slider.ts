import { Component, input } from '@angular/core';
import { LxPart, track } from '@lotexiu/angular';
import { PointerUtils } from '@lotexiu/dom';
import type { Slider } from '@lotexiu/typescript';

@Component({
	selector: 'lx-slider',
	imports: [LxPart],
	template: `
		<div class="slider" [lxPart]="control()" partName="root">
			<div
				#trackElement
				class="track"
				[lxPart]="control()"
				partName="track"
				(pointerdown)="down($event, trackElement, thumb)"
				(pointermove)="move($event, trackElement)"
				(pointerup)="control().pointerUp()"
				(pointercancel)="control().pointerUp()"
			>
				<div class="fill" [style.width.%]="ratio() * 100"></div>
				<div #thumb class="thumb" [lxPart]="control()" partName="thumb" [attr.aria-label]="label()" [style.left.%]="ratio() * 100" (keydown)="control().keydown($event)"></div>
			</div>
			<output>{{ text() }}</output>
		</div>
	`,
})
export class SliderView {
	readonly control = input.required<Slider>();
	readonly label = input.required<string>();
	readonly ratio = track(this.control, (slider) => slider.ratio());
	readonly text = track(this.control, (slider) => slider.text());

	down(event: PointerEvent, trackElement: HTMLElement, thumb: HTMLElement) {
		trackElement.setPointerCapture(event.pointerId);
		this.control().pointerDown(...PointerUtils.offset(event, trackElement));
		thumb.focus();
	}

	move(event: PointerEvent, trackElement: HTMLElement) {
		this.control().pointerMove(...PointerUtils.offset(event, trackElement));
	}
}
