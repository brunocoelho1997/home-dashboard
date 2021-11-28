package fm2people.dashboard.dashboardapi.Controllers;

import fm2people.dashboard.dashboardapi.EntitiesManagement.Entities.EnvironmentData;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Entities.EnvironmentSensorDevice;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Enums.RoomEnum;
import fm2people.dashboard.dashboardapi.EntitiesManagement.EnvironmentSensorDeviceService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("devices")
@Log4j2
public class DeviceController {

    @Autowired
    EnvironmentSensorDeviceService environmentSensorDeviceService;

    //returns the tag to the android
    @RequestMapping("/sendData")
    public String sendData(@RequestParam String uuid, @RequestParam String temperature, @RequestParam String humidity) {

        log.info("Was received data. UUID = {}, Temperature = {}, Humidity = {}", uuid, temperature, humidity);

        environmentSensorDeviceService.addData(uuid, temperature, humidity);

        return "true";
    }

    //returns the tag to the android
    @RequestMapping("/getData")
    public List<EnvironmentData> getEnvironmentData(@RequestParam String uuid) {

        log.info("Was requested for environment data from device with UUID = {}.", uuid);

        return environmentSensorDeviceService.getEnvironmentDataFromDevice(uuid, 10);

    }


}
