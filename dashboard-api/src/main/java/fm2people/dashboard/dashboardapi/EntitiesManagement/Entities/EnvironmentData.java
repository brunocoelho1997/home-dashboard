package fm2people.dashboard.dashboardapi.EntitiesManagement.Entities;

import javax.persistence.*;

@Entity
public class EnvironmentData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    protected Long id;

    @ManyToOne
    @JoinColumn(name="environmentSensorDevice_id")
    private EnvironmentSensorDevice environmentSensorDevice;

    @Column
    private float temperature;

    @Column
    private float humidity;

}
