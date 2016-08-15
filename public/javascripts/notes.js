$(document).ready(function() {

	$('#add_note').onSubmit( function(e) {
		e.preventDefault();

		var title = $(this).children('input').val();

		$.ajax({
			url: '/notes',
			type: 'POST',
			data: { title: title },
			datatype: 'JSON'
		}).done( function(data) {
			$('#add_note input').val();
			getAllNotes();
		}).fail( function(err) {
			console.log(err);
		});
	});

	function getAllNotes() {
		$.ajax({
			url: '/notes',
			type: 'GET',
			datatype: 'JSON'
		}).done( function(data) {
			updateNoteList(data);
		}).fail( function(err) {
			console.log(err);
		});
	}

	function updateNoteList(notes) {
		var list = $('#note_list');
		list.empty();

		notes.forEach( function(notes) {	
			$.ajax({
				url: '/notes/note_template',
				type: 'POST',
				data: { id: note._id, title: note.title , complete: note.complete }
				datatype: 'HTML'
			}).done ( function(data) {
				list.append(data);
			})
		})
	}

	getAllNotes();
})