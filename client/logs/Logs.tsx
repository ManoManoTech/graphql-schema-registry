import React from 'react';
import { useQuery } from '@apollo/client';

import SpinnerCenter from '../components/SpinnerCenter';

import { LOGS } from '../utils/queries';
import Info from '../components/Info';

import { format } from 'date-fns';
import { Log } from './types';

export const Logs: React.FC = () => {
	const { loading, data } = useQuery<{ logs: Log[] | null }>(LOGS);

	if (loading) {
		return <SpinnerCenter />;
	}

	if (!data || !data.logs?.length) {
		return <Info>No Logs yet</Info>;
	}

	return (
		<div>
			<Info>
				You can see last schema-registry logs. Useful in case of
				validation errors
			</Info>

			<table>
				{data.logs.map((row, i) => (
					<tr key={i}>
						<td
							style={{
								borderRight: '1px solid gray',
								padding: '0 10px',
							}}
						>
							{format(new Date(row.timestamp), 'd MMMM / HH:mm')}
						</td>
						<td>{row.level.indexOf('error') > 0 ? '🔴' : 'ℹ️'} </td>
						<td>
							{typeof row.message === 'string' ? row.message : ''}
							{typeof row.message === 'object' &&
								row.message.map((row, j) => {
									return (
										<div key={j}>
											{row.message}({row.extensions.code})
										</div>
									);
								})}
						</td>
					</tr>
				))}
			</table>
		</div>
	);
};
