import { Component } from '@angular/core';
import { Patient } from '../models/patient.model';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent {

  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  displayedColumns: string[] = ['name', 'heartRate', 'temperature', 'bloodPressure', 'oxygenSaturation', 'actions'];

  searchTermControl = new FormControl('');
  sortByControl = new FormControl('name');


  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.loadPatients();
    setInterval(() => this.loadPatients(), 60000);

    this.searchTermControl.valueChanges.subscribe(() => this.filterPatients());
    this.sortByControl.valueChanges.subscribe(() => this.sortPatients());

  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe(data => {
      this.patients = data;
      this.filteredPatients = [...this.patients];
      this.filterPatients();
    });
  }

  filterPatients(): void {
    const searchTerm = this.searchTermControl.value?.trim().toLowerCase() || '';
    this.filteredPatients = this.patients.filter(patient =>
      patient.firstName.toLowerCase().includes(searchTerm) ||
      patient.lastName.toLowerCase().includes(searchTerm) ||
      patient.medicalRecordNumber.toLowerCase().includes(searchTerm)
    );
    this.sortPatients();
  }

  sortPatients(): void {
    const sortBy = this.sortByControl.value;
    this.filteredPatients.sort((a, b) => {
      if (sortBy === 'name') {
        return a.lastName.localeCompare(b.lastName);
      } else if (sortBy === 'firstName') {
        return a.firstName.localeCompare(b.firstName);
      }
      else if (sortBy === 'medicalRecordNumber') {
        return a.medicalRecordNumber.localeCompare(b.medicalRecordNumber);
      }
      return 0;
    });
  }


  viewPatientDetails(patient: Patient): void {
    this.router.navigate(['/patient-details', patient.id]);
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
