<!DOCTYPE html>
	<html>
	<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title></title>
			<link rel="stylesheet" href="css/vendors/main.css">
	</head>
	<body>
			<h1>Contacts</h1>
			
			<form id="addContact" action="" class="module">
				<div>
					<label for="first_name"> First Name:</label>
					<input type="text" id="first_name" name="first_name">
				</div>

				<div>
					<label for="last_name"> Last Name:</label>
					<input type="text" id="last_name" name="last_name">
				</div>

				<div>
					<label for="email_address"> Email Address:</label>
					<input type="text" id="email_address" name="email_address">
				</div>

				<div>
					<label for="description"> Description:</label>
					<textarea name="description" id="description" cols="30" rows="10"></textarea>
				</div>

				<div>
					<input type="submit" value="Add Contact">
				</div>
			</form> 
			
			<table id="allContacts" class="module">
				<thead>
					<tr>
						<td>First Name</td>
						<td>Last Name</td>
						<td>Email Address</td>
						<td>Description</td>
						<td>Options</td>
					</tr>
				</thead>
			</table>
			
			<div id="editContact"></div>

			<script id="allContactTemplate" type="text/template">
				<td><%= first_name %></td>
				<td><%= last_name %></td>
				<td><%= email_address %></td>
				<td><%= description %></td>
				<td><a href="#contacts/<%= id %>" class="edit">Edit</a></td>
				<td><a href="#contacts/<%= id %>" class="delete">Delete</a></td>
			</script>

			<script id="editContactTemplate" type="text/template">
				<h2>Edit Contact: <%= first_name %>  <%= last_name %> </h2>
				<form id="editContact" action="" class="module">
					<div>
						<label for="edit_first_name"> First Name:</label>
						<input type="text" id="edit_first_name" name="edit_first_name" value="<%= first_name %>">
					</div>

					<div>
						<label for="edit_last_name"> Last Name:</label>
						<input type="text" id="edit_last_name" name="edit_last_name " value="<%= last_name %>" >
					</div>

					<div>
						<label for="edit_email_address"> Email Address:</label>
						<input type="text" id="edit_email_address" name="edit_email_address" value="<%= email_address %>" >
					</div>

					<div>
						<label for="edit_description"> Description:</label>
						<input type="text" name="edit_description" id="edit_description" value="<%=description %>">
					</div>

					<div>
						<input type="submit" value="Edit Contact">
						<button type="button" class="cancel">Cancel</button>
					</div>
				</form> 
			</script>

			<script data-main="scripts/app.js" src="scripts/vendors/require.js"></script>

    		<script>
    			
    		</script>
	</body>
</html>