const dlAnchorElem = document.getElementById('downloadAnchorElem');
const jsonfilenameElem = document.getElementById('jsonfilename');

function save() {
	const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fighters));
	dlAnchorElem.setAttribute("href", dataStr);
	dlAnchorElem.setAttribute("download", jsonfilenameElem.value + ".json");
	dlAnchorElem.click();
}



document.getElementById('import').onclick = function() {
	var files = document.getElementById('selectFiles').files;
	//console.log(files);
	if (files.length <= 0) {
		return false;
	}

	jsonfilenameElem.value = files[0].name.substring(0, files[0].name.length - 5);


	var fr = new FileReader();

	fr.onload = function(e) {
		var result = JSON.parse(e.target.result);
		fighters[0] = new Fighter(result[0]);
		fighters[1] = new Fighter(result[1]);
		setMode('FIGHT');
		//var formatted = JSON.stringify(result, null, 2);
		//document.getElementById('result').value = formatted;
	}

	fr.readAsText(files.item(0));
};



function toggleJsonStuff(){
	if(jsonStuff.hidden){
		jsonStuff.hidden = false;
	}else{
		jsonStuff.hidden = true;
	}
}