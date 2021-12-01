package fm2people.dashboard.dashboardapi.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EnvironmentDataDto implements Serializable {
    String timestamp;
    String name;
    String sensorData;
}
