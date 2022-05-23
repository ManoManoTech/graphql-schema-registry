import { ITypeDefData } from '../../../../../src/controller/schemaBreakdown/strategy';
import {DocumentNodeType, OperationType} from '../../../../../src/model/enums';

export const typeDefDataMock: Partial<ITypeDefData> = {
	dbMap: new Map<string, number>(),
	subgraphTypes: [],
	trx: null,
	service_id: 1,
};

export const getTypeDefDataMock = (
	mappedTypes: Map<string, any[]>
): ITypeDefData => {
	return {
		mappedTypes,
		...typeDefDataMock,
	} as ITypeDefData;
};

const directiveMock = {
	kind: 'DirectiveDefinition',
	name: {
		kind: 'Name',
		value: 'requires',
		loc: {
			start: 246,
			end: 254,
		},
	},
	arguments: [
		{
			kind: 'InputValueDefinition',
			name: {
				kind: 'Name',
				value: 'fields',
				loc: {
					start: 255,
					end: 261,
				},
			},
			type: {
				kind: 'NonNullType',
				type: {
					kind: 'NamedType',
					name: {
						kind: 'Name',
						value: 'String',
						loc: {
							start: 263,
							end: 269,
						},
					},
					loc: {
						start: 263,
						end: 269,
					},
				},
				loc: {
					start: 263,
					end: 270,
				},
			},
			directives: [],
			loc: {
				start: 255,
				end: 270,
			},
		},
	],
	repeatable: false,
	locations: [
		{
			kind: 'Name',
			value: 'FIELD_DEFINITION',
			loc: {
				start: 275,
				end: 291,
			},
		},
	],
	loc: {
		start: 235,
		end: 291,
	},
};
const enumMock = {
	kind: 'EnumTypeDefinition',
	name: {
		kind: 'Name',
		value: 'Platform',
		loc: {
			start: 597,
			end: 605,
		},
	},
	directives: [],
	values: [
		{
			kind: 'EnumValueDefinition',
			name: {
				kind: 'Name',
				value: 'DE',
				loc: {
					start: 610,
					end: 612,
				},
			},
			directives: [],
			loc: {
				start: 610,
				end: 612,
			},
		},
		{
			kind: 'EnumValueDefinition',
			name: {
				kind: 'Name',
				value: 'ES',
				loc: {
					start: 615,
					end: 617,
				},
			},
			directives: [],
			loc: {
				start: 615,
				end: 617,
			},
		},
		{
			kind: 'EnumValueDefinition',
			name: {
				kind: 'Name',
				value: 'FR',
				loc: {
					start: 620,
					end: 622,
				},
			},
			directives: [],
			loc: {
				start: 620,
				end: 622,
			},
		},
		{
			kind: 'EnumValueDefinition',
			name: {
				kind: 'Name',
				value: 'GB',
				loc: {
					start: 625,
					end: 627,
				},
			},
			directives: [],
			loc: {
				start: 625,
				end: 627,
			},
		},
		{
			kind: 'EnumValueDefinition',
			name: {
				kind: 'Name',
				value: 'IT',
				loc: {
					start: 630,
					end: 632,
				},
			},
			directives: [],
			loc: {
				start: 630,
				end: 632,
			},
		},
	],
	loc: {
		start: 592,
		end: 634,
	},
};
const scalarMock = {
	kind: 'ScalarTypeDefinition',
	name: {
		kind: 'Name',
		value: '_Any',
		loc: {
			start: 878,
			end: 882,
		},
	},
	directives: [],
	loc: {
		start: 871,
		end: 882,
	},
};
const unionMock = {
	kind: 'UnionTypeDefinition',
	name: {
		kind: 'Name',
		value: '_Entity',
		loc: {
			start: 890,
			end: 897,
		},
	},
	directives: [],
	types: [
		{
			kind: 'NamedType',
			name: {
				kind: 'Name',
				value: 'Brand',
				loc: {
					start: 900,
					end: 905,
				},
			},
			loc: {
				start: 900,
				end: 905,
			},
		},
	],
	loc: {
		start: 884,
		end: 905,
	},
};
const queryMock = {
	kind: 'ObjectTypeDefinition',
	name: {
		kind: 'Name',
		value: 'Query',
		loc: {
			start: 641,
			end: 646,
		},
	},
	interfaces: [],
	directives: [],
	fields: [
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: '_entities',
				loc: {
					start: 651,
					end: 660,
				},
			},
			arguments: [
				{
					kind: 'InputValueDefinition',
					name: {
						kind: 'Name',
						value: 'representations',
						loc: {
							start: 661,
							end: 676,
						},
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'ListType',
							type: {
								kind: 'NonNullType',
								type: {
									kind: 'NamedType',
									name: {
										kind: 'Name',
										value: '_Any',
										loc: {
											start: 679,
											end: 683,
										},
									},
									loc: {
										start: 679,
										end: 683,
									},
								},
								loc: {
									start: 679,
									end: 684,
								},
							},
							loc: {
								start: 678,
								end: 685,
							},
						},
						loc: {
							start: 678,
							end: 686,
						},
					},
					directives: [],
					loc: {
						start: 661,
						end: 686,
					},
				},
			],
			type: {
				kind: 'NonNullType',
				type: {
					kind: 'ListType',
					type: {
						kind: 'NamedType',
						name: {
							kind: 'Name',
							value: '_Entity',
							loc: {
								start: 690,
								end: 697,
							},
						},
						loc: {
							start: 690,
							end: 697,
						},
					},
					loc: {
						start: 689,
						end: 698,
					},
				},
				loc: {
					start: 689,
					end: 699,
				},
			},
			directives: [],
			loc: {
				start: 651,
				end: 699,
			},
		},
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: '_service',
				loc: {
					start: 702,
					end: 710,
				},
			},
			arguments: [],
			type: {
				kind: 'NonNullType',
				type: {
					kind: 'NamedType',
					name: {
						kind: 'Name',
						value: '_Service',
						loc: {
							start: 712,
							end: 720,
						},
					},
					loc: {
						start: 712,
						end: 720,
					},
				},
				loc: {
					start: 712,
					end: 721,
				},
			},
			directives: [],
			loc: {
				start: 702,
				end: 721,
			},
		},
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: 'brand',
				loc: {
					start: 724,
					end: 729,
				},
			},
			arguments: [
				{
					kind: 'InputValueDefinition',
					name: {
						kind: 'Name',
						value: 'brandId',
						loc: {
							start: 730,
							end: 737,
						},
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: {
								kind: 'Name',
								value: 'Int',
								loc: {
									start: 739,
									end: 742,
								},
							},
							loc: {
								start: 739,
								end: 742,
							},
						},
						loc: {
							start: 739,
							end: 743,
						},
					},
					directives: [],
					loc: {
						start: 730,
						end: 743,
					},
				},
				{
					kind: 'InputValueDefinition',
					name: {
						kind: 'Name',
						value: 'market',
						loc: {
							start: 745,
							end: 751,
						},
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: {
								kind: 'Name',
								value: 'Market',
								loc: {
									start: 753,
									end: 759,
								},
							},
							loc: {
								start: 753,
								end: 759,
							},
						},
						loc: {
							start: 753,
							end: 760,
						},
					},
					directives: [],
					loc: {
						start: 745,
						end: 760,
					},
				},
				{
					kind: 'InputValueDefinition',
					name: {
						kind: 'Name',
						value: 'platform',
						loc: {
							start: 762,
							end: 770,
						},
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: {
								kind: 'Name',
								value: 'Platform',
								loc: {
									start: 772,
									end: 780,
								},
							},
							loc: {
								start: 772,
								end: 780,
							},
						},
						loc: {
							start: 772,
							end: 781,
						},
					},
					directives: [],
					loc: {
						start: 762,
						end: 781,
					},
				},
			],
			type: {
				kind: 'NonNullType',
				type: {
					kind: 'NamedType',
					name: {
						kind: 'Name',
						value: 'Brand',
						loc: {
							start: 784,
							end: 789,
						},
					},
					loc: {
						start: 784,
						end: 789,
					},
				},
				loc: {
					start: 784,
					end: 790,
				},
			},
			directives: [],
			loc: {
				start: 724,
				end: 790,
			},
		},
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: 'brands',
				loc: {
					start: 793,
					end: 799,
				},
			},
			arguments: [
				{
					kind: 'InputValueDefinition',
					name: {
						kind: 'Name',
						value: 'brandIds',
						loc: {
							start: 800,
							end: 808,
						},
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'ListType',
							type: {
								kind: 'NonNullType',
								type: {
									kind: 'NamedType',
									name: {
										kind: 'Name',
										value: 'Int',
										loc: {
											start: 811,
											end: 814,
										},
									},
									loc: {
										start: 811,
										end: 814,
									},
								},
								loc: {
									start: 811,
									end: 815,
								},
							},
							loc: {
								start: 810,
								end: 816,
							},
						},
						loc: {
							start: 810,
							end: 817,
						},
					},
					directives: [],
					loc: {
						start: 800,
						end: 817,
					},
				},
				{
					kind: 'InputValueDefinition',
					name: {
						kind: 'Name',
						value: 'market',
						loc: {
							start: 819,
							end: 825,
						},
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: {
								kind: 'Name',
								value: 'Market',
								loc: {
									start: 827,
									end: 833,
								},
							},
							loc: {
								start: 827,
								end: 833,
							},
						},
						loc: {
							start: 827,
							end: 834,
						},
					},
					directives: [],
					loc: {
						start: 819,
						end: 834,
					},
				},
				{
					kind: 'InputValueDefinition',
					name: {
						kind: 'Name',
						value: 'platform',
						loc: {
							start: 836,
							end: 844,
						},
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: {
								kind: 'Name',
								value: 'Platform',
								loc: {
									start: 846,
									end: 854,
								},
							},
							loc: {
								start: 846,
								end: 854,
							},
						},
						loc: {
							start: 846,
							end: 855,
						},
					},
					directives: [],
					loc: {
						start: 836,
						end: 855,
					},
				},
			],
			type: {
				kind: 'NonNullType',
				type: {
					kind: 'ListType',
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: {
								kind: 'Name',
								value: 'Brand',
								loc: {
									start: 859,
									end: 864,
								},
							},
							loc: {
								start: 859,
								end: 864,
							},
						},
						loc: {
							start: 859,
							end: 865,
						},
					},
					loc: {
						start: 858,
						end: 866,
					},
				},
				loc: {
					start: 858,
					end: 867,
				},
			},
			directives: [],
			loc: {
				start: 793,
				end: 867,
			},
		},
	],
	loc: {
		start: 636,
		end: 869,
	},
};
const objectMock = {
	kind: 'ObjectTypeDefinition',
	name: {
		kind: 'Name',
		value: 'Brand',
		loc: {
			start: 298,
			end: 303,
		},
	},
	interfaces: [],
	directives: [
		{
			kind: 'Directive',
			name: {
				kind: 'Name',
				value: 'key',
				loc: {
					start: 305,
					end: 308,
				},
			},
			arguments: [
				{
					kind: 'Argument',
					name: {
						kind: 'Name',
						value: 'fields',
						loc: {
							start: 309,
							end: 315,
						},
					},
					value: {
						kind: 'StringValue',
						value: 'id',
						block: false,
						loc: {
							start: 317,
							end: 321,
						},
					},
					loc: {
						start: 309,
						end: 321,
					},
				},
			],
			loc: {
				start: 304,
				end: 322,
			},
		},
		{
			kind: 'Directive',
			name: {
				kind: 'Name',
				value: 'key',
				loc: {
					start: 324,
					end: 327,
				},
			},
			arguments: [
				{
					kind: 'Argument',
					name: {
						kind: 'Name',
						value: 'fields',
						loc: {
							start: 328,
							end: 334,
						},
					},
					value: {
						kind: 'StringValue',
						value: 'brandId',
						block: false,
						loc: {
							start: 336,
							end: 345,
						},
					},
					loc: {
						start: 328,
						end: 345,
					},
				},
			],
			loc: {
				start: 323,
				end: 346,
			},
		},
		{
			kind: 'Directive',
			name: {
				kind: 'Name',
				value: 'key',
				loc: {
					start: 348,
					end: 351,
				},
			},
			arguments: [
				{
					kind: 'Argument',
					name: {
						kind: 'Name',
						value: 'fields',
						loc: {
							start: 352,
							end: 358,
						},
					},
					value: {
						kind: 'StringValue',
						value: 'id market platform',
						block: false,
						loc: {
							start: 360,
							end: 380,
						},
					},
					loc: {
						start: 352,
						end: 380,
					},
				},
			],
			loc: {
				start: 347,
				end: 381,
			},
		},
		{
			kind: 'Directive',
			name: {
				kind: 'Name',
				value: 'key',
				loc: {
					start: 383,
					end: 386,
				},
			},
			arguments: [
				{
					kind: 'Argument',
					name: {
						kind: 'Name',
						value: 'fields',
						loc: {
							start: 387,
							end: 393,
						},
					},
					value: {
						kind: 'StringValue',
						value: 'brandId market platform',
						block: false,
						loc: {
							start: 395,
							end: 420,
						},
					},
					loc: {
						start: 387,
						end: 420,
					},
				},
			],
			loc: {
				start: 382,
				end: 421,
			},
		},
	],
	fields: [
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: 'brandId',
				loc: {
					start: 426,
					end: 433,
				},
			},
			arguments: [],
			type: {
				kind: 'NonNullType',
				type: {
					kind: 'NamedType',
					name: {
						kind: 'Name',
						value: 'Int',
						loc: {
							start: 435,
							end: 438,
						},
					},
					loc: {
						start: 435,
						end: 438,
					},
				},
				loc: {
					start: 435,
					end: 439,
				},
			},
			directives: [],
			loc: {
				start: 426,
				end: 439,
			},
		},
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: 'description',
				loc: {
					start: 442,
					end: 453,
				},
			},
			arguments: [],
			type: {
				kind: 'NamedType',
				name: {
					kind: 'Name',
					value: 'String',
					loc: {
						start: 455,
						end: 461,
					},
				},
				loc: {
					start: 455,
					end: 461,
				},
			},
			directives: [],
			loc: {
				start: 442,
				end: 461,
			},
		},
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: 'id',
				loc: {
					start: 464,
					end: 466,
				},
			},
			arguments: [],
			type: {
				kind: 'NonNullType',
				type: {
					kind: 'NamedType',
					name: {
						kind: 'Name',
						value: 'ID',
						loc: {
							start: 468,
							end: 470,
						},
					},
					loc: {
						start: 468,
						end: 470,
					},
				},
				loc: {
					start: 468,
					end: 471,
				},
			},
			directives: [],
			loc: {
				start: 464,
				end: 471,
			},
		},
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: 'logo',
				loc: {
					start: 474,
					end: 478,
				},
			},
			arguments: [],
			type: {
				kind: 'NamedType',
				name: {
					kind: 'Name',
					value: 'String',
					loc: {
						start: 480,
						end: 486,
					},
				},
				loc: {
					start: 480,
					end: 486,
				},
			},
			directives: [],
			loc: {
				start: 474,
				end: 486,
			},
		},
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: 'market',
				loc: {
					start: 489,
					end: 495,
				},
			},
			arguments: [],
			type: {
				kind: 'NonNullType',
				type: {
					kind: 'NamedType',
					name: {
						kind: 'Name',
						value: 'Market',
						loc: {
							start: 497,
							end: 503,
						},
					},
					loc: {
						start: 497,
						end: 503,
					},
				},
				loc: {
					start: 497,
					end: 504,
				},
			},
			directives: [],
			loc: {
				start: 489,
				end: 504,
			},
		},
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: 'platform',
				loc: {
					start: 507,
					end: 515,
				},
			},
			arguments: [],
			type: {
				kind: 'NonNullType',
				type: {
					kind: 'NamedType',
					name: {
						kind: 'Name',
						value: 'Platform',
						loc: {
							start: 517,
							end: 525,
						},
					},
					loc: {
						start: 517,
						end: 525,
					},
				},
				loc: {
					start: 517,
					end: 526,
				},
			},
			directives: [],
			loc: {
				start: 507,
				end: 526,
			},
		},
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: 'slug',
				loc: {
					start: 529,
					end: 533,
				},
			},
			arguments: [],
			type: {
				kind: 'NonNullType',
				type: {
					kind: 'NamedType',
					name: {
						kind: 'Name',
						value: 'String',
						loc: {
							start: 535,
							end: 541,
						},
					},
					loc: {
						start: 535,
						end: 541,
					},
				},
				loc: {
					start: 535,
					end: 542,
				},
			},
			directives: [],
			loc: {
				start: 529,
				end: 542,
			},
		},
		{
			kind: 'FieldDefinition',
			name: {
				kind: 'Name',
				value: 'title',
				loc: {
					start: 545,
					end: 550,
				},
			},
			arguments: [],
			type: {
				kind: 'NonNullType',
				type: {
					kind: 'NamedType',
					name: {
						kind: 'Name',
						value: 'String',
						loc: {
							start: 552,
							end: 558,
						},
					},
					loc: {
						start: 552,
						end: 558,
					},
				},
				loc: {
					start: 552,
					end: 559,
				},
			},
			directives: [],
			loc: {
				start: 545,
				end: 559,
			},
		},
	],
	loc: {
		start: 293,
		end: 561,
	},
};
const inputMock = {
	key: 'InputObjectTypeDefinition',
	value: [
		{
			kind: 'InputObjectTypeDefinition',
			name: {
				kind: 'Name',
				value: 'UpdateCustomerSegmentsInput',
				loc: {
					start: 6,
					end: 33,
				},
			},
			directives: [],
			fields: [
				{
					kind: 'InputValueDefinition',
					name: {
						kind: 'Name',
						value: 'clientMutationId',
						loc: {
							start: 35,
							end: 51,
						},
					},
					type: {
						kind: 'NamedType',
						name: {
							kind: 'Name',
							value: 'String',
							loc: {
								start: 53,
								end: 59,
							},
						},
						loc: {
							start: 53,
							end: 59,
						},
					},
					directives: [],
					loc: {
						start: 35,
						end: 59,
					},
				},
				{
					kind: 'InputValueDefinition',
					name: {
						kind: 'Name',
						value: 'b2bWelcome',
						loc: {
							start: 60,
							end: 70,
						},
					},
					type: {
						kind: 'NamedType',
						name: {
							kind: 'Name',
							value: 'Boolean',
							loc: {
								start: 72,
								end: 79,
							},
						},
						loc: {
							start: 72,
							end: 79,
						},
					},
					directives: [],
					loc: {
						start: 60,
						end: 79,
					},
				},
			],
			loc: {
				start: 0,
				end: 80,
			},
		},
	],
};
const interfaceMock = {
	key: "InterfaceTypeDefinition",
	value: [
		{
			kind: "InterfaceTypeDefinition",
			name: {
				kind: "Name",
				value: "Node",
				loc: {
					start: 37,
					end: 41
				}
			},
			interfaces: [],
			directives: [],
			fields: [
				{
					kind: "FieldDefinition",
					name: {
						kind: "Name",
						value: "id",
						loc: {
							start: 44,
							end: 46
						}
					},
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: {
								kind: "Name",
								value: "ID",
								loc: {
									start: 48,
									end: 50
								}
							},
							loc: {
								start: 48,
								end: 50
							}
						},
						loc: {
							start: 48,
							end: 51
						}
					},
					directives: [],
					loc: {
						start: 44,
						end: 51
					}
				},
				{
					kind: "FieldDefinition",
					name: {
						kind: "Name",
						value: "createdAt",
						loc: {
							start: 52,
							end: 61
						}
					},
					arguments: [],
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: {
								kind: "Name",
								value: "String",
								loc: {
									start: 63,
									end: 69
								}
							},
							loc: {
								start: 63,
								end: 69
							}
						},
						loc: {
							start: 63,
							end: 70
						}
					},
					directives: [],
					loc: {
						start: 52,
						end: 70
					}
				},
				{
					kind: "FieldDefinition",
					name: {
						kind: "Name",
						value: "updatedAt",
						loc: {
							start: 71,
							end: 80
						}
					},
					arguments: [],
					type: {
						kind: "NamedType",
						name: {
							kind: "Name",
							value: "String",
							loc: {
								start: 82,
								end: 88
							}
						},
						loc: {
							start: 82,
							end: 88
						}
					},
					directives: [],
					loc: {
						start: 71,
						end: 88
					}
				}
			],
			loc: {
				start: 27,
				end: 90
			}
		}
	]
};
const mutationMock = {
	kind: "ObjectTypeDefinition",
	name: {
		kind: "Name",
		value: "Mutation",
		loc: {
			start: 33,
			end: 41
		}
	},
	interfaces: [],
	directives: [],
	fields: [
		{
			kind: "FieldDefinition",
			name: {
				kind: "Name",
				value: "fake",
				loc: {
					start: 44,
					end: 48
				}
			},
			arguments: [],
			type: {
				kind: "NamedType",
				name: {
					kind: "Name",
					value: "Float",
					loc: {
						start: 50,
						end: 55
					}
				},
				loc: {
					start: 50,
					end: 55
				}
			},
			directives: [],
			loc: {
				start: 44,
				end: 55
			}
		}
	],
	loc: {
		start: 28,
		end: 57
	}
}

