define(['jquery','backbone'],function($, Backbone){
	/*
		Global App View
	*/
	App.Views.App = Backbone.View.extend({
		initialize: function(){
			vent.on('contact:edit',this.editContact,this);
			// to use view we always have to initialize it
			var addContactView = new App.Views.AddContact( {collection:App.contacts} );

			var allContactView = new App.Views.Contacts({ collection:App.contacts});
			$('#allContacts').append(allContactView.render().el);
		},

		editContact: function( contact ){

			var editContactView = new App.Views.EditContact({ model:contact });
			console.log( "editContactView",editContactView.el  );
			$("#editContact").html(editContactView.el);
		}
	});


	/* Add Contact view*/
	App.Views.AddContact = Backbone.View.extend({
		el: '#addContact',


		initialize: function(){
			this.first_name = this.$('#first_name');
			this.last_name = this.$('#last_name');
			this.email_address = this.$('#email_address');
			this.description = this.$('#description');
		},

		events: {
			'submit':'addContact'
		},

		// wait:true makes sure the we get id back from server after submitting new data
		addContact: function( e ){
			console.log( "addContact"  );
			e.preventDefault();
			this.collection.create({
				first_name: this.first_name.val(),
				last_name: this.last_name.val(),
				email_address: this.email_address.val(),
				description: this.description.val()
			},{wait:true});
			console.log( "add contact",this.collection.toJSON() );		
			this.clearForm();
		},

		clearForm: function(){
			this.first_name.val('');
			this.last_name.val('');
			this.email_address.val('');
			this.description.val('');
		}
	});

	/* All Contact View*/
	App.Views.Contacts = Backbone.View.extend({
		tagName: 'tbody',

		initialize: function(){
			this.collection.on('add',this.addOne,this);
		},

		render: function(){
			this.collection.each( this.addOne,this );
			return this;
		},

		addOne: function( contact ){
			var contactView = new App.Views.Contact({ model:contact});
			console.log( "contactView", contactView.render().el  );
			this.$el.append( contactView.render().el );
		}
	});

	App.Views.Contact = Backbone.View.extend({
		tagName:'tr',
		template: template('allContactTemplate'),

		initialize: function(){
			this.model.on('destroy',this.remove,this);
			this.model.on('change',this.render,this);
		},

		events:{
			'click a.delete':'deleteContact',
			'click a.edit':'editContact',
		},

		render: function(){
			this.$el.html( this.template(this.model.toJSON() ) );
			return this;
		},

		deleteContact: function(){
			this.model.destroy();
		},

		editContact: function(){
			vent.trigger('contact:edit',this.model);
			
		}
	});

	// Edit Contact view
	App.Views.EditContact = Backbone.View.extend({
		template: template('editContactTemplate'),

		initialize: function(  ){
			this.render();
			this.form = this.$('form');
			this.first_name = this.form.find('#edit_first_name');
			this.last_name = this.form.find('#edit_last_name');
			this.email_address = this.form.find('#edit_email_address');
			this.description = this.form.find('#edit_description');
		},

		events: {
			'submit form':'submit',
			'click button.cancel' : 'cancel'
		},

		submit: function(e){
			e.preventDefault();
			this.model.save({
				first_name: this.first_name.val(),
				last_name: this.last_name.val(),
				email_address: this.email_address.val(),
				description: this.description.val(),
			});
			this.remove();

		},

		render: function(){
			var html = this.template( this.model.toJSON() );
			this.$el.html(html);
			return this;
		},

		cancel: function(){
			this.remove();
		}
	});
});