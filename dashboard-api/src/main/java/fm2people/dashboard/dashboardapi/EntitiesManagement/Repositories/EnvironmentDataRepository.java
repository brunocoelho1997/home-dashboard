package fm2people.dashboard.dashboardapi.EntitiesManagement.Repositories;

import fm2people.dashboard.dashboardapi.EntitiesManagement.Entities.EnvironmentData;
import fm2people.dashboard.dashboardapi.EntitiesManagement.Entities.EnvironmentSensorDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnvironmentDataRepository extends JpaRepository<EnvironmentData, Long> {

}
