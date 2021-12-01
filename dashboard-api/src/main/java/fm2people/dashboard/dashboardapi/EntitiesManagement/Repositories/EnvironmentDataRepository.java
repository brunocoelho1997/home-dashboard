package fm2people.dashboard.dashboardapi.EntitiesManagement.Repositories;

import fm2people.dashboard.dashboardapi.EntitiesManagement.Entities.EnvironmentData;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Entities.EnvironmentSensorDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnvironmentDataRepository extends JpaRepository<EnvironmentData, Long> {

    List<EnvironmentData> queryFirst100ByEnvironmentSensorDevice(EnvironmentSensorDevice environmentSensorDevice);
}
