package fm2people.dashboard.dashboardapi.EntitiesManagement.Entities;

import fm2people.dashboard.dashboardapi.EntitiesManagement.Enums.RoomEnum;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    protected Long id;

    @Column
    protected String name;

    @Column
    protected RoomEnum room;

}
