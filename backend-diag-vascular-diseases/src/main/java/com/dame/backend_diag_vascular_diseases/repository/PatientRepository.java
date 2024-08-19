package com.dame.backend_diag_vascular_diseases.repository;

import com.dame.backend_diag_vascular_diseases.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
