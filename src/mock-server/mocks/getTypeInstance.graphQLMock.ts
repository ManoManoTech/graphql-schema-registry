const defaultArgs = {
	type: 'query',
	id: 0,
};

export default {
	getTypeInstance(parent, args = defaultArgs) {
		const { type } = { ...defaultArgs, ...args };

		if (type === 'query' || type === 'mutation') {
			return {
				id: '0',
				name: 'Instance 1',
				isDeprecated: true,
				description:
					'Commodo laborum ullamco est in non cillum ullamco et proident ea qui mollit esse minim. Dolore culpa minim dolore ea id do adipisicing irure deserunt. Non consequat do sunt reprehenderit. Lorem veniam anim sunt dolore consectetur occaecat ut exercitation exercitation nisi adipisicing esse. Reprehenderit labore nostrud excepteur id consectetur ullamco ullamco dolore cupidatat incididunt. Nisi id aliqua dolor eu.',
				type,
				inputParams: [
					{
						key: 'key_1',
						isNullable: true,
						isArray: true,
						isArrayNullable: true,
						parent: {
							id: 235,
							name: 'key_parent_1',
							type: 'string',
						},
					},
				],
				outputParams: [
					{
						isNullable: true,
						isArray: true,
						isArrayNullable: true,
						parent: {
							id: 235,
							name: 'key_parent_1',
							type: 'string',
						},
					},
				],
			};
		}

		return {
			id: '0',
			name: 'Instance 1',
			description:
				'Commodo laborum ullamco est in non cillum ullamco et proident ea qui mollit esse minim. Dolore culpa minim dolore ea id do adipisicing irure deserunt. Non consequat do sunt reprehenderit. Lorem veniam anim sunt dolore consectetur occaecat ut exercitation exercitation nisi adipisicing esse. Reprehenderit labore nostrud excepteur id consectetur ullamco ullamco dolore cupidatat incididunt. Nisi id aliqua dolor eu.',
			type,
			fields: [
				{
					id: 0,
					key: 'key_1',
					description:
						'Commodo laborum ullamco est in non cillum ullamco et proident ea qui mollit esse minim. Dolore culpa minim dolore ea id do adipisicing irure deserunt. Non consequat do sunt reprehenderit. Lorem veniam anim sunt dolore consectetur occaecat ut exercitation exercitation nisi adipisicing esse. Reprehenderit labore nostrud excepteur id consectetur ullamco ullamco dolore cupidatat incididunt. Nisi id aliqua dolor eu.',
					isDeprecated: true,
					isNullable: true,
					isArray: true,
					isArrayNullable: true,
					parent: {
						id: 235,
						name: 'key_parent_1',
						type: 'string',
					},
					arguments: [
						{
							name: 'arg_1',
							description:
								'Commodo laborum ullamco est in non cillum.',
							isNullable: true,
							isArray: true,
							isArrayNullable: true,
							parent: {
								id: 122,
								name: 'FLOAT',
								type: 'SCALAR',
							},
						},
						{
							name: 'arg_2',
							description:
								'Commodo laborum ullamco est in non cillum.',
							isNullable: true,
							isArray: true,
							isArrayNullable: true,
							parent: {
								id: 123,
								name: 'Dummy',
								type: 'OBJECT',
							},
						},
					],
				},
				{
					id: 1,
					key: 'key_2',
					description:
						'Commodo laborum ullamco est in non cillum ullamco et proident ea qui mollit esse minim. Dolore culpa minim dolore ea id do adipisicing irure deserunt. Non consequat do sunt reprehenderit. Lorem veniam anim sunt dolore consectetur occaecat ut exercitation exercitation nisi adipisicing esse. Reprehenderit labore nostrud excepteur id consectetur ullamco ullamco dolore cupidatat incididunt. Nisi id aliqua dolor eu.',
					isDeprecated: false,
					isNullable: true,
					isArray: true,
					isArrayNullable: true,
					parent: {
						id: 237,
						name: 'key_parent_2',
						type: 'string',
					},
				},
			],
			usedBy: [
				{
					key: 'key_1_long_long_enough',
					parent: {
						id: 236,
						name: 'key_parent_1_so_so_so_so_so_long',
						type: 'string',
					},
					providedBy: {
						name: 'Provider 1',
					},
				},
			],
			...(type === 'interface'
				? {
						implementations: [
							{
								key: 'key_1',
								parent: {
									id: 235,
									name: 'key_parent_1',
									type: 'string',
								},
								providedBy: {
									name: 'Provider 1',
								},
							},
						],
				  }
				: {}),
		};
	},
};
