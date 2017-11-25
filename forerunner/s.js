var fdb = new ForerunnerDB();
var db = fdb.db("school");

$(document).ready(function(){
	studentCollection.load(dataLoad);
})

$("#table-tbody").on("click","col", colClick);

var studentCollection = db.collection("students");
var newStudent = {
    name: "Koding",
    age: 18
};

studentCollection.load(dataLoad);

// console.log(studentCollection.find());

function dataLoad(){
	console.log("data loaded");
	console.log(studentCollection.find());
	callback();  
}

function callback(){
	// createData();
	update(studentCollection.find());
}

function dataSave(){
	 console.log("data saved");
}

function createData(){
	console.log("create data");
	for (var i = 0; i < 20; i++) {
		studentCollection.insert({
		name: String.fromCharCode(Math.floor((Math.random() * 26) + 65),
			Math.floor((Math.random() * 26) + 97),
			Math.floor((Math.random() * 26) + 97)),
		age: Math.floor((Math.random() * 6) + 7)
		});
	}
	console.log(studentCollection.find());
	studentCollection.save(dataSave);	
}

function update(tt) {
	console.log("update");
	$("#tt").find("tr").remove();

	for (var i = 0; i < tt.length; i++) {
		$("#tt").append(
		 "<tr class='col'>" +
		 "<td>" + (i + 1) + "</td>" +
		 "<td class='dataId'>" + tt[i]._id + "</td>" +
		 "<td>" + tt[i].name + "</td>" +
		 "</tr>"
		 );
	}
}

function colClick(){
	console.log("colClick");
	var ID = $(this).find("dataId").text();
	var query = {
    _id: ID
	};
	$("#myModal").find("p").remove();
	var studentData = studentCollection.find(query);
 	$("#modal-body").append(
 		"<p>ID:" + studentData[0]._id + "</p>" +
 		"<p>姓名:" + datas[0].name + "</p>" +
 		"<p>年齡:" + studentCollection[0].age + "</p>"
	);
 	$("#myModal").modal("show");
}  