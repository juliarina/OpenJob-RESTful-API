export const up = (pgm) => {
    pgm.createTable('categories', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'TEXT',
            notNull: true,
        },
        created_at: {
            type: 'TEXT',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'TEXT',
            notNull: true,
            default: pgm.func('current_timestamp'),
        } 
    });
};

export const down = (pgm) => {
    pgm.dropTable('categories');
};
