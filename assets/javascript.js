var config = {
    apiKey: "AIzaSyAASrvkIfa8ZhhivShbQKHo5WCMFs89hek",
    authDomain: "melissa-c5c61.firebaseapp.com",
    databaseURL: "https://melissa-c5c61.firebaseio.com",
    projectId: "melissa-c5c61",
    storageBucket: "melissa-c5c61.appspot.com",
    messagingSenderId: "246299248338"
  };

  firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var frequency = 0;
var minutesAway = "";
var trainArrival = "";

$("#addTrain").on("click", function(event) {
    event.preventDefault();

    trainName = $("#trainName").val();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();

    console.log(firstTrainTime)

    var tFrequency = frequency;

        console.log(tFrequency)
    var firstTime = firstTrainTime;

        console.log(firstTime)

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);222

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var trainArrival = moment(nextTrain).format("hh:mm");

    console.log(trainArrival);


    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        trainArrival: trainArrival,
        firstTrainTime: firstTrainTime,
        tMinutesTillTrain: tMinutesTillTrain,
        dataAdded: firebase.database.ServerValue.TIMESTAMP
    });


});

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().trainArrival);
    console.log(childSnapshot.val().dateAdded);

    var childSnapshotVal = childSnapshot.val();

    $("#tableBody").append("<tr><td>" + childSnapshotVal.trainName + 
    " </td><td class='destination'>" + childSnapshotVal.destination + 
    " </td><td> class='frequency'> " + childSnapshotVal.frequency +
    " </td><td> class='trainArrival> " + childSnapshotVal.trainArrival +
    " </td><td> class='tMinutesTillTrain'> " + childSnapshotVal.tMinutesTillTrain +
    "</td></tr>");
})

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
    var sv = snapshot.val();

    $("#trainName").text(snapshot.val().trainName);
    $("#destination").text(snapshot.val().destination);
    $("#frequency").text(snapshot.val().frequency);
    $("#firstTimeTrain").text(snapshot.val().firstTimeTrain);
});

