var fdb = new ForerunnerDB();
var db = fdb.db("school");

$(document).ready(function(){
	console.log("ready");
	studentCollection.load(dataLoad);
	$("#tt").on("click",".dataId", colIdClick);
	$("#tt").on("click",".btn-danger", btnDeleteClick);
	$("#tt").on("click",".btn-warning", btnEditClick);
})

function btnDeleteClick(){
	var getId = $(this).closest("tr").find(".dataId").text();
	if(confirm("你確定要刪除嗎?") == false){
		 return;
	}
	studentCollection.remove({
		_id:  getId
	});

	studentCollection.save(dataSave);
	// // update(studentCollection.find());
}



var studentCollection = db.collection("students");
var newStudent = {
    colIdClick: "Koding",
    age: 18
};

studentCollection.load(dataLoad);

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
	 update(studentCollection.find());
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
		 "<td button class='btn btn-warning'>修改</button>" + "<td button class='btn btn-danger'>刪除</button>" +
		 "</tr>"
		 );
	}
} 

function colIdClick(){
	console.log("colIdClick");
	var ID = $(this).text();
	var query = {
    _id: ID
	};

	$("#myModal").find("p").remove();
	var studentData = studentCollection.find(query);
 	$("#modal-body").append(
 		"<p>ID:" + studentData[0]._id + "</p>" +
 		"<p>姓名:" + studentData[0].name + "</p>" +
 		"<p>年齡:" + studentData[0].age + "</p>" 
	);
 	$("#myModal").modal("show");
} 

function talk(){
	var name = $("edtname").val();
	var age = $("edtage").val();
	alert(age + "歲的" + name);
}

function btnEditClick(){
	console.log("btnEditClick");
	var ID = $(this).closest("tr").find(".dataId").text();
	console.log(ID);
	var query = {
		_id: ID
	}
	var studentData = studentCollection.find(query);
 	$("#modalAge").val(studentData[0].age);	 
 	$("#modalName").val(studentData[0].name);
	$("#EditModal").attr("studentID", ID);
	$("#EditModal").modal("show");
}