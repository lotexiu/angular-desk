import { Component, computed, input } from '@angular/core';
import { Checkbox, RadioGroup, Select, Slider, Switch, TextField } from '@lotexiu/typescript';
import { RadioGroupView } from './radio-group';
import { SelectView } from './select';
import { SliderView } from './slider';
import { CheckboxView, SwitchView } from './switch';
import { TextFieldView } from './text-field';

@Component({
	selector: 'lx-form-control',
	imports: [SliderView, SwitchView, CheckboxView, SelectView, RadioGroupView, TextFieldView],
	template: `
		@switch (kind()) {
			@case ('slider') { <lx-slider [control]="$any(control())" [label]="label()" /> }
			@case ('switch') { <lx-switch [control]="$any(control())" [label]="label()" /> }
			@case ('checkbox') { <lx-checkbox [control]="$any(control())" [label]="label()" /> }
			@case ('select') { <lx-select [control]="$any(control())" [label]="label()" /> }
			@case ('radio') { <lx-radio-group [control]="$any(control())" [label]="label()" /> }
			@case ('text') { <lx-text-field [control]="$any(control())" [label]="label()" /> }
		}
	`,
})
export class FormControlView {
	readonly control = input.required<object>();
	readonly label = input.required<string>();
	readonly kind = computed(() => {
		const control = this.control();
		if (control instanceof Slider) return 'slider';
		if (control instanceof Switch) return 'switch';
		if (control instanceof Checkbox) return 'checkbox';
		if (control instanceof Select) return 'select';
		if (control instanceof RadioGroup) return 'radio';
		if (control instanceof TextField) return 'text';
		return 'unknown';
	});
}
