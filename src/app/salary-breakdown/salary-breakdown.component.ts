import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salary-breakdown',
  templateUrl: './salary-breakdown.component.html',
  styleUrls: ['./salary-breakdown.component.css'],
})
export class SalaryBreakdownComponent implements OnInit {
  // --- Constants ---
  readonly MONTHS_IN_YEAR = 12;
  readonly PF_RATE = 0.12;
  readonly GRATUITY_FACTOR = 15 / 26 / 12;
  readonly ESIC_RATE = 0.0075;

  // --- Input Properties (Bound via [(ngModel)]) ---
  consolidatedPa: number = 0;
  hraPa: number = 0;
  personalPa: number = 0;

  // --- Calculated Properties ---
  consPm: number = 0;
  hraPm: number = 0;
  personalPm: number = 0;
  grossPa: number = 0;
  grossPm: number = 0;

  ePfPa: number = 0;
  ePfPm: number = 0;
  gratuityPa: number = 0;
  gratuityPm: number = 0;
  totalRetrPa: number = 0;
  totalRetrPm: number = 0;
  fixedPa: number = 0;
  fixedPm: number = 0;

  selfPfPa: number = 0;
  selfPfPm: number = 0;
  esicPa: number = 0;
  esicPm: number = 0;
  totalDedPa: number = 0;
  totalDedPm: number = 0;

  inHandPa: number = 0;
  inHandPm: number = 0;

  constructor() {}

  ngOnInit(): void {
    // Run initial calculation when the component loads
    this.calculate();
  }

  // Formatting function
  fmt(n: number | null): string {
    if (typeof n !== 'number' || isNaN(n) || n === null) return '0';
    return Math.round(n).toLocaleString('en-IN');
  }

  // The core calculation logic
  calculate(): void {
    const consolidatedPa = Number(this.consolidatedPa) || 0;
    const hraPa = Number(this.hraPa) || 0;
    const personalPa = Number(this.personalPa) || 0;

    // --- SECTION 1: GROSS SALARY ---
    this.consPm = consolidatedPa / this.MONTHS_IN_YEAR;
    this.hraPm = hraPa / this.MONTHS_IN_YEAR;
    this.personalPm = personalPa / this.MONTHS_IN_YEAR;

    this.grossPa = consolidatedPa + hraPa + personalPa;
    this.grossPm = this.grossPa / this.MONTHS_IN_YEAR;

    // --- SECTION 2: EMPLOYER CONTRIBUTIONS (Retirals / CTC) ---
    this.ePfPa = Math.round(consolidatedPa * this.PF_RATE);
    this.ePfPm = this.ePfPa / this.MONTHS_IN_YEAR;

    this.gratuityPm = (consolidatedPa * this.GRATUITY_FACTOR) / 12;
    this.gratuityPa = Math.round(this.gratuityPm * this.MONTHS_IN_YEAR);

    this.totalRetrPa = Math.round(this.ePfPa + this.gratuityPa);
    this.totalRetrPm = this.totalRetrPa / this.MONTHS_IN_YEAR;

    this.fixedPa = this.grossPa + this.totalRetrPa;
    this.fixedPm = this.fixedPa / this.MONTHS_IN_YEAR;

    // --- SECTION 3: EMPLOYEE DEDUCTIONS ---
    this.selfPfPa = this.ePfPa;
    this.selfPfPm = this.selfPfPa / this.MONTHS_IN_YEAR;

    this.esicPa = Math.round(this.grossPa * this.ESIC_RATE);
    this.esicPm = this.esicPa / this.MONTHS_IN_YEAR;

    this.totalDedPa = Math.round(this.selfPfPa + this.esicPa);
    this.totalDedPm = this.totalDedPa / this.MONTHS_IN_YEAR;

    // --- SECTION 4: IN-HAND SALARY ---
    this.inHandPa = this.grossPa - this.totalDedPa;
    this.inHandPm = this.inHandPa / this.MONTHS_IN_YEAR;
  }

  // Helper for the print/PDF functionality
  downloadPdf(): void {
    window.print();
  }
}
