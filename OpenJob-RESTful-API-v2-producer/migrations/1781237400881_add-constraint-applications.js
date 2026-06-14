export const up = (pgm) => {
    pgm.addConstraint(
        'applications',
        'unique_user_job',
        {
            unique: ['user_id', 'job_id'],
        }
    );
};

export const down = (pgm) => {
    pgm.dropConstraint(
        'applications',
        'unique_user_job'
    );
};
