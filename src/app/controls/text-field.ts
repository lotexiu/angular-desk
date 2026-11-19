import { Component, input } from '@angular/core';
import { LxPart, track } from '@lotexiu/angular';
import type { TextField } from '@lotexiu/typescript';

const ERROR_MESSAGES: Readonly<Record<string, string>> = {
	required: 'Obrigatório',
	pattern: 'Formato incompleto',
	tooLong: 'Texto longo demais',
};

@Component({
	selector: 'lx-text-field',
	imports: [LxPart],
	template: `
		<span class="field">
			<input [lxPart]="control()" partName="input" [attr.aria-label]="label()" [value]="value()" (input)="type($event)" (focus)="control().focus()" (blur)="control().blur()" />
			<span class="error" [lxPart]="control()" partName="error">{{ message() }}</span>
		</span>
	`,
})
export class TextFieldView {
	readonly control = input.required<TextField>();
	readonly label = input.required<string>();
	readonly value = track(this.control, (field) => field.value());
	readonly message = track(this.control, (field) => {
		const error = field.error();
		return error === undefined ? '' : (ERROR_MESSAGES[error] ?? error);
	});

	type(event: Event) {
		const element = event.target as HTMLInputElement;
		const { text, caret } = this.control().input(element.value, element.selectionStart ?? undefined);
		element.value = text;
		element.setSelectionRange(caret, caret);
	}
}
