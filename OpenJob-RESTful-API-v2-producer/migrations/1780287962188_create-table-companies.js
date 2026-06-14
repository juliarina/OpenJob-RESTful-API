export const up = (pgm) => {
    pgm.createTable('companies', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'TEXT',
            notNull: true,
        },
        location: {
            type: 'TEXT',
            notNull: true
        },
        description: {
            type: 'TEXT',
        },
        created_at: {
            type: 'TIMESTAMPTZ',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'TIMESTAMPTZ',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });
};

export const down = (pgm) => {
    pgm.dropTable('companies');
};