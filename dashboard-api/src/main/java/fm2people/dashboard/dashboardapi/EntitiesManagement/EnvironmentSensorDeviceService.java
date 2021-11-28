package fm2people.dashboard.dashboardapi.EntitiesManagement;

import fm2people.dashboard.dashboardapi.EntitiesManagement.Entities.EnvironmentSensorDevice;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Enums.RoomEnum;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Repositories.EnvironmentSensorDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class EnvironmentSensorDeviceService {

    @Autowired
    EnvironmentSensorDeviceRepository environmentSensorDeviceRepository;

    public void addEnvironment(String name, RoomEnum roomEnum, String uuid) {
        EnvironmentSensorDevice environmentSensorDevice = new EnvironmentSensorDevice();
        environmentSensorDevice.setName(name);
        environmentSensorDevice.setRoom(roomEnum);
        environmentSensorDevice.setDeviceUuid(uuid);
        environmentSensorDevice.setDataHistory(new ArrayList<>());
        environmentSensorDeviceRepository.save(environmentSensorDevice);
    }
}
