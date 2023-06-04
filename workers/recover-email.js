const queue                 =   require('../config/kue');
const recoveryMailer        =   require('../mailers/recovery-email');

queue.process('reset',function(job,done){
    recoveryMailer.reset(job.data);
    done();
})