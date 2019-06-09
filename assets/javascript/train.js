$(document).ready(function(){

    // Start Firebase 
    var config = {
        apiKey: "AIzaSyBBdpsF2i8zXecrDs5m5qf6x2d_SIBNe1I",
        authDomain: "choochoo-f38f4.firebaseapp.com",
        databaseURL: "https://choochoo-f38f4.firebaseio.com/",
        storageBucket: "gs://choochoo-f38f4.appspot.com/",
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // Make button for adding trains
    $("#add-train-button").on("click", function(event){
        event.preventDefault();

        var trainName = $("#name-input").val().trim();
        var trainDest = $("#dest-input").val().trim();
        var trainTime = $("#trainTime-input").val().trim();
        var trainFreq = $("#freq-input").val().trim();

        var newTrain = {
            name:trainName,
            destination: trainDest,
            start: trainTime,
            frequency: trainFreq,
        };
        // Uploads train data to the database 
        database.ref().push(newTrain);

        // Alert
        alert("Train succesfully added");

        $("#name-input").val("");
        $("#dest-input").val("");
        $("#trainTime").val("");
        $("#freq-input").val("");
    });

    //Create Firebase event for adding train to the database and a row in the html when user adds entry
    database.ref().on("child_added", function(childSnapshot, prevChildKey){

        console.log(childSnapshot.val());

        //Storing everything into a variable
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().frequency;

        //Declare variable
        var trainFreq;

        //Time is to be entered on the entry form
        var trainTime = 0;

        var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
            console.log(trainTimeConverted);

        //Current Time
        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("HH:mm"));

        //Difference between the times 
        var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
        console.log("Difference In Time: " + diffTime);

        //Time apart (remainder)
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);

        //Minute Until Train
        var tMinutesTillTrain = trainFreq - tRemainder;
        console.log("Minutes Till Train: " + tMinutesTillTrain);

        //Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("Arrival Time: " + moment(nextTrain).format("HH:mm"));

        //Add each trains data into the table 
        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq +
        "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td><tr>");
        





    })
})