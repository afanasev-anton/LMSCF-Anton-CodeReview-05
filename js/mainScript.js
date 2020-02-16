

$(document).ready(function(){
	var items = movies;
	console.log(items);
	var itemsNumber = 3;
	
	showList (itemsNumber);
	
	var next = $(`<div class="row p-2"><button id="next" class="b-like btn btn-primary mx-auto">Show more</button></div>`)
	$("#content").append(next);
	next.click(function(){		
		if (itemsNumber >= items.length) {
			itemsNumber = 3;
			showList (itemsNumber);
			$(`#next`).show();
		} else {			
			if ((items.length-itemsNumber) > 3) {
				itemsNumber += 3;
				showList (itemsNumber);
			} else {
				itemsNumber += (items.length-itemsNumber);
				showList (itemsNumber);
				$(`#next`).hide();
			}
		}
	})
	
	//nav bar
	$("#b-items").click(function(){
		$("#list").empty();
		showList(3);
		$(`#next`).show();
	});

	//place movies-cards in container #content	
	function showList (num) {
		$("#list").empty();
		$("#list").hide();//hide to show again with animation

		for (let i = 0; i < num; i++) {
			
			var card = $(`<div class="col-sm-12 col-md-6 col-lg-4 p-2">
							<div class="card bg-dark text-white">
								<img class="card-img-top" src="${items[i].thumb}" alt="poster">
								<div class="card-body">
									<h4 class="card-title">${items[i].name}<span class="small"> [${items[i].year}]</span></h4>
									<p class="card-text">${items[i].description}</p>
									<button id="b-${items[i].iD}" class="b-like btn btn-primary">Like</button>
									<span class="text-warning font-weight-bold">${items[i].likes}&#9733;</span>
								</div>
							</div>
						</div>`);
			$(`#list`).append(card);
			
			$(`#b-${items[i].iD}`).click(function(){
				items[i].likes++;
				$(this).next().empty();
				$(this).next().append(`${items[i].likes}&#9733;`);
				
				//console.log(items[i].likes);
			});
		}

		$("#list").show(400);//shows thumbnails with delay
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
		showList(3);
	//end of sort func
	});

	

//do not delete line after these comment
});