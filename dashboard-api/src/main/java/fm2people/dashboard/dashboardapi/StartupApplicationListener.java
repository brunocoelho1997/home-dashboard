package fm2people.dashboard.dashboardapi;

import fm2people.dashboard.dashboardapi.EntitiesManagement.Enums.RoomEnum;
import fm2people.dashboard.dashboardapi.EntitiesManagement.EnvironmentSensorDeviceService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public class StartupApplicationListener implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private EnvironmentSensorDeviceService environmentSensorDeviceService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if(!environmentSensorDeviceService.alreadyExistDevices()) {
            log.info("Will load all environment sensor data.");

            environmentSensorDeviceService.addEnvironmentSensorData("Sensor Sala", RoomEnum.LIVING_ROOM, "7405707937");

            environmentSensorDeviceService.addEnvironmentSensorData("Sensor Cozinha", RoomEnum.KITCHEN, "1435707937");

            log.info("Loaded all environment sensor data.");

        }




    }

}
