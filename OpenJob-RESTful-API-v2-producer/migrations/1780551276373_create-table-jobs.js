export const up = (pgm) => {
    pgm.createTable('jobs', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        company_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: 'companies(id)',
            onDelete: 'CASCADE',
        },
        category_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: 'categories(id)',
            onDelete: 'CASCADE',
        },
        owner_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: 'users(id)',
            onDelete: 'CASCADE',
        },
        title: {
            type: 'TEXT',
            notNull: true,
        },
        description: {
            type: 'TEXT',
        },
        job_type: {
            type: 'TEXT',
        },
        experience_level: {
            type: 'TEXT',
        },
        location_type: {
            type: 'TEXT',
        },
        location_city: {
            type: 'TEXT',
        },
        salary_min: {
            type: 'BIGINT',
        },
        salary_max: {
            type: 'BIGINT',
        }, 
        is_salary_visible: {
            type: 'BOOLEAN',
            notNull: true,
            default: false,
        },
        status: {
            type: 'TEXT',
            notNull: true,
            default: 'open',
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
    pgm.dropTable('jobs');
};
