#include <SoftwareSerial.h>

SoftwareSerial ESPserial(2, 3); // TX | RX VALIDATED

//bs-coelho: commands that needed to configure the ESP 01:
// AT                             Command to display the OK message (Should display "ok" - will print unknow characters - in this case, we need to configure the ESP to work with 9600.)
//change de code to begin ESPserial with 115200 and send the following commands:
// AT                             Command to display the OK message (Should display "ok" - will print all characters)
// AT+GMR                         Command to display ESP-01 version info
// AT+UART_DEF=9600,8,1,0,0       Command to change the default ESP-01 serial baud rate  to 9600    
// AT+RST                         Command to reset

void setup()

{

Serial.begin(9600); // communication with the host computer

//while (!Serial) { ; }

// Start the software serial for communication with the ESP8266

ESPserial.begin(9600);

Serial.println("");

Serial.println("Remember to to set Both NL & CR in the serial monitor.");

Serial.println("Ready");

Serial.println("");

}

void loop()

{

// listen for communication from the ESP8266 and then write it to the serial monitor

if ( ESPserial.available() ) { Serial.write( ESPserial.read() ); }

// listen for user input and send it to the ESP8266

if ( Serial.available() ) { ESPserial.write( Serial.read() ); }

}
