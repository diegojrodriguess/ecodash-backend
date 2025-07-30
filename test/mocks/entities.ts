export const mockResearcher = {
  id: '1',
  name: 'Jane Doe',
  projects: [],
};

export const mockProject = {
  id: '1',
  name: 'Amazon Monitoring',
  status: 'active',
  geometry: {
    type: 'Polygon',
    coordinates: [[[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]],
  },
  createdAt: new Date('2024-01-01T00:00:00Z'),
  researcher: mockResearcher,
};

export const mockProjects = [
  {
    id: '1',
    name: 'Forest Surveillance',
    researcher: mockResearcher,
    status: 'active',
    geometry: {
        type: 'Polygon',
        coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]],
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: '2',
    name: 'Wildlife Conservation',
    researcher: mockResearcher,
    status: 'inactive',
    geometry: {
        type: 'Polygon',
        coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]],
    },
    createdAt: new Date('2024-01-02T00:00:00Z'),
  },
];

export const researchers = [
    {
        id: '1',
        name: 'Alice Smith',
        projects: [mockProject],
    },
    {
        id: '2',
        name: 'Bob Johnson',
        projects: [],
    },
]