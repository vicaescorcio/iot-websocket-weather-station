//sample HTML/JS script that will publish/subscribe to topics in the Google Chrome Console
    //by Matthew Bordignon @bordignon on twitter.
    var $connectionrefuse = $('<span class ="red-text orbitron" ><i class="material-icons">error</i> Impossível conectar!</span>');
    var $connectionlost = $('<span class ="red-text orbitron" ><i class="material-icons">error</i> Conexão perdida!</span>');

    var wsbroker = "test.mosquitto.org";  //mqtt websocket enabled broker
    var wsport = 8080 // port for above
    var client = new Paho.MQTT.Client(wsbroker, wsport,
        "myclientid_" + parseInt(Math.random() * 100, 10));
    client.onConnectionLost = function (responseObject) {
      $(".disconnect").removeClass("btn waves-effect red disconnect waves-light").addClass("light-blue lighten-2 btn waves-effect connect waves-light"); 
      $(".connect").text("Conectar");
  	  $(".connect").attr("onclick","connect()");
  	  $(".hideme").animate({'opacity':'0'},2000);
      console.log("connection lost: " + responseObject.errorMessage);
      Materialize.toast($connectionlost, 5000);
    };

    client.onMessageArrived = function (message) {
      console.log(message.destinationName, ' -- ', message.payloadString);
      stationData(message.payloadString);
      
      
    };
    var options = {
      timeout: 6,
      onSuccess: function () {
        console.log("mqtt connected");
         //$("#hello").html("CONECTADO!");
         $(".hideme").animate({'opacity':'1'},2000);
         $(".connect").removeClass("btn waves-effect light-blue lighten-2 connect waves-light").addClass("btn waves-effect disconnect waves-light red"); 
         $(".disconnect").text("Desconectar");
         $(".disconnect").attr("onclick","disconnect()");
        // Connection succeeded; subscribe to our topic, you can add multile lines of these
                

    
        //use the below if you want to publish to a topic on connect
        
        message = new Paho.MQTT.Message("Hello/adiajd/asdasd/asdasd/asdasd");
        message.destinationName = "/World";
        client.send(message);
  
      },
      onFailure: function (message) {
        console.log("Connection failed: " + message.errorMessage);
        Materialize.toast($connectionlost, 5000);
        

      }
    };

  function subscribe(){
  	var select = document.getElementById("station");
  	var station = select.options[select.selectedIndex].value;
  	client.subscribe(station, {qos: 1});


  

  }
  function connect() {

    client.connect(options);
  }
  function disconnect(){
  	window.location.reload(true);
     

  }

  function stationData(message){
  	var data = message.split('/');
  	var temp = data[0];
  	var humi = data[1];
  	var part = data[2];
  	var uv   = data[3];
  	var long = "77.923029";
  	var lat  = "10.305385";
    

    urlmap = "https://maps.google.com/maps?q="+ lat +","+long+"&z=14&output=embed&iwloc=0"

  	$(".uv").text(uv);
  	$(".humi").text(humi);
    $(".temp").text(temp +'C');
  	$(".part").text(part);
  	$("#bigMap").attr("src",urlmap );
    $(".hideme2").animate({'opacity':'1'},2000);
    $(".map").animate({'opacity':'1'},2500);
  	console.log(temp);

  }