const mocks = new Map();
mocks.set(DocumentNodeType.DIRECTIVE, directiveMock);
mocks.set(DocumentNodeType.ENUM, enumMock);
mocks.set(DocumentNodeType.SCALAR, scalarMock);
mocks.set(DocumentNodeType.UNION, unionMock);
mocks.set(OperationType.QUERY, queryMock);
mocks.set(DocumentNodeType.OBJECT, objectMock);
mocks.set(DocumentNodeType.INPUT, inputMock);
mocks.set(DocumentNodeType.INTERFACE, interfaceMock);
mocks.set(OperationType.MUTATION, mutationMock);

export const getTypeMapped = (total: number = 1, type: any): any[] => {
	const results = []
	for (let i = 0; i < total; ++i) results.push(mocks.get(type));
	return results;
}

export class SchemaBreakdownMock {
	private map: Map<string, any[]> = new Map();

	addDirectives(totalDirectives: number = 1): SchemaBreakdownMock {
		const directives = getTypeMapped(totalDirectives, DocumentNodeType.DIRECTIVE);
		this.map.set(DocumentNodeType.DIRECTIVE, directives);
		return this;
	}

	addEnums(totalEnums: number = 1): SchemaBreakdownMock {
		const enums = getTypeMapped(totalEnums, DocumentNodeType.ENUM);
		this.map.set(DocumentNodeType.ENUM, enums);
		return this;
	}

	addInputs(totalInputs: number = 1): SchemaBreakdownMock {
		const inputs = getTypeMapped(totalInputs, DocumentNodeType.INPUT);
		this.map.set(DocumentNodeType.INPUT, inputs);
		return this;
	}

	addInterfaces(totalInterfaces: number = 1): SchemaBreakdownMock {
		const interfaces = getTypeMapped(totalInterfaces, DocumentNodeType.INTERFACE);
		this.map.set(DocumentNodeType.INTERFACE, interfaces);
		return this;
	}

	addObjects(totalObjects: number = 1): SchemaBreakdownMock {
		const objects = getTypeMapped(totalObjects, DocumentNodeType.OBJECT);
		const queries = getTypeMapped(totalObjects, OperationType.QUERY);
		const mutations = getTypeMapped(totalObjects, OperationType.MUTATION);
		this.map.set(DocumentNodeType.OBJECT, [...objects, ...queries, ...mutations]);
		return this;
	}

	build(): Map<string, any[]> {
		return this.map;
	}
}
