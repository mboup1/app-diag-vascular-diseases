import { Component } from '@angular/core';
import { Patient } from '../models/patient.model';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {

  patients: Patient[] = [];
  displayedColumns: string[] = ['name', 'heartRate', 'temperature', 'bloodPressure', 'oxygenSaturation'];

  constructor(private patientService: PatientService) { }

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

}
