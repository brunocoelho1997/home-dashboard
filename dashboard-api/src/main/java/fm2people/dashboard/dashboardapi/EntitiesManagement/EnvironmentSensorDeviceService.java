package fm2people.dashboard.dashboardapi.EntitiesManagement;

import fm2people.dashboard.dashboardapi.Dtos.EnvironmentDataDto;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Entities.EnvironmentData;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Entities.EnvironmentSensorDevice;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Enums.RoomEnum;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Repositories.EnvironmentDataRepository;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Repositories.EnvironmentSensorDeviceRepository;
import lombok.extern.log4j.Log4j2;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
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

    public boolean alreadyExistDevices() {
        List<EnvironmentSensorDevice> all = environmentSensorDeviceRepository.findAll();
        return !all.isEmpty();
    }

    public void addData(String uuid, String temperature, String humidity, String smokeLevel) {

        EnvironmentSensorDevice environmentSensorDevice = environmentSensorDeviceRepository.findByDeviceUuid(uuid);

        EnvironmentData environmentData = new EnvironmentData();
        environmentData.setHumidity(Float.parseFloat(humidity));
        environmentData.setTemperature(Float.parseFloat(temperature));
        environmentData.setEnvironmentSensorDevice(environmentSensorDevice);
        environmentData.setSmokeLevel(smokeLevel == null? null: getProcessedSmokeLevel(Float.parseFloat(smokeLevel)));
        environmentData.setTimestamp(LocalDateTime.now());

        environmentDataRepository.save(environmentData);

    }

    private Float getProcessedSmokeLevel(float smokeLevelUnprocessed) {

        //according to the documentation, when we have the smokeLevelUnprocessed equal 400, we have smoke!
        //so, will be considered 400 as 90%!

        return smokeLevelUnprocessed * 90 / 400;

    }

    public List<EnvironmentData> getEnvironmentDataFromDevice(String uuid, int desiredNumberOfRecords) {

        EnvironmentSensorDevice device = environmentSensorDeviceRepository.findByDeviceUuid(uuid);

        desiredNumberOfRecords = desiredNumberOfRecords > device.getDataHistory().size()? device.getDataHistory().size() : desiredNumberOfRecords;

        return device.getDataHistory().subList(device.getDataHistory().size()-desiredNumberOfRecords, device.getDataHistory().size());
    }

    public List<EnvironmentDataDto> getCurrentEnvironmentData() {

        List<EnvironmentSensorDevice> environmentSensorDevices = environmentSensorDeviceRepository.findAll();

        List<EnvironmentDataDto> environmentDataList = new ArrayList<>();

        LocalDateTime actualLocalDatetime = LocalDateTime.now();
        //get 00:00h of actual date
        LocalDateTime initialLocalDateTime = LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),0,0);


        environmentDataList.addAll(getMeans(initialLocalDateTime, actualLocalDatetime));

        //get the current data
        for(EnvironmentSensorDevice environmentSensorDevice : environmentSensorDevices) {

            EnvironmentDataDto environmentDataDto = new EnvironmentDataDto();

            /*
             * will get last 100 environment data... then will filter by deviceUUID... To the last one that was sent by this device
             */
            List<EnvironmentData> queryFirst100ByOrderByTimestampDesc = environmentDataRepository.queryFirst100ByOrderByTimestampDesc();
            EnvironmentData currentEnvironmentData = queryFirst100ByOrderByTimestampDesc.stream()
                    .filter(environmentSensorDeviceTemp -> environmentSensorDeviceTemp.getEnvironmentSensorDevice().getDeviceUuid().equals(environmentSensorDevice.getDeviceUuid()))
                    .findAny()
                    .orElse(null);

            if (currentEnvironmentData == null) {
                //temperature
                environmentDataDto = new EnvironmentDataDto("-", environmentSensorDevice.getName() + "- Temperatura", "NA");
                environmentDataList.add(environmentDataDto);
                //humidity
                environmentDataDto = new EnvironmentDataDto("-", environmentSensorDevice.getName() + "- Humidade", "NA");
                environmentDataList.add(environmentDataDto);
                //smoke level
                environmentDataDto = new EnvironmentDataDto("-", environmentSensorDevice.getName() + "- N??vel de Fumo", "NA");
                environmentDataList.add(environmentDataDto);

                continue;
            }

            //temperature
            environmentDataDto = new EnvironmentDataDto(currentEnvironmentData.getTimestamp().toString(), environmentSensorDevice.getName() + "- Temperatura", String.valueOf(Math.round(currentEnvironmentData.getTemperature())) + "??C");
            environmentDataList.add(environmentDataDto);

            //humidity
            environmentDataDto = new EnvironmentDataDto(currentEnvironmentData.getTimestamp().toString(), environmentSensorDevice.getName() + "- Humidade", String.valueOf(Math.round(currentEnvironmentData.getHumidity())) + "%");
            environmentDataList.add(environmentDataDto);

            //smoke level
            String smokeLevel = String.valueOf(currentEnvironmentData.getSmokeLevel() == null ? "NA" : Math.round(currentEnvironmentData.getSmokeLevel()) + "%");
            environmentDataDto = new EnvironmentDataDto(currentEnvironmentData.getTimestamp().toString(), environmentSensorDevice.getName() + "- N??vel de Fumo", smokeLevel);
            environmentDataList.add(environmentDataDto);

        }

        return environmentDataList;
    }

    private Collection<? extends EnvironmentDataDto> getMeans(LocalDateTime initialLocalDateTime, LocalDateTime finalLocalDatetime) {

        List<EnvironmentDataDto> environmentDataList = new ArrayList<>();

        /*LocalDateTime actualLocalDatetime = LocalDateTime.now();
        //get 00:00h of actual date
        LocalDateTime initialLocalDateTime = LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),0,0);
*/
        //get the average data
        List<EnvironmentData> findAllEnvironmentDataOfToday = environmentDataRepository.findByTimestampBetween(initialLocalDateTime, finalLocalDatetime);

        processMeans(findAllEnvironmentDataOfToday, environmentDataList, finalLocalDatetime, true);

        return environmentDataList;
    }

    private void processMeans(List<EnvironmentData> findAllEnvironmentDataOfToday, List<EnvironmentDataDto> environmentDataList, LocalDateTime actualLocalDatetime, boolean addLegend) {

        float temperatureMean = 0, humidityMean = 0, smokeLevelMean = 0;

        int totalTemperatureRecords = 0;
        int totalHumidityRecords = 0;
        int totalSmokeLevelRecords = 0;

        for(EnvironmentData environmentData : findAllEnvironmentDataOfToday) {

            temperatureMean += environmentData.getTemperature();
            totalTemperatureRecords++;

            humidityMean += environmentData.getHumidity();
            totalHumidityRecords++;

            if(environmentData.getSmokeLevel() != null) {
                smokeLevelMean += environmentData.getSmokeLevel();
                totalSmokeLevelRecords++;
            }
        }

        temperatureMean = temperatureMean / totalTemperatureRecords;
        humidityMean = humidityMean / totalHumidityRecords;
        smokeLevelMean = smokeLevelMean / totalSmokeLevelRecords;

        //Average of the temperature
        EnvironmentDataDto environmentDataMeanDto = new EnvironmentDataDto(actualLocalDatetime.toString(), "M??dia da Temperatura (Hoje)", String.valueOf(Math.round(temperatureMean)) + (addLegend? "??C" : ""));
        environmentDataList.add(environmentDataMeanDto);
        //Average of the Humidity
        environmentDataMeanDto = new EnvironmentDataDto(actualLocalDatetime.toString(), "M??dia da Humidade (Hoje)",  String.valueOf(Math.round(humidityMean))+ (addLegend ? "%" : ""));
        environmentDataList.add(environmentDataMeanDto);

        //Average of the Humidity
        environmentDataMeanDto = new EnvironmentDataDto(actualLocalDatetime.toString(), "M??dia do N??vel de Fumo (Hoje)",  String.valueOf(Math.round(smokeLevelMean))+ (addLegend ? "%" : ""));
        environmentDataList.add(environmentDataMeanDto);
    }

    public List<EnvironmentDataDto> getEnvironmentDataFromDay() {

        LocalDateTime actualLocalDatetime = LocalDateTime.now();
        List<LocalDateTime> periods = new ArrayList<>();
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),4,0));
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),8,0));
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),12,0));
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),16,0));
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),20,0));
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),23,59));

        List<EnvironmentDataDto> environmentDataList = new ArrayList<>();

        for(LocalDateTime period : periods) {

            LocalDateTime periodMinusFourHours = LocalDateTime.of(period.getYear(), period.getMonth(), period.getDayOfMonth(), period.getHour() - 4, 0);

            List<EnvironmentData> findAllEnvironmentDataOfToday = environmentDataRepository.findByTimestampBetween(periodMinusFourHours, period);

            //it's possible to use this function since wouldn't be used the Environment data name
            processMeans(findAllEnvironmentDataOfToday, environmentDataList, periodMinusFourHours, false);

        }

        return environmentDataList;
    }

    public List<EnvironmentDataDto> getEnvironmentDataFromWeek() {

        LocalDateTime actualLocalDatetime = LocalDateTime.now();
        List<LocalDateTime> periods = new ArrayList<>();


        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),23, 59).minusDays(6));
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),23, 59).minusDays(5));
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),23, 59).minusDays(4));
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),23, 59).minusDays(3));
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),23, 59).minusDays(2));
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),23, 59).minusDays(1));
        periods.add(LocalDateTime.of(actualLocalDatetime.getYear(), actualLocalDatetime.getMonth(), actualLocalDatetime.getDayOfMonth(),23, 59));

        List<EnvironmentDataDto> environmentDataList = new ArrayList<>();

        for(LocalDateTime period : periods) {

            LocalDateTime periodMinusFourHours = LocalDateTime.of(period.getYear(), period.getMonth(), period.getDayOfMonth(), 0, 0);

            List<EnvironmentData> findAllEnvironmentDataOfToday = environmentDataRepository.findByTimestampBetween(periodMinusFourHours, period);

            //it's possible to use this function since wouldn't be used the Environment data name
            processMeans(findAllEnvironmentDataOfToday, environmentDataList, periodMinusFourHours, false);

        }

        return environmentDataList;
    }
}
