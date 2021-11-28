package fm2people.dashboard.dashboardapi.EntitiesManagement.Entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class EnvironmentSensorDevice extends Device {

    @Column
    private String deviceUuid;

    @OneToMany(fetch = FetchType.LAZY,mappedBy="environmentSensorDevice")
    private List<EnvironmentData> dataHistory;


}
