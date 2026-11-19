import { PaletteFactory, Theme, ThemeStyle, ColorUtils } from '@lotexiu/typescript';
import type { TColor } from '@lotexiu/typescript';

const css = (color: TColor, alpha = 1) => ColorUtils.withAlpha(color, alpha).toString();

const factory = new PaletteFactory({
	seeds: { accent: { label: 'Destaque', default: '#5b4bc4' } },
	palettes: {
		accent: ({ seeds }) => seeds.accent,
		neutral: ({ seeds }) => seeds.accent.neutral(0.01, 'neutral'),
	},
});

const deskStyle = new ThemeStyle({
	name: 'Desk',
	palettes: factory.build(),
	roles: {
		background: { palette: 'neutral', tone: { dark: 8, light: 96 } },
		surface: { palette: 'neutral', tone: { dark: 14, light: 100 } },
		outline: { palette: 'neutral', tone: { dark: 32, light: 82 } },
		accent: { palette: 'accent', tone: { dark: 70, light: 45 } },
		onBackground: { palette: 'neutral', tone: { dark: 94, light: 12 }, on: 'background', min: 4.5 },
		onSurface: { palette: 'neutral', tone: { dark: 92, light: 14 }, on: 'surface', min: 4.5 },
		muted: { palette: 'neutral', tone: { dark: 68, light: 42 }, on: 'surface', min: 3 },
		onAccent: { palette: 'accent', tone: { dark: 10, light: 100 }, on: 'accent', min: 4.5 },
	},
	adjustments: {
		roundness: { kind: 'range', label: 'Arredondamento', default: 1, min: 0, max: 2, step: 0.25 },
		density: {
			kind: 'choice',
			label: 'Densidade',
			default: 'comfortable',
			options: ['compact', 'comfortable'],
			optionLabels: { compact: 'Compacta', comfortable: 'Confortável' },
			control: 'radio',
		},
	},
	tokens: ({ roles, adjustments }) => ({
		background: css(roles.background),
		surface: css(roles.surface),
		outline: css(roles.outline),
		accent: css(roles.accent),
		'accent-soft': css(roles.accent, 0.18),
		'on-background': css(roles.onBackground),
		'on-surface': css(roles.onSurface),
		muted: css(roles.muted),
		'on-accent': css(roles.onAccent),
		radius: `${Math.round(8 * adjustments.roundness)}px`,
		gap: adjustments.density === 'compact' ? '6px' : '12px',
	}),
});

const deskTheme = new Theme({ style: deskStyle, mode: 'dark' });

export { deskTheme };
