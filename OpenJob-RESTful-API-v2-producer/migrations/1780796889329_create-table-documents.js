export const up = (pgm) => {
    pgm.createTable('documents', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        }, 
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: 'users(id)',
            onDelete: 'CASCADE',
        }, 
        file_name: {
            type: 'TEXT',
            notNull: true,
        }, 
        original_name: {
            type: 'TEXT',
            notNull: true,
        },  
        file_path: {
            type: 'TEXT',
            notNull: true,
        }, 
        file_type: {
            type: 'TEXT',
            notNull: true,
        },  
        file_size: {
            type: 'BIGINT',
            notNull: true,
        },  
        created_at: {
            type: 'TIMESTAMPTZ',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });
};

export const down = (pgm) => {
    pgm.dropTable('documents');
};
