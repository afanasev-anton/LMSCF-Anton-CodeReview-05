

$(document).ready(function(){
	var items = movies;
	console.log(items);
	var itemsNumber = 3;
	
	showList (0,itemsNumber);
	
	//button "Show more"
	var next = $(`<div class="row p-2"><button id="next" class="b-like btn btn-primary mx-auto">Show more</button></div>`)
	$("#content").append(next);
	next.click(function(){		
		if (itemsNumber >= items.length) {
			itemsNumber = 3;
			showList (1,itemsNumber);
			$(`#next`).show();
		} else {			
			if ((items.length-itemsNumber) > 3) {
				var k=itemsNumber;
				itemsNumber += 3;
				showList (k,itemsNumber);
			} else {
				var k=itemsNumber;
				itemsNumber += (items.length-itemsNumber);
				showList (k,itemsNumber);
				$(`#next`).hide();
			}
		}
	})
	
	//nav bar
	$("#b-items").click(function(){
		items = movies;
		$("#list").empty();
		itemsNumber = 3;
		showList(0,itemsNumber);
		$(`#next`).show();
	});
	$("#action").click(function(){
		items = [];
		var k=0;
		for (var i = 0; i < movies.length; i++) {
			if (movies[i].genre == "action") {
				items[k]=movies[i];
				k++;
			}
		}
		$("#list").empty();
		itemsNumber = items.length;
		showList(0,itemsNumber);
		$(`#next`).show();
	});
	$("#comedy").click(function(){
		items = [];
		var k=0;
		for (var i = 0; i < movies.length; i++) {
			if (movies[i].genre == "comedy") {
				items[k]=movies[i];
				k++;
			}
		}
		$("#list").empty();
		itemsNumber = items.length;
		showList(0,itemsNumber);
		$(`#next`).show();
	});

	//place movies-cards in container #content	
	function showList (start,end) {

		for (let i = start; i < end; i++) {
			
			var card = $(`<div class="col-12 col-sm-6 col-md-4 p-2">
							<div class="card bg-dark text-white">
								<img class="card-img-top" src="${items[i].thumb}" alt="poster">
								<div class="card-body">
									<h4 class="card-title">${items[i].name}<span class="small"> [${items[i].year}]</span></h4>
									<p class="card-text">${items[i].description}</p>
									<div class="row"><button id="b-${items[i].iD}" class="b-like btn btn-primary">Like</button>
									<div class="w-75"><h4 class="text-warning font-weight-bold text-right"></h4></span></div>
								</div>
							</div>
						</div>`);
			$(`#list`).append(card);
			//place stars next to button "like"
			if (items[i].likes == 0) {
				$(`#b-${items[i].iD}`).next().children().append(`0`);
			} else {
				if (items[i].likes < 6) {
					for (var l = 0; l < items[i].likes; l++) {
						$(`#b-${items[i].iD}`).next().children().append(` &#9733;`);
					}
				} else {$(`#b-${items[i].iD}`).next().children().append(`${items[i].likes}&#9733;`);}				
			}			

			// function for the button "like", add stars then pushing the button
			$(`#b-${items[i].iD}`).click(function(){
				items[i].likes++;
				$(this).next().children().empty();
				if (items[i].likes < 6) {
					for (var l = 0; l < items[i].likes; l++) {
						$(this).next().children().append(` &#9733;`);
					}
				} else {$(this).next().children().append(`${items[i].likes}&#9733;`);}
				//$(this).next().append(` ${items[i].likes}&#9733;`);
			});
			//end of the "like" function
		}
	}
	
	// sort button
	$("#sort").click(function(){
	//sort function
		for (var i = 0; i < items.length; i++) {
			var max = i;
			
			var piv = items[i];
			
			for (var j = i; j < items.length; j++) {
				if (items[j].likes > items[max].likes) {max = j;}
			}
			items[i] = items[max];
			items[max] = piv;						
		}
		$("#list").empty();
		showList(0,itemsNumber);
	//end of sort func
	});

	

//do not delete line after these comment
});