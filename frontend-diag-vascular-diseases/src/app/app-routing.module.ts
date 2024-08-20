import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';

const routes: Routes = [
  { path: '', component: PatientListComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'edit-patient/:id', component: EditPatientComponent },
  { path: 'patient-details/:id', component: PatientDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
