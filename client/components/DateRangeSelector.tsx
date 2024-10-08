import React, { useRef, useState, useEffect, useMemo } from 'react';
import sub from 'date-fns/sub';
import {
	createStyles,
	makeStyles,
	Theme,
	withStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { colors } from '../utils';
import CustomDateRangeSelectorDialog from './CustomDateRangeSelectorDialog';
import zIndex from '@material-ui/core/styles/zIndex';

export const OPTIONS: Record<
	string,
	{ label: string; range: Range | 'custom' }
> = Object.freeze({
	day: {
		label: 'Today',
		range: {
			from: getDayBeginningUTCDate(),
			to: getDayBeginningUTCDate(),
		},
	},
	'3days': {
		label: 'Last three days',
		range: {
			from: getDayBeginningUTCDate(sub(new Date(), { days: 2 })),
			to: getDayBeginningUTCDate(),
		},
	},
	week: {
		label: 'Last week',
		range: {
			from: getDayBeginningUTCDate(sub(new Date(), { days: 6 })),
			to: getDayBeginningUTCDate(),
		},
	},
	month: {
		label: 'Last month',
		range: {
			from: getDayBeginningUTCDate(sub(new Date(), { days: 30 })),
			to: getDayBeginningUTCDate(),
		},
	},
	custom: {
		label: 'Custom...',
		range: 'custom',
	},
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			margin: theme.spacing(2),
		},
		button: {
			backgroundColor: colors.green.dark,
			'&:hover': {
				backgroundColor: colors.green.ligth,
			},
		},
	})
);

const GreenRadio = withStyles({
	root: {
		'&$checked': {
			color: colors.green.hex,
		},
	},
	checked: {},
})(Radio) as typeof Radio;

interface Range {
	from: Date;
	to: Date;
}

export interface DateRangeSelectorProps {
	range?: Range;
	onRangeChange?: (range: Range) => void;
}

const defaultOption = 'day';

export const getDefaultRange = () => OPTIONS[defaultOption].range as Range;

const DateRangeSelector = ({
	range,
	onRangeChange = () => null,
}: DateRangeSelectorProps) => {
	const effectiveRange = range ?? getDefaultRange();
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [openCustomDialog, setOpenCustomDialog] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [value, setValue] = useState('day');

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current?.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	const prevOpen = useRef(open);

	useEffect(() => {
		if (prevOpen.current && !open) {
			anchorRef.current?.focus();
		}

		prevOpen.current = open;
	}, [open]);

	const handleCloseCustomDialog = (range: Range) => {
		if (range) {
			onRangeChange(range);
		}
		setOpenCustomDialog(false);
	};

	const rangeOptions = useMemo(
		() =>
			Object.fromEntries(
				Object.entries(OPTIONS).map(([key, { label, range }]) => [
					key,
					{
						label,
						fn:
							range === 'custom'
								? () => setOpenCustomDialog(true)
								: () => onRangeChange(range),
					},
				])
			),
		[onRangeChange]
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		setOpen(false);
		rangeOptions[event.target.value].fn();
	};

	return (
		<div>
			<Button
				ref={anchorRef}
				aria-controls={open ? 'menu-list-grow' : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
				variant="contained"
				color="primary"
				className={classes.button}
				startIcon={<AccessTimeIcon />}
			>
				{rangeOptions[value].label}
			</Button>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role="menubar"
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom'
									? 'center top'
									: 'center bottom',
						}}
					>
						<Paper style={{ zIndex: zIndex.tooltip }}>
							<ClickAwayListener onClickAway={handleClose}>
								<div className={classes.paper}>
									<FormLabel component="legend">
										TIME RANGE
									</FormLabel>
									<RadioGroup
										aria-label="time-range"
										name="time-range"
										value={value}
										onChange={handleChange}
									>
										{Object.entries(rangeOptions).map(
											([key, { label }]) => {
												return (
													<FormControlLabel
														key={key}
														value={key}
														control={<GreenRadio />}
														label={label}
													/>
												);
											}
										)}
									</RadioGroup>
								</div>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			<CustomDateRangeSelectorDialog
				range={effectiveRange}
				isOpen={openCustomDialog}
				onClose={handleCloseCustomDialog}
			/>
		</div>
	);
};

function getDayBeginningUTCDate(date = new Date()): Date {
	const dateClone = new Date(date);
	dateClone.setUTCHours(0);
	dateClone.setUTCMinutes(0);
	dateClone.setUTCSeconds(0);
	dateClone.setUTCMilliseconds(0);
	return dateClone;
}

export default DateRangeSelector;
