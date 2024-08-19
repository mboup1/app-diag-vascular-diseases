package com.dame.backend_diag_vascular_diseases.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vitals {
    @ElementCollection
    private List<Integer> heartRate;
    @ElementCollection
    private List<Double> temperature;
    @ElementCollection
    private List<BloodPressure> bloodPressure;
    @ElementCollection
    private List<Integer> oxygenSaturation;

}
