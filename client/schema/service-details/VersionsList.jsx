import { useHistory, useParams } from 'react-router-dom';
import { formatDistance } from 'date-fns';

import { EntryGrid } from '../../components/styled';
import { FlexRow, VersionRow, VersionTag } from '../styled';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListItem, Tooltip } from '@material-ui/core';
import VersionCharDelta from './VersionCharDelta';
import { ListContainer, NavigationList } from '../../components/List';

const VersionsList = ({ service }) => {
	const { serviceName, schemaId } = useParams();
	const selectedSchema = parseInt(schemaId, 10);
	const history = useHistory();

	if (!service) {
		return <div>No service passed</div>;
	}

	return (
		<ListContainer>
			<NavigationList>
				{service.schemas.map((schema) => {
					const today = new Date();
					const date = new Date(schema.addedTime);
					const icon = schema.isDev ? (
						<Tooltip
							placement="right"
							title="Registered by service in dev mode"
						>
							<DeveloperModeIcon />
						</Tooltip>
					) : (
						<ChevronRightIcon />
					);

					return (
						<ListItem
							button
							key={schema.id}
							selected={selectedSchema === schema.id}
							className={schema.isActive ? '' : 'deleted'}
							onClick={() =>
								history.push(`/${serviceName}/${schema.id}/sdl`)
							}
						>
							<EntryGrid>
								<div>
									<FlexRow>
										<VersionTag>{schema.UUID}</VersionTag>
									</FlexRow>
									<VersionRow
										selected={selectedSchema === schema.id}
									>
										<VersionCharDelta
											selected={
												selectedSchema === schema.id
											}
											schema={schema}
										/>
										<span>
											added{' '}
											{formatDistance(date, today, {
												addSuffix: true,
											})}
										</span>
									</VersionRow>
								</div>
								{icon}
							</EntryGrid>
						</ListItem>
					);
				})}
			</NavigationList>
		</ListContainer>
	);
};

export default VersionsList;
