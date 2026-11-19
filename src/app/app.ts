import { Component, DestroyRef, inject } from '@angular/core';
import { track } from '@lotexiu/angular';
import { CssVariableUtils } from '@lotexiu/dom';
import { Dialog, Form, Slider, Switch, writable } from '@lotexiu/typescript';
import type { TControlDefinitions, TControlValues } from '@lotexiu/typescript';
import { DialogView } from './controls/dialog';
import { FormControlView } from './controls/form-control';
import { deskTheme } from './theme';

const profileDefinitions = {
	name: { kind: 'text', label: 'Nome', default: '', required: true, maxLength: 60 },
	phone: { kind: 'text', label: 'Telefone', default: '', mask: '(00) 00000-0000' },
	plan: { kind: 'choice', label: 'Plano', default: 'basic', options: ['basic', 'plus', 'pro'], optionLabels: { basic: 'Básico', plus: 'Plus', pro: 'Pro' }, control: 'radio' },
	contact: { kind: 'choice', label: 'Contato', default: 'email', options: ['email', 'phone', 'message'], optionLabels: { email: 'E-mail', phone: 'Ligação', message: 'Mensagem' } },
	newsletter: { kind: 'toggle', label: 'Receber novidades', default: false, control: 'checkbox' },
} as const satisfies TControlDefinitions;

@Component({
	selector: 'app-root',
	imports: [FormControlView, DialogView],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {
	readonly darkMode = new Switch({
		id: 'dark-mode',
		value: writable(
			() => deskTheme.mode() === 'dark',
			(dark) => deskTheme.mode.set(dark ? 'dark' : 'light')
		),
	});
	readonly contrast = new Slider({ id: 'contrast', min: -1, max: 1, step: 0.1, value: deskTheme.contrast, format: (value) => value.toFixed(1) });
	readonly appearance = new Form({
		id: 'appearance',
		definitions: deskTheme.style().adjustments,
		values: writable(
			() => deskTheme.activeAdjustments() as TControlValues<TControlDefinitions>,
			(values) => deskTheme.setAdjustments(values)
		),
	});
	readonly profile = new Form({ id: 'profile', definitions: profileDefinitions });
	readonly confirmReset = new Dialog({ id: 'confirm-reset', role: 'alertdialog' });
	readonly values = track(this.profile, (form) => JSON.stringify(form.values()));
	readonly invalid = track(this.profile, (form) => form.invalid());
	readonly dirty = track(this.profile, (form) => form.dirty());

	constructor() {
		const stop = CssVariableUtils.bind(document.documentElement, () => deskTheme.tokens() as Record<string, string>);
		inject(DestroyRef).onDestroy(stop);
	}

	resetProfile() {
		this.profile.reset();
		this.confirmReset.hide();
	}
}
