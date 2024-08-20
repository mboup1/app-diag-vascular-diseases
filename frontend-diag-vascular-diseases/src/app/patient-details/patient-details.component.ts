import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { PatientService } from '../patient.service';
import { Patient } from '../models/patient.model';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patient!: Patient;
  heartRateChart!: Chart;
  temperatureChart!: Chart;
  bloodPressureChart!: Chart;
  oxygenSaturationChart!: Chart;

  constructor(private route: ActivatedRoute, private patientService: PatientService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadPatientDetails(id);
  }

  loadPatientDetails(id: string | null): void {
    if (id) {
      this.patientService.getPatientById(+id).subscribe(data => {
        this.patient = data;
        this.createHeartRateChart();
        this.createTemperatureChart();
        this.createBloodPressureChart();
        this.createOxygenSaturationChart();
      });
    }
  }

  createHeartRateChart(): void {
    this.heartRateChart = new Chart({
      chart: {
        type: 'line' 
      },
      title: {
        text: 'Fréquence Cardiaque'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          type: 'line',
          name: 'Fréquence Cardiaque',
          data: this.patient.vitals.heartRate
        }
      ]
    });
  }

  createTemperatureChart(): void {
    this.temperatureChart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Température'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          type: 'line',
          name: 'Température',
          data: this.patient.vitals.temperature
        }
      ]
    });
  }

  createBloodPressureChart(): void {
    const systolicData = this.patient.vitals.bloodPressure.map(bp => bp.systolic);
    const diastolicData = this.patient.vitals.bloodPressure.map(bp => bp.diastolic);

    this.bloodPressureChart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Pression Artérielle'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: ['Mesure 1', 'Mesure 2', 'Mesure 3']
      },
      series: [
        {
          type: 'column',
          name: 'Systolique',
          data: systolicData
        },
        {
          type: 'column',
          name: 'Diastolique',
          data: diastolicData
        }
      ]
    });
  }

  createOxygenSaturationChart(): void {
    const oxygenLevels = this.patient.vitals.oxygenSaturation;
    const occurrences = oxygenLevels.reduce((acc, level) => {
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });

    this.oxygenSaturationChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Saturation en Oxygène'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          type: 'pie',
          name: 'Saturation en Oxygène',
          data: Object.entries(occurrences).map(([level, count]) => ({ name: `${level}%`, y: count }))
        }
      ]
    });
  }
}
