package fm2people.dashboard.dashboardapi.Controllers;

import fm2people.dashboard.dashboardapi.Dtos.EnvironmentDataDto;
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
    public String sendData(@RequestParam String uuid, @RequestParam String temperature, @RequestParam String humidity, @RequestParam(required = false) String smokeLevel) {

        log.info("Was received data. UUID = {}, Temperature = {}, Humidity = {}, Smoke Level = {}", uuid, temperature, humidity, smokeLevel);

        environmentSensorDeviceService.addData(uuid, temperature, humidity, smokeLevel);

        return "true";
    }

    @RequestMapping("/getData")
    public List<EnvironmentData> getEnvironmentData(@RequestParam String uuid, @RequestParam(defaultValue = "10") String desiredNumberOfRecords) {

        log.info("Was requested for environment data from device with UUID = {}.", uuid);

        return environmentSensorDeviceService.getEnvironmentDataFromDevice(uuid, Integer.parseInt(desiredNumberOfRecords));

    }

    @RequestMapping("/getCurrentEnvironmentData")
    public List<EnvironmentDataDto> getCurrentEnvironmentData() {

        log.info("Was requested for current environment data.");

        return environmentSensorDeviceService.getCurrentEnvironmentData();

    }

    /*
    Get data to be used in daily chart (will return the temperature from 00:00h, 04:00h, 08:00h, etc)
     */
    @RequestMapping("/getEnvironmentDataFromDay")
    public List<EnvironmentDataDto> getEnvironmentDataFromDay() {

        log.info("Was requested for current environment data.");

        return environmentSensorDeviceService.getEnvironmentDataFromDay();

    }

}
