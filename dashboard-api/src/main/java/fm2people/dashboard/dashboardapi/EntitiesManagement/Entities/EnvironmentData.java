package fm2people.dashboard.dashboardapi.EntitiesManagement.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class EnvironmentData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    protected Long id;

    @ManyToOne
    @JoinColumn(name="environmentSensorDevice_id")
    @JsonBackReference
    private EnvironmentSensorDevice environmentSensorDevice;

    @Column
    private LocalDateTime timestamp;
    @Column
    private float temperature;

    @Column
    private float humidity;

}
