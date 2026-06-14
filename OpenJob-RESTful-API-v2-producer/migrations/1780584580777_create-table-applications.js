export const up = (pgm) => {
    pgm.createTable('applications', {
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
        job_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: 'jobs(id)',
            onDelete: 'CASCADE',
        },
        status: {
            type: 'TEXT',
            notNull: true,
            default: 'pending'
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
    pgm.dropTable('applications');
};
