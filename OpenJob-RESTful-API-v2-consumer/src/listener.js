class Listener {
    constructor(applicationsService, mailSender) {
        this._applicationsService = applicationsService;
        this._mailSender = mailSender;
        this.listen = this.listen.bind(this);
    }
    
    async listen(message) {
        try {
            const { application_id } = JSON.parse(message.content.toString());
            const { owner_email, job_title } = await this._applicationsService.getJobData(application_id);
            const { applicant_name, applicant_email, applied_at } = await this._applicationsService.getApplicantData(application_id);
            const result = await this._mailSender.sendEmail(owner_email, { applicant_name, applicant_email, applied_at, job_title });
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}

export default Listener;