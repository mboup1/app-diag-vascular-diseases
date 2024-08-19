import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Patient } from '../models/patient.model';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {

  newPatientForm!: FormGroup;

  constructor(
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.newPatientForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(0)]),
      medicalRecordNumber: new FormControl('', [Validators.required]),
      heartRate: new FormControl([]),
      temperature: new FormControl([]),
      bloodPressure: new FormControl([]),
      oxygenSaturation: new FormControl([])
    });
  }

  addPatient(): void {
    if (this.newPatientForm.valid) {
      const newPatient: Patient = {
        id: 0,
        firstName: this.newPatientForm.value.firstName,
        lastName: this.newPatientForm.value.lastName,
        age: this.newPatientForm.value.age,
        medicalRecordNumber: this.newPatientForm.value.medicalRecordNumber,
        vitals: {
          heartRate: this.newPatientForm.value.heartRate,
          temperature: this.newPatientForm.value.temperature,
          bloodPressure: this.newPatientForm.value.bloodPressure,
          oxygenSaturation: this.newPatientForm.value.oxygenSaturation
        }
      };

      this.patientService.createPatient(newPatient).subscribe({
        next: (response: Patient) => {
          this.snackBar.open('Le patient a été ajouté avec succès!', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.newPatientForm.reset();
          this.router.navigate(['/patients']);
        },
        error: (error) => {
          this.snackBar.open('Une erreur est survenue lors de l\'ajout du patient.', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Erreur lors de l\'ajout du patient:', error);
        }
      });
    }
  }
}
