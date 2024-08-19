package com.dame.backend_diag_vascular_diseases.service;

import com.dame.backend_diag_vascular_diseases.entity.Patient;
import com.dame.backend_diag_vascular_diseases.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    @Override
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patient updatePatient(Long id, Patient patientDetails) {
        return patientRepository.findById(id)
                .map(patient -> {
                    patient.setFirstName(patientDetails.getFirstName());
                    patient.setLastName(patientDetails.getLastName());
                    patient.setAge(patientDetails.getAge());
                    patient.setMedicalRecordNumber(patientDetails.getMedicalRecordNumber());
                    patient.setVitals(patientDetails.getVitals());
                    return patientRepository.save(patient);
                })
                .orElseThrow(() -> new RuntimeException("Patient not found with id " + id));
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.findById(id)
                .map(patient -> {
                    patientRepository.delete(patient);
                    return patient;
                })
                .orElseThrow(() -> new RuntimeException("Patient not found with id " + id));
    }
}
