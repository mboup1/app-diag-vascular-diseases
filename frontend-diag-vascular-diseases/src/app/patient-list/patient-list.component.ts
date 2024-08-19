import { Component } from '@angular/core';
import { Patient } from '../models/patient.model';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {

  patients: Patient[] = [];
  displayedColumns: string[] = ['name', 'heartRate', 'temperature', 'bloodPressure', 'oxygenSaturation', 'actions'];

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.loadPatients();
    setInterval(() => this.loadPatients(), 60000);
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe(data => this.patients = data);
    console.log("this.patients : ", this.patients)
  }

  viewPatientDetails(patient: Patient): void {
    console.log('Patient sélectionné:', patient);
  }

  editPatient(patient: Patient): void {
    this.router.navigate(['/edit-patient', patient.id]);
  }

  deletePatient(patient: Patient): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(patient.id).subscribe(() => {
        this.patients = this.patients.filter(p => p.id !== patient.id);
        console.log('Patient deleted:', patient);
      });
    }
  }

}
