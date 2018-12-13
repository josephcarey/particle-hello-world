int led = D0;
int led2 = D7;
int photosensor = A5;
int analogvalue;
bool lightSensitiveMode = false;

void setup() {

  Serial.begin();

  pinMode(led, OUTPUT);
  digitalWrite(led, HIGH);

  pinMode(led2, OUTPUT);


Particle.variable("analogvalue", &analogvalue, INT);

   Particle.function("led",ledToggle);
   Particle.function("singleMorse",singleMorse);
  //  Particle.function("lightSensitiveOnOff",lightSensitiveModeToggle);
  //  Particle.function('morseMessage', morseMessage);

   // For good measure, let's also make sure both LEDs are off when we start:
   digitalWrite(led2, LOW);

}

void loop() {

  // code would go here
  analogvalue = analogRead(photosensor);

// if ( lightSensitiveMode == true) {


  if( analogvalue > 500) {
    digitalWrite(led,LOW);
  } else {
    digitalWrite(led,HIGH);
  }

// }

   delay(100);

}

int ledToggle(String command) {

    if (command=="on") {
        digitalWrite(led,HIGH);
        return 1;
    }
    else if (command=="off") {
        digitalWrite(led,LOW);
        return 0;
    }
    else {
        return -1;
    }
}

// int lightSensitiveModeToggle(String command) {
//
//
//   if (command=="on") {
//     lightSensitiveMode = true;
//     return 1;
//   } else if (command=="off") {
//     lightSensitiveMode = false;
//     return 0;
//   }
//   else {
//     return -1;
//   }
//
// }


int singleMorse(String command) {

  int dotLength = 100;

  if (command=="dot") {
    digitalWrite(led2, HIGH);
    delay(dotLength);
    digitalWrite(led2, LOW);
  }

  if (command=="dash") {
    digitalWrite(led2, HIGH);
    delay(dotLength * 3);
    digitalWrite(led2, LOW);
  }

}

// int morseMessage(String message) {
//   return message.length;
// }
