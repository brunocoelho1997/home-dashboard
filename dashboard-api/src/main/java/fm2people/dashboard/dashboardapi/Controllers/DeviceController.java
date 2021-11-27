package fm2people.dashboard.dashboardapi.Controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("devices")
@Log4j2
public class DeviceController {

    //returns the tag to the android
    @RequestMapping("/xpto")
    public String xpto() {

        System.out.println("Hello world");

        return "goodby";
    }

    //returns the tag to the android
    @RequestMapping("/sendData")
    public String sendData(@RequestParam long uuid, @RequestParam String temperature, @RequestParam String humidity) {

        log.info("Was received data. UUID = {}, Temperature = {}, Humidity = {}", uuid, temperature, humidity);
        return "goodby";
    }


}
