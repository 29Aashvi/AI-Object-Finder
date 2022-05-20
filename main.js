status="";
objects= [];
song="";
objectName="object_name";

function preload(){
song=loadSound("ringing_old_phone.mp3");
}

function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();

    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();

}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("modelLoaded");
    status=true;

}

function gotResults(error, results){
    if (error){
        console.log("Error x_x");
    }
    console.log(results);
    objects= results;
}

function draw(){
    image(video, 0, 0, 380, 380);

   if (status != ""){

r= random(255);
g= random(255);
b= random(255);

       objectDetector.detect(video, gotResults);



       for(i=0; i< objects.length; i++){
           document.getElementById("status").innerHTML= "Status: Object Detected";
           fill(r,g,b);
        percent= floor(objects[i].confidence* 100);
        text(objects[i].label+ ""+ percent+ "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);    
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == object_name) 
        { 
            document.getElementById("number_of_objects").innerHTML = object_name + " Found"; console.log("stop");
         song.stop();
         } 
         else
          { 
              document.getElementById("number_of_objects").innerHTML = object_name+ " Not Found";
           console.log("play"); 
           song.play();
         } 
        }

       }

   }


