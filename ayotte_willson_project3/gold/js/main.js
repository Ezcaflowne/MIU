// $('#home').on('pageinit', function(){
// 	//code needed for home page goes here
// });	
		
$(document).on('pageinit', function(){

		var myForm = $('#apartmentForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData();
		}
	});
	
	//any other code needed for addItem page goes here
	
});

var ge = function ( x ){
		var theElement = document.getElementById( x );
		return theElement;
};
//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var storeData = function (key){
        // If there is not key this means this is a brand new item and need a new key.
        if(!key){
            var id              = Math.floor(Math.random()*10000001);    
        } else {
            // Set the id to the existing key we are editing so that it will save over the data.
            // The key is the same key thats been passed along from the editSubmit event handler
            // to the validate function, and then passed here, into the storeData function.
            id = key;
        }
        
        // Gather up all our form field values and stred in an object
        // Object properties contain an array with the form label and input values.
        // getCheckboxPower();
        // getCheckboxWhite();
        var item                = {};
            item.aptType        = ["Apartment Type:", $("#aptType").val()];
            item.aptNum         = ["Apartment Number:", $("#aptNum").val()];
            item.aptSize        = ["Apartment Size:", $("#aptSize").val()];
            item.vacDate        = ["Vacate:", $("#vacDate").val()];
            item.rdyDate        = ["Ready:", $("#rdyDate").val()];
            item.isWhiteLock    = ["Whitelock?", $("#isWhiteLock").val()];
            item.isPower        = ["Power?", $("#isPower").val()];
            item.condition      = ["Condition:", $("#condition").val()];
            item.comments       = ["Additional Comments", $("#comments").val()];
        // Save data into localStorage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Apartment is Saved!");
}; 

// CORRECT //
var getData = function (){
	        toggleControls("on");
        if(localStorage.length === 0){
            alert("There are no Apartments saved in Local Storage so defualt data was added.");
            autoFillApartments();
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        $('#showData').append(makeDiv)
        //document.body.appendChild(makeDiv);
        ge('items').style.display = "block";
        for(var i=0, len=localStorage.length; i<len;i++){
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            // Convert the string from local storage value back to an object by using JSON.parse
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            // getImage(obj.aptType[1], makeSubList);
            for(var n in obj){
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi); // Create edit and delete button or links for each item in local storage
        }
};

// CORRECT //
var autoFillApartments = function (){
	    // The actual JSON Object data required for this to work is coming from out json.js file, which is loaded from out .html page.
        // Store the JSON Object into Local Storage.
        for(var n in json){
            var id = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        } 
};

// CORRECT //
    // Make item Links function
    // Create the edit and delete links for each stored item when displayed.
var makeItemLinks = function (key, linksLi) {
    // add edit single item link
        var editLink  = document.createElement('a');
        editLink.href = "#";
        editLink.key  = key;
        var editText  = "Edit Apartment";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

    // Added line break
    var breakTag = document.createElement('br');
    linksLi.appendChild(breakTag);

    // Add delete single item Link
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Apartment";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
};

// CORRECT //
    // edit item function
var editItem = function () {
        // Grab the data from our local storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        // Show the form
        toggleControls("off");

        // popluate the form feilds with current localStorage values.
        $('#aptType').val(item.aptType[1]);
        $('#aptNum').val(item.aptNum[1]);
        $('#aptSize').val(item.aptSize[1]);
        $('#vacDate').val(item.vacDate[1]);
        $('#rdyDate').val(item.rdyDate[1]);
        $('#isWhiteLock').val(item.isWhiteLock[1]);
        $('#isPower').val(item.isPower[1]);
        $('#condition').val(item.condition[1]);
        $('#comments').val(item.comments[1]);

        // Remove the initial listener from the input 'save contact' button.
        ////save.removeEventListener("click", storeData);
        // Change Submit Button value to Confirm Button
        ////ge('submit').value = "Confirm Changes";
        ////var editSubmit = ge('submit');
        // Save the key value established in this function as a property of the editSubmit event
        // so we can use that value when we save the data we edited.
        ////editSubmit.addEventListener("click", validate);
        thiskey = this.key;
};


// CORRECT //
var	deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this Apartment?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Apartment was deleted!");
            window.location.reload();
        } else {
            alert("Apartment was not deleted.");
    }	
};


var toggleControls = function (n) {
    switch(n) {
        case "on":
            $('#apartmentForm').toggle("hide");
            //$('#clearLink').toggle("show");
            $('#displayLink').toggle("hide");
            $('#addNew').removeClass("ui-disabled");
            break;
        case "off":
            $('#apartmentForm').toggle("show");
            //$('#clearLink').toggle("show");
            $('#displayLink').toggle("show");
            $('#addNew').addClass("ui-disabled")
            $('#items').toggle("hide");
            break;
        default:
            return false;
    }
};
	
// CORRECT //				
var clearLocal = function(){
	if(localStorage.length === 0) {
        alert("You have not saved any Apartments to the Database.");
    } else {
        localStorage.clear();
        alert("All Apartments have been deleted.");
        window.location.reload();
        return false;
    }
};

// CORRECT //
var windowReload = function (){
	window.location.reload();
	return false;
};

	$( '#displayLink' ).on( 'click', getData );
	$( '#clearLink'    ).on( 'click', clearLocal );
	$( '#addNew'      ).on( 'click', windowReload );
