package com.dame.backend_diag_vascular_diseases.controller;

import com.dame.backend_diag_vascular_diseases.entity.Patient;
import com.dame.backend_diag_vascular_diseases.repository.PatientRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@Tag(name = "Patient Management", description = "Operations related to patient management")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    @Operation(summary = "View a list of all patients", description = "Retrieve a list of all patients in the system")
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a patient by ID", description = "Retrieve a patient by their unique identifier")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientRepository.findById(id)
                .map(patient -> ResponseEntity.ok().body(patient))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Create a new patient", description = "Add a new patient to the system")
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing patient", description = "Update the details of an existing patient by their ID")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        return patientRepository.findById(id)
                .map(patient -> {
                    patient.setFirstName(patientDetails.getFirstName());
                    patient.setLastName(patientDetails.getLastName());
                    patient.setAge(patientDetails.getAge());
                    patient.setMedicalRecordNumber(patientDetails.getMedicalRecordNumber());
                    patient.setVitals(patientDetails.getVitals());
                    Patient updatedPatient = patientRepository.save(patient);
                    return ResponseEntity.ok(updatedPatient);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a patient", description = "Remove a patient from the system by their ID")
    public ResponseEntity<Object> deletePatient(@PathVariable Long id) {
        return patientRepository.findById(id)
                .map(patient -> {
                    patientRepository.delete(patient);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
