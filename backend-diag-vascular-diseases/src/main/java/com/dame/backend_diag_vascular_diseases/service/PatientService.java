package com.dame.backend_diag_vascular_diseases.service;

import com.dame.backend_diag_vascular_diseases.entity.Patient;
import java.util.List;
import java.util.Optional;

public interface PatientService {

    List<Patient> getAllPatients();

    Optional<Patient> getPatientById(Long id);

    Patient createPatient(Patient patient);

    Patient updatePatient(Long id, Patient patientDetails);

    void deletePatient(Long id);
}
