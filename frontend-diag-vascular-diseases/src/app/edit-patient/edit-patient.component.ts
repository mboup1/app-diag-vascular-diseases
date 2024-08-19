// edit-patient.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from '../models/patient.model';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  editPatientForm!: FormGroup;
  patientId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPatientData();
  }

  loadPatientData(): void {
    this.patientService.getPatientById(this.patientId).subscribe((patient: Patient) => {
      this.editPatientForm = new FormGroup({
        firstName: new FormControl(patient.firstName, [Validators.required]),
        lastName: new FormControl(patient.lastName, [Validators.required]),
        age: new FormControl(patient.age, [Validators.required, Validators.min(0)]),
        medicalRecordNumber: new FormControl(patient.medicalRecordNumber, [Validators.required]),
        heartRate: new FormControl(patient.vitals?.heartRate.join(', '), [Validators.required]),
        temperature: new FormControl(patient.vitals?.temperature.join(', '), [Validators.required]),
        bloodPressure: new FormControl(patient.vitals?.bloodPressure.map(bp => `${bp.systolic}/${bp.diastolic}`).join(', '), [Validators.required]),
        oxygenSaturation: new FormControl(patient.vitals?.oxygenSaturation.join(', '), [Validators.required]),
      });
    });
  }

  updatePatient(): void {
    if (this.editPatientForm.valid) {
      const updatedPatient: Patient = {
        id: this.patientId,
        firstName: this.editPatientForm.value.firstName,
        lastName: this.editPatientForm.value.lastName,
        age: this.editPatientForm.value.age,
        medicalRecordNumber: this.editPatientForm.value.medicalRecordNumber,
        vitals: {
          heartRate: this.editPatientForm.value.heartRate.split(',').map((hr: string) => parseInt(hr.trim(), 10)),
          temperature: this.editPatientForm.value.temperature.split(',').map((temp: string) => parseFloat(temp.trim())),
          bloodPressure: this.editPatientForm.value.bloodPressure.split(',').map((bp: string) => {
            const [systolic, diastolic] = bp.trim().split('/');
            return { systolic: parseInt(systolic, 10), diastolic: parseInt(diastolic, 10) };
          }),
          oxygenSaturation: this.editPatientForm.value.oxygenSaturation.split(',').map((os: string) => parseFloat(os.trim())),
        }
      };

      // this.patientService.updatePatient(updatedPatient).subscribe({
      //   next: () => {
      //     this.snackBar.open('Patient successfully updated!', 'Close', {
      //       duration: 3000,
      //       panelClass: ['success-snackbar']
      //     });
      //     this.router.navigate(['/patients']);
      //   },
      //   error: (error) => {
      //     this.snackBar.open('An error occurred while updating the patient.', 'Close', {
      //       duration: 3000,
      //       panelClass: ['error-snackbar']
      //     });
      //     console.error('Error updating patient:', error);
      //   }
      // });
    }
  }
}
