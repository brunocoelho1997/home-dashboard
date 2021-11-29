package fm2people.dashboard.dashboardapi.EntitiesManagement;

import fm2people.dashboard.dashboardapi.EntitiesManagement.Entities.EnvironmentData;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Entities.EnvironmentSensorDevice;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Enums.RoomEnum;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Repositories.EnvironmentDataRepository;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Repositories.EnvironmentSensorDeviceRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class EnvironmentSensorDeviceService {

    @Autowired
    EnvironmentSensorDeviceRepository environmentSensorDeviceRepository;

    @Autowired
    EnvironmentDataRepository environmentDataRepository;

    public void addEnvironmentSensorData(String name, RoomEnum roomEnum, String uuid) {
        EnvironmentSensorDevice environmentSensorDevice = new EnvironmentSensorDevice();
        environmentSensorDevice.setName(name);
        environmentSensorDevice.setRoom(roomEnum);
        environmentSensorDevice.setDeviceUuid(uuid);
        environmentSensorDevice.setDataHistory(new ArrayList<>());
        environmentSensorDeviceRepository.save(environmentSensorDevice);
    }

    public void addData(String uuid, String temperature, String humidity, String smokeLevel) {

        EnvironmentSensorDevice environmentSensorDevice = environmentSensorDeviceRepository.findByDeviceUuid(uuid);

        EnvironmentData environmentData = new EnvironmentData();
        environmentData.setHumidity(Float.parseFloat(humidity));
        environmentData.setTemperature(Float.parseFloat(temperature));
        environmentData.setEnvironmentSensorDevice(environmentSensorDevice);
        environmentData.setSmokeLevel(smokeLevel == null? null: Float.parseFloat(smokeLevel));
        environmentData.setTimestamp(LocalDateTime.now());

        environmentDataRepository.save(environmentData);

    }

    public List<EnvironmentData> getEnvironmentDataFromDevice(String uuid, int desiredNumberOfRecords) {

        EnvironmentSensorDevice device = environmentSensorDeviceRepository.findByDeviceUuid(uuid);

        desiredNumberOfRecords = desiredNumberOfRecords > device.getDataHistory().size()? device.getDataHistory().size() : desiredNumberOfRecords;

        return device.getDataHistory().subList(device.getDataHistory().size()-desiredNumberOfRecords, device.getDataHistory().size());
    }
}
