import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
	addTask: function(){
            var title = this.get('title');
            var description = this.get('description');
            var date = this.get('date');

            //Create New Task
            var newTask = this.store.createRecord('task', {
                title: title,
		description: description,
		date: new Date(date)
            });

            //save to Database
            newTask.save();

            //Clear Form
            this.setProperties({
		title: '',
		description: '',
		date: ''
            });
	}
    }
});
