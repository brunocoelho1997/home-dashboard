package fm2people.dashboard.dashboardapi.EntitiesManagement.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @OneToMany(fetch = FetchType.LAZY,mappedBy="environmentSensorDevice", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<EnvironmentData> dataHistory;


}
