export const up = (pgm) => {
    pgm.createTable('users', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'TEXT',
            notNull: true,    
        }, 
        email: {
            type: 'TEXT',
            notNull: true,          
            unique: true
        }, 
        password: {
            type: 'TEXT',
            notNull: true,
        },
        role: {
            type: 'TEXT',
            notNull: true,
            default: 'user',
        },
        created_at: {
            type: "TIMESTAMPTZ",
            notNull: true, 
            default: pgm.func('current_timestamp')
        }, 
        updated_at: {
            type: 'TIMESTAMPTZ',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    })
};

export const down = (pgm) => {
    pgm.dropTable('users');
};
