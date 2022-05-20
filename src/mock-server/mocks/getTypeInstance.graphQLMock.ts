const defaultArgs = {
	type: 'query',
	id: 0,
};

export default {
	getTypeInstance(parent, args = defaultArgs) {
		const { type } = { ...defaultArgs, ...args };

		if (type === 'query' || type === 'mutation') {
			return {
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
			name: 'Instance 1',
			description:
				'Commodo laborum ullamco est in non cillum ullamco et proident ea qui mollit esse minim. Dolore culpa minim dolore ea id do adipisicing irure deserunt. Non consequat do sunt reprehenderit. Lorem veniam anim sunt dolore consectetur occaecat ut exercitation exercitation nisi adipisicing esse. Reprehenderit labore nostrud excepteur id consectetur ullamco ullamco dolore cupidatat incididunt. Nisi id aliqua dolor eu.',
			type,
			fields: [
				{
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
								'Commodo laborum ullamco est in non cillum ullamco et proident ea qui mollit esse minim. Dolore culpa minim dolore ea id do adipisicing irure deserunt. Non consequat do sunt reprehenderit. Lorem veniam anim sunt dolore consectetur occaecat ut exercitation exercitation nisi adipisicing esse. Reprehenderit labore nostrud excepteur id consectetur ullamco ullamco dolore cupidatat incididunt. Nisi id aliqua dolor eu.',
							parent: {
								id: 122,
								type: 'string',
								isNullable: true,
								isArray: true,
								isArrayNullable: true,
							},
						},
						{
							name: 'arg_2',
							description:
								'Commodo laborum ullamco est in non cillum ullamco et proident ea qui mollit esse minim. Dolore culpa minim dolore ea id do adipisicing irure deserunt. Non consequat do sunt reprehenderit. Lorem veniam anim sunt dolore consectetur occaecat ut exercitation exercitation nisi adipisicing esse. Reprehenderit labore nostrud excepteur id consectetur ullamco ullamco dolore cupidatat incididunt. Nisi id aliqua dolor eu.',
							parent: {
								id: 122,
								type: 'string',
								isNullable: true,
								isArray: true,
								isArrayNullable: true,
							},
						},
					],
				},
				{
					key: 'key_2',
					description:
						'Commodo laborum ullamco est in non cillum ullamco et proident ea qui mollit esse minim. Dolore culpa minim dolore ea id do adipisicing irure deserunt. Non consequat do sunt reprehenderit. Lorem veniam anim sunt dolore consectetur occaecat ut exercitation exercitation nisi adipisicing esse. Reprehenderit labore nostrud excepteur id consectetur ullamco ullamco dolore cupidatat incididunt. Nisi id aliqua dolor eu.',
					isDeprecated: false,
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
			usedBy: [
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
